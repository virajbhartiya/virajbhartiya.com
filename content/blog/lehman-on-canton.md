---
title: "What if Lehman Brothers had run on Canton?"
description: "Lehman's leverage and liquidity crisis brought it down. Fragmented records and hidden obligations made the fallout harder to contain. I modelled the four failures of its last week in Daml and traced what the Canton protocol does with each."
publishedAt: "2026-11-07"
tags: ["Canton", "Daml", "Finance", "Settlement", "Research"]
image: "/images/Blog/lehman-on-canton/banner.png"
author: "Viraj Bhartiya"
---

Lehman's leverage and liquidity crisis brought it down. Fragmented records and hidden obligations made the fallout harder to contain.

Regulators, hedge funds and lending banks each had a partial picture. When Lehman filed on September 15, 2008, reconstructing obligations and recovering assets across its entities became a years-long process.

I work on [OneSwap](https://www.oneswap.cc/), a DEX on Canton, at SatsTerminal. Canton's whole pitch is a ledger where trades settle atomically, stay private, and still show the right people the right things. That's exactly the plumbing Lehman didn't have.

So this post takes the four things that broke that week, models each one in Daml, and walks through what the Canton protocol actually does with it. The focus is authorization, visibility and settlement. A [reproducible companion](https://github.com/virajbhartiya/virajbhartiya.com/tree/main/research/lehman-on-canton) contains the exact snippets and ten Daml Script tests; protocol-level claims are sourced separately.

First, what this isn't. Canton would not have saved Lehman. A firm levered roughly 30-to-1 on mortgage and real-estate paper goes bust on any ledger. That's a judgment problem, not a plumbing problem.

What changes is _how_ it goes bust.

---

## The week, briefly

- **Tue, Sep 9.** Talks with Korea Development Bank collapse. Shares fall about 45%.
- **Wed, Sep 10.** Lehman pre-announces a $3.9B quarterly loss.
- **Thu–Fri, Sep 11–12.** Clearing banks demand more collateral to keep extending intraday credit.
- **Sat–Sun, Sep 13–14.** The New York Fed gathers bank CEOs. A Barclays deal dies without UK approval.
- **Mon, Sep 15.** Chapter 11. Around $639B in assets.
- **Tue, Sep 16.** The Reserve Primary Fund breaks the buck on Lehman paper.

Four failures sit inside that week: a hidden obligation, missing collateral, trades that never settled, and a book nobody could enumerate. Before going through them, you need about two minutes of Canton internals. Everything later depends on them.

---

## Canton in two minutes

**Contracts have stakeholders.** Every [Daml contract](https://docs.canton.network/appdev/modules/m3-authorization) declares `signatory` parties (who must authorize its creation and are bound by it) and `observer` parties (who can see it). Signatories plus observers are the contract's stakeholders.

**Authority flows through choices.** When a party [exercises a choice](https://docs.canton.network/appdev/modules/m3-authorization#damls-authorization-model) on a contract, everything that happens inside that choice runs with the authority of the contract's signatories _plus_ the choice's controller. That's the only way authority moves. You can't sign for someone else. You can only act inside a contract they already signed.

**Transactions are trees, and each party sees only its branch.** A transaction is a tree of actions: creates, exercises, fetches. The protocol splits it into _views_, one per subtree, and each view goes only to participants hosting the parties that have to see it (its informees). This is [sub-transaction privacy](https://docs.canton.network/appdev/deep-dives/privacy-model). A bank in a three-leg trade sees its leg, not yours.

**Commit is two-phase and atomic.** The submitting participant encrypts each view for its recipients and hands it to the [synchronizer](https://docs.canton.network/global-synchronizer/understand/introduction). The sequencer orders and delivers ciphertext. It sees who receives what, never what's inside. The confirming participants (the ones hosting the signatories, plus the controllers of any exercised choice) re-run their views and vote. The mediator aggregates the votes and issues one verdict for the whole tree: commit or reject. No partial outcomes.

![fig.1 — one transaction, three views: what the sequencer, mediator and each participant actually receive](/images/Blog/lehman-on-canton/fig1-views.svg)

Keep those four rules in mind. Each failure below comes down to one of them.

---

## 1. Repo 105: the obligation that disappeared

Lehman funded itself with repo: sell securities today, buy them back tomorrow. Economically, it's a loan.

Repo 105 dressed the loan up as a sale. By handing over about $105 of securities for every $100 of cash, Lehman got the trade booked as a _sale_ under its accounting treatment. Cash came in. The liability vanished. Right before quarter-end. The court examiner, Anton Valukas, found Lehman used it to move about $50B off its balance sheet at the ends of the first and second quarters of 2008, and concluded it gave the appearance of lower leverage when there wasn't any.

The repurchase obligation never stopped existing. It just lived in Lehman's internal systems, where nobody outside was looking.

Here's the same trade as a Canton contract.

```daml
template Repo
  with
    borrower   : Party
    lender     : Party
    supervisor : Party
    cashLent   : Decimal
    collateral : ContractId Holding   -- held by lender for the term
    maturity   : Time
  where
    signatory borrower, lender
    observer supervisor
    ensure cashLent > 0.0

    choice Repurchase : ContractId Holding
      with cashIn : ContractId Holding
      controller borrower
      do
        c <- fetch cashIn
        assertMsg "must repay full cash leg" (c.amount >= cashLent)
        _ <- exercise cashIn Transfer with newOwner = lender
        exercise collateral Transfer with newOwner = borrower
```

Three things to look at.

`signatory borrower, lender`. The obligation exists only because both sides authorized it. Neither side can delete it alone. The explicit settlement choice is `Repurchase`. Daml also provides an implicit `Archive` choice controlled by all signatories, so borrower and lender could jointly archive it without repayment. The guarantee is that neither can erase the contract alone, and the supervisor can see its archival.

`observer supervisor`. The supervisor is a stakeholder, so its participant receives the `create` view. It sees this repo, with its terms, the moment it commits. That observer declaration grants visibility into this contract, not Lehman's entire book. Other contracts can become visible through separately configured disclosure or transaction structure.

**A visibility catch.** The collateral `Holding` belongs to the lender during the term, so the borrower isn't a stakeholder on it and can't see it. If Lehman submits `Repurchase` as written, its own participant rejects the submission: the contract isn't visible. The lender has to disclose the collateral contract to the borrower at repurchase time ([explicit disclosure](https://docs.canton.network/appdev/deep-dives/explicit-contract-disclosure)). The same catch shows up again in DvP below. Canton's privacy is strict enough that you have to plan for who can even _reference_ a contract.

**What Canton can't do.** It doesn't do accounting. Lehman could still _call_ this a sale on its balance sheet. But the obligation can't be invisible to anyone listed on the contract, because the protocol physically delivers the view to them. The only way to hide it is to leave the supervisor off. So the real question isn't technical. It's whether market rules require regulators as observers on certain templates. That's a governance decision.

![fig.2 — Repo 105 at quarter-end: Lehman's 10-Q vs the supervisor's ACS](/images/Blog/lehman-on-canton/fig2-repo105.svg)

---

## 2. Rehypothecation: "where is my collateral?"

Lehman's London arm, LBIE, ran prime brokerage for around 600 hedge funds. Many signed agreements letting Lehman reuse their collateral. In the US, SEC Rule 15c3-3 caps that reuse at 140% of what the client owes the broker. UK rules had no equivalent cap. LBIE's administrator, PwC, found more than $22B of client assets had been rehypothecated.

When LBIE collapsed, those funds learned their securities weren't "held." They were unsecured claims. Some waited years.

The core problem: the client's picture of its own assets was a statement Lehman sent them. Not the actual state.

In this model, transferring a client's holding through `Transfer` needs the client's authority. A signed permission contract lets the broker exercise that authority within a defined limit.

```daml
template Holding
  with
    custodian : Party
    owner     : Party
    asset     : Text
    amount    : Decimal
  where
    signatory custodian
    observer owner

    choice Transfer : ContractId Holding
      with newOwner : Party
      controller owner
      do create this with owner = newOwner

template RehypoRight
  with
    client : Party
    broker : Party
    cap    : Decimal   -- e.g. 140% of the client's debit balance
    used   : Decimal
  where
    signatory client
    observer broker

    choice Rehypothecate : (ContractId RehypoRight, ContractId LentOut)
      with
        holding : ContractId Holding
        to      : Party
      controller broker
      do
        h <- fetch holding
        assertMsg "cap exceeded" (used + h.amount <= cap)
        _ <- exercise holding Transfer with newOwner = to
        lent  <- create LentOut with broker; client; to; asset = h.asset; amount = h.amount
        right <- create this with used = used + h.amount
        pure (right, lent)

template LentOut
  with
    broker : Party
    client : Party
    to     : Party
    asset  : Text
    amount : Decimal
  where
    signatory broker
    observer client
```

Walk the authority. `Transfer` is controlled by `owner`, the client. The broker can't call it directly. But inside `Rehypothecate`, the broker acts with `client`'s authority (signatory of `RehypoRight`) plus its own (controller). That's enough to exercise `Transfer` on the client's behalf. That delegated path is bounded by `cap`. It is not a guarantee against every action a custodian could take.

Now walk the visibility. `Transfer` is a consuming exercise on a `Holding` where the client is a stakeholder, so the client's participant gets that view and sees its holding archived. The client is also an observer on `LentOut`, so it sees exactly who received the asset and how much. And the cap is enforced in the transaction itself. Go over it and `assertMsg` fails while the broker's own participant is interpreting the transaction, so it's never even submitted. And a broker running a modified participant that skipped the check still couldn't get it through: the client is a signatory of `RehypoRight`, so the client's participant confirms that view, re-runs the check, and rejects.

Canton doesn't ban rehypothecation. In this workflow, it enforces the cap and makes the transfer and loan record visible to the client. The toy `Holding` still trusts its custodian: as sole signatory, the custodian can archive it without the owner's consent. The companion includes a passing counterexample for exactly that limitation.

![fig.3 — the authority chain: client signs RehypoRight → broker exercises → Transfer runs with client's authority](/images/Blog/lehman-on-canton/fig3-authority.svg)

---

## 3. Settlement fails: the trade that never landed

After Lehman, the US Treasury market, the deepest market on earth, started failing to settle. Trades agreed but never delivered. By the New York Fed's count, cumulative fails peaked in October 2008 in the trillions of dollars for the month. With rates near zero there was no cost to failing, so people just didn't deliver. The fix, a "fails charge," arrived in May 2009.

A settlement fail leaves an obligation unfulfilled and can create replacement-cost and liquidity exposure. It does not necessarily mean cash has already moved: conventional DvP also protects against paying without delivery. The narrower question here is how to compose two on-ledger transfers atomically.

On Canton, delivery-versus-payment is one transaction tree.

```daml
template DvPOffer
  with
    seller : Party
    buyer  : Party
    bond   : ContractId Holding   -- seller's
    price  : Decimal
  where
    signatory seller
    observer buyer

    choice Accept : (ContractId Holding, ContractId Holding)
      with cash : ContractId Holding   -- buyer's
      controller buyer
      do
        c <- fetch cash
        assertMsg "short payment" (c.amount >= price)
        cashOut <- exercise cash Transfer with newOwner = seller
        bondOut <- exercise bond Transfer with newOwner = buyer
        pure (cashOut, bondOut)
```

Inside `Accept`, the authority is `seller` (signatory) plus `buyer` (controller). That covers both `Transfer`s. The tree has two subtrees, one per leg. Each leg is confirmed by its custodian (the `Holding` signatory) and by the owner exercising `Transfer`, and the mediator issues one verdict. If any confirmer rejects (wrong amount, already-spent holding, anything), the whole tree is rejected.

There is no "cash moved, bonds didn't" state. That removes principal risk between these two on-ledger legs. It does not make an unfunded trade settle or eliminate every kind of settlement fail.

One practical detail. The buyer's participant has to see the seller's `bond` contract to submit this. In practice you can pass it in via [explicit disclosure](https://docs.canton.network/appdev/deep-dives/explicit-contract-disclosure). For standardized token settlement, [CIP-56's DvP workflow](https://github.com/canton-foundation/cips/blob/main/cip-0056/cip-0056.md#delivery-versus-payment-dvp-transfer-workflows) lets both sides reserve their legs in _[allocations](https://docs.canton.network/appdev/deep-dives/token-standard#allocation)_, which a settlement party executes together. Allocations organize the authority and locking; the executor still needs the relevant contract disclosures.

### What we're doing at OneSwap

At [OneSwap](https://www.oneswap.cc/), we build around that same settlement rule. Our settlement batch contract composes the token standard's allocation and transfer choices: for supported synchronous registries, both legs are allocated and executed inside one Daml choice. If a registry cannot complete the allocation synchronously, that transaction aborts. Canton Coin pools use a separate asynchronous reservation-and-settlement workflow, so the whole user journey is not always one transaction.

The practical lesson is to separate atomic execution from custody and recovery. The [OneSwap SDK's deposit-based flow](https://docs.oneswap.cc/introduction) is custodial: a user deposits funds, OneSwap performs the atomic swap, then returns the output. Those surrounding steps have their own operational risks. This article's toy contracts and local tests do not audit OneSwap's implementation.

![fig.4 — settlement states: T+3 bilateral (agreed → failed → claim) vs atomic DvP (commit | reject)](/images/Blog/lehman-on-canton/fig4-settlement.svg)

---

## 4. The unwind: years vs one query

The part of Lehman that _worked_ is instructive.

DTCC closed out over $500B of Lehman positions, at one point processing 209 million open trades in a day. Central plumbing, central visibility, done in weeks.

There's a present-day connection here. On December 17, 2025, [DTCC announced its partnership with Digital Asset and Canton](https://www.dtcc.com/press-releases/2025/dtcc-and-digital-asset-partner-to-tokenize-dtc-custodied-us-treasury-securities) to tokenize DTC-custodied assets, starting with a subset of U.S. Treasuries. The same announcement said DTCC would join the Canton Foundation as co-chair alongside Euroclear.

That has since moved beyond an announcement. On July 15, 2026, [DTCC reported real production trades using DTC-tokenized assets](https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality), with conversions on Canton and its private Besu network. On October 28, [the DTCC Tokenization Service launched](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live), integrated with both networks. This is a multi-network service, not a claim that DTCC's entire book has moved onto Canton.

To me, that's what makes this counterfactual worth examining: the institution that helped contain Lehman's unwind is now connecting securities it custodies to the network we're discussing.

The rest was a mess. Most of Lehman's derivatives were bilateral OTC contracts. More than 200 subsidiaries in 21 countries. The insolvency laws of more than 80 jurisdictions. Lehman Brothers Holdings emerged from Chapter 11 in 2012 and was still paying creditors in 2026. LBIE's administration only finished in 2025.

The hard part wasn't the math. It was discovery. There was no single source of truth for what the book even was.

On Canton, the book is the set of active contracts the estate's parties are stakeholders on. The participant already stores it as the active contract set (ACS). An authorized administrator asks the [Ledger API's StateService](https://docs.canton.network/sdks-tools/api-reference/ledger-api#key-services) for every active contract visible to the estate's parties at a given offset and gets that participant-visible on-ledger book back as a stream: every repo, every swap, every `LentOut`.

Two properties make this different from 2008.

**No reconciliation.** Each counterparty holds the _same_ contract, same contract ID, same payload, confirmed in the same transaction. There's no "our records show X, theirs show Y." Disputes move from "what is the trade" to "what does the law say about the trade."

**A consistent cut.** The query is pinned to a participant-local ledger offset. You get a consistent snapshot of that participant's visible contracts. An estate spread across multiple participants still needs coordinated collection; one offset is not a global snapshot of 200 entities, and off-ledger obligations still need discovery.

Courts still decide netting and priority. Canton doesn't replace bankruptcy law. It turns step one, "what do we have?", from a forensic project into a read.

![fig.5 — discovery: 80 jurisdictions of paper vs one ACS stream at offset N](/images/Blog/lehman-on-canton/fig5-discovery.svg)

---

## Where Canton makes it worse

I'd be lying if I stopped there. The same mechanics cut the other way.

**Locking collateral can increase liquidity pressure.** Today's markets run on netting and intraday credit, which is a polite way of saying "I'll pay you later." Both assets must be available when the atomic exchange executes. Prefunding and advance allocation are workflow choices, not universal requirements of atomicity; the allocation workflow discussed here locks holdings until settlement or release. For a firm in a liquidity squeeze, being forced to lock everything up front is brutal. A Lehman on Canton might run out of usable cash _faster_.

**No weekends.** The NY Fed used Saturday and Sunday to try to save Lehman. On a ledger that commits 24/7, collateral calls and runs don't wait for Monday.

**The synchronizer is load-bearing.** Atomicity comes from the sequencer and mediator. On the [Canton Global Synchronizer](https://docs.canton.network/global-synchronizer/understand/introduction) they're run by a BFT set of super validators, not one operator. But if its ordering stalls, transactions depending on that synchronizer cannot settle. That's a different failure mode from 2008's, not an absent one.

**Privacy by default is opacity by default.** Sub-transaction privacy is why banks will use this. It's also why, without deliberate design, nobody sees the whole system. The supervisor only sees a repo if someone wrote `observer supervisor`. Systemic visibility is a template-design and governance choice, not a protocol guarantee.

---

## Scorecard

- **Repo 105 hid ~$50B of obligations** → Shared repo contract + supervisor observer. **Visible within the model; accounting and reporting rules still matter**
- **Funds didn't know where collateral was** → Client-authorized reuse + a visible loan record. **Improved for the modeled path; custodian trust remains**
- **Principal risk between settlement legs** → One transaction tree, one mediator verdict. **Removed within the atomic transaction; trades can still fail to settle**
- **Years to discover the book** → ACS at a participant-local offset, shared contract IDs. **Simpler for visible on-ledger contracts; courts still decide**
- **Leverage on bad mortgage bets** → nothing. **Not fixed. No ledger fixes this.**
- **Liquidity crunch** → Prefunded atomic settlement. **Possibly worse**

---

## Reproduce it, including the counterexamples

The [public companion project](https://github.com/virajbhartiya/virajbhartiya.com/tree/main/research/lehman-on-canton) includes the exact three Daml excerpts, ten scripts, a one-command verification runner and the recorded results from Daml SDK 3.4.8. The runner also checks that the article's snippets match the tested source.

The tests cover authorized and unauthorized actions, disclosure, short payment, rollback when the second transfer fails, and queries of visible active contracts. Two deliberately successful counterexamples show where the toy model is insufficient: it accepts payment in the wrong asset if the amount is large enough, and it lets a holding's custodian archive that holding without the owner's signature. Atomicity does not repair missing business rules.

These are local Daml Script tests, not an experiment across independent validators. They do not measure encrypted network traffic, test a malicious participant, or prove a global historical ACS snapshot. Those protocol and API statements rely on the linked documentation. The diagrams are conceptual illustrations; in particular, the settlement figure contrasts outcomes rather than historical Treasury settlement conventions, and the discovery figure applies to a participant's visible on-ledger contracts.

The examples also omit production requirements such as instrument validation, valuation, maturity enforcement and custody safeguards. The companion README maps each test to its claim and lists those limits explicitly.

---

## So what?

Lehman was a bank that took too much risk. That part's on the people.

But the damage didn't come from the risk alone. It came from the fog. Fragmented records made it harder to establish what was owed, where collateral sat and what had settled. That uncertainty amplified an already systemic crisis.

Canton doesn't remove risk. It can make the modeled obligations and settlement state directly visible to authorized parties. The coverage depends on the contracts, their disclosure rules and what actually makes it onto the ledger.

Which means the most important line in a financial Daml template might not be a choice at all.

It might be `observer`.

---

_Disclosure: I work at SatsTerminal, which builds OneSwap, a DEX on the Canton Network. Nobody paid for this piece. The code is illustrative, not production. The companion records ten passing local Daml Script tests on SDK 3.4.8 and states exactly what they establish. I am sharing this article for consideration under the Canton Community Research Grants program; no grant award is claimed. Historical figures are from the public sources below._

---

## References

- [Anton R. Valukas, Report of Examiner, In re Lehman Brothers Holdings Inc. (2010), Vol. 3 (Repo 105)](https://web.stanford.edu/~jbulow/lehmandocs/VOLUME%203.pdf)
- [Lehman Brothers Q3 2008 preliminary results, CNN Money (Sep 10, 2008)](https://money.cnn.com/2008/09/10/news/companies/lehman/)
- [17 CFR 240.15c3-3, customer protection rule](https://www.govinfo.gov/content/pkg/CFR-2010-title17-vol3/pdf/CFR-2010-title17-vol3-sec240-15c3-3.pdf)
- [PwC, LBIE Final Report (October 2025)](https://www.pwc.co.uk/business-recovery/administrations/lehman/lbie/LBIE_Final_Report_October_2025.pdf)
- [Felix Salmon, "Lehman Europe and Prime Brokerage Counterparty Risk" (2008)](https://www.felixsalmon.com/2008/10/lehman-europe-and-prime-brokerage-counterparty-risk/)
- [Euromoney, "Prime brokerage: The day the music stopped."](https://www.euromoney.com/article/b1322h65c9hbf8/prime-brokerage-the-day-the-music-stopped)
- [Risk.net, "DTCC closes out over $500 billion of Lehman exposure."](https://www.risk.net/infrastructure/clearing/1518577/dtcc-closes-out-over-500-billion-lehman-exposure)
- [IPE, "DTCC closes out $500bn in Lehman's bankruptcy."](https://ipe.com/dtcc-closes-out-500bn-in-lehmans-bankruptcy/29564.article)
- [CCP Global, "The Lehman Case."](https://ccp-global.org/the-lehman-case)
- [Garbade et al., "The Introduction of the TMPG Fails Charge for U.S. Treasury Securities," FRBNY Economic Policy Review (2010)](https://www.newyorkfed.org/research/epr/10v16n2/exesum_garb.html)
- [Liberty Street Economics (FRBNY) on Treasury settlement fails](https://libertystreeteconomics.newyorkfed.org/?p=817)
- [Canton documentation: Daml authorization](https://docs.canton.network/appdev/modules/m3-authorization)
- [Canton documentation: sub-transaction privacy](https://docs.canton.network/appdev/deep-dives/privacy-model)
- [Canton documentation: explicit contract disclosure](https://docs.canton.network/appdev/deep-dives/explicit-contract-disclosure)
- [Canton documentation: token standard and allocations](https://docs.canton.network/appdev/deep-dives/token-standard)
- [Canton documentation: Ledger API and StateService](https://docs.canton.network/sdks-tools/api-reference/ledger-api)
- [Canton documentation: Global Synchronizer node roles](https://docs.canton.network/global-synchronizer/understand/introduction)
- [CIP-56, Canton Network Token Standard](https://github.com/canton-foundation/cips/blob/main/cip-0056/cip-0056.md)
- [DTCC, Canton tokenization partnership and Foundation co-chair announcement (December 17, 2025)](https://www.dtcc.com/press-releases/2025/dtcc-and-digital-asset-partner-to-tokenize-dtc-custodied-us-treasury-securities)
- [DTCC, production trades using DTC-tokenized assets (July 15, 2026)](https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality)
- [DTCC, Tokenization Service launch (October 28, 2026)](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live)
- [OneSwap SDK documentation: atomic DvP and the deposit-based swap flow](https://docs.oneswap.cc/introduction)
