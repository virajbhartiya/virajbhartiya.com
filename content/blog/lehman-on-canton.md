---
title: "What if Lehman Brothers had run on Canton?"
description: "Lehman didn't die because of one bad bet. It died because nobody could see anything. I modelled the four failures of its last week in Daml and traced what the Canton protocol does with each."
publishedAt: "2026-11-05"
tags: ["Canton", "Daml", "Finance", "Settlement", "Research"]
image: "/images/Blog/lehman-on-canton/banner.png"
author: "Viraj Bhartiya"
---

Lehman didn't die because of one bad bet. It died because nobody could see anything.

Not the regulators. Not the hedge funds whose collateral it held. Not the banks lending it money overnight. When it filed at 1:45am on September 15, 2008, it took the industry years to work out who owed what to whom.

I work on DEX infrastructure on Canton. Canton's whole pitch is a ledger where trades settle atomically, stay private, and still show the right people the right things. That's exactly the plumbing Lehman didn't have.

So this post takes the four things that broke that week, models each one in Daml, and walks through what the Canton protocol actually does with it. Not marketing. Authorization rules, transaction views, who receives which bytes.

First, what this isn't. Canton would not have saved Lehman. A firm levered 30-to-1 on mortgage paper goes bust on any ledger. That's a judgment problem, not a plumbing problem.

What changes is *how* it goes bust.

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

**Contracts have stakeholders.** Every Daml contract declares `signatory` parties (who must authorize its creation and are bound by it) and `observer` parties (who can see it). Signatories plus observers are the contract's stakeholders.

**Authority flows through choices.** When a party exercises a choice on a contract, everything that happens inside that choice runs with the authority of the contract's signatories *plus* the choice's controller. That's the only way authority moves. You can't sign for someone else. You can only act inside a contract they already signed.

**Transactions are trees, and each party sees only its branch.** A transaction is a tree of actions: creates, exercises, fetches. The protocol splits it into *views*, one per subtree, and each view goes only to participants hosting the parties that have to see it (its informees). This is sub-transaction privacy. A bank in a three-leg trade sees its leg, not yours.

**Commit is two-phase and atomic.** The submitting participant encrypts each view for its recipients and hands it to the synchronizer. The sequencer orders and delivers ciphertext. It sees who receives what, never what's inside. The confirming participants (the ones hosting signatories) validate their views and vote. The mediator aggregates the votes and issues one verdict for the whole tree: commit or reject. No partial outcomes.

![fig.1 — one transaction, three views: what the sequencer, mediator and each participant actually receive](/images/Blog/lehman-on-canton/fig1-views.svg)

Keep those four rules in mind. Each failure below comes down to one of them.

---

## 1. Repo 105: the obligation that disappeared

Lehman funded itself with repo: sell securities today, buy them back tomorrow. Economically, it's a loan.

Repo 105 dressed the loan up as a sale. By handing over about $105 of securities for every $100 of cash, Lehman got the trade booked as a *sale* under its accounting treatment. Cash came in. The liability vanished. Right before quarter-end. The court examiner, Anton Valukas, found Lehman moved about $50B off its balance sheet this way, and concluded it gave the appearance of lower leverage when there wasn't any.

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

**`signatory borrower, lender`.** The obligation exists only because both sides authorized it. Neither side can delete it alone. Archiving it takes a choice on the contract, and the only choice offered is `Repurchase`. The debt doesn't go away until it's paid.

**`observer supervisor`.** The supervisor is a stakeholder, so its participant receives the `create` view. It sees this repo, with its terms, the moment it commits. It sees nothing else Lehman does that it isn't a stakeholder on.

**A visibility catch.** The collateral `Holding` belongs to the lender during the term, so the borrower isn't a stakeholder on it and can't see it. If Lehman submits `Repurchase` as written, its own participant rejects the submission: the contract isn't visible. The lender has to disclose the collateral contract to the borrower at repurchase time (explicit disclosure). The same catch shows up again in DvP below. Canton's privacy is strict enough that you have to plan for who can even *reference* a contract.

**What Canton can't do.** It doesn't do accounting. Lehman could still *call* this a sale on its balance sheet. But the obligation can't be invisible to anyone listed on the contract, because the protocol physically delivers the view to them. The only way to hide it is to leave the supervisor off. So the real question isn't technical. It's whether market rules require regulators as observers on certain templates. That's a governance decision.

![fig.2 — Repo 105 at quarter-end: Lehman's 10-Q vs the supervisor's ACS](/images/Blog/lehman-on-canton/fig2-repo105.svg)

---

## 2. Rehypothecation: "where is my collateral?"

Lehman's London arm, LBIE, ran prime brokerage for around 600 hedge funds. Many signed agreements letting Lehman reuse their collateral. US rules cap that reuse at 140% of what the client owes. UK rules had no equivalent cap. LBIE's administrator, PwC, found more than $22B of client assets had been rehypothecated.

When LBIE collapsed, those funds learned their securities weren't "held." They were unsecured claims. Some waited years.

The core problem: the client's picture of its own assets was a statement Lehman sent them. Not the actual state.

On Canton, reuse needs the client's authority. Authority only flows through a contract the client signed. So the permission itself becomes a contract.

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

Walk the authority. `Transfer` is controlled by `owner`, the client. The broker can't call it directly. But inside `Rehypothecate`, the broker acts with `client`'s authority (signatory of `RehypoRight`) plus its own (controller). That's enough to exercise `Transfer` on the client's behalf. That's the only path, and it's bounded by `cap`.

Now walk the visibility. `Transfer` is a consuming exercise on a `Holding` where the client is a stakeholder, so the client's participant gets that view and sees its holding archived. The client is also an observer on `LentOut`, so it sees exactly who received the asset and how much. And the cap is enforced in the transaction itself. Go over it and the client's participant rejects the view, so the whole transaction fails.

Canton doesn't ban rehypothecation. That's a business decision. It just makes quiet rehypothecation impossible, and an over-cap one fails at commit time.

![fig.3 — the authority chain: client signs RehypoRight → broker exercises → Transfer runs with client's authority](/images/Blog/lehman-on-canton/fig3-authority.svg)

---

## 3. Settlement fails: the trade that never landed

After Lehman, the US Treasury market, the deepest market on earth, started failing to settle. Trades agreed but never delivered. The New York Fed counted cumulative fails peaking at around $10 trillion in October 2008. With rates near zero there was no cost to failing, so people just didn't deliver. The fix, a "fails charge," arrived in May 2009.

Each fail is a hanging exposure. I've sent cash, you haven't sent bonds. Now multiply that across every counterparty of a dying bank.

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

Inside `Accept`, the authority is `seller` (signatory) plus `buyer` (controller). That covers both `Transfer`s. The tree has two subtrees, one per leg. The bond's custodian confirms the bond leg, the cash custodian confirms the cash leg, and the mediator issues one verdict. If either custodian rejects (wrong amount, already-spent holding, anything), the whole tree is rejected.

There is no "cash moved, bonds didn't" state. The failure that defined October 2008 has nowhere to exist.

One practical detail. The buyer's participant has to see the seller's `bond` contract to submit this. In practice you either pass it in via explicit disclosure, or do what Canton's token standard (CIP-56) does: both sides lock their legs into *allocations* up front, and a settlement party executes them together. That's how we settle swaps. Same atomicity, cleaner visibility.

![fig.4 — settlement states: T+3 bilateral (agreed → failed → claim) vs atomic DvP (commit | reject)](/images/Blog/lehman-on-canton/fig4-settlement.svg)

---

## 4. The unwind: years vs one query

The part of Lehman that *worked* is instructive.

DTCC closed out over $500B of Lehman positions, at one point processing 209 million open trades in a day. Central plumbing, central visibility, done in weeks.

The rest was a mess. Most of Lehman's derivatives were bilateral OTC contracts. More than 200 subsidiaries in 21 countries. The insolvency laws of more than 80 jurisdictions. The estate took over a decade to wind down.

The hard part wasn't the math. It was discovery. There was no single source of truth for what the book even was.

On Canton, the book is the set of active contracts the estate's parties are stakeholders on. The participant already stores it as the active contract set (ACS). An administrator asks the Ledger API's state service for every active contract visible to the estate's parties at a given offset and gets the whole book back as a stream: every repo, every swap, every `LentOut`.

Two properties make this different from 2008.

**No reconciliation.** Each counterparty holds the *same* contract, same contract ID, same payload, confirmed in the same transaction. There's no "our records show X, theirs show Y." Disputes move from "what is the trade" to "what does the law say about the trade."

**A consistent cut.** The query is pinned to a ledger offset. You get the book as it stood at one exact point in the order of transactions, not a patchwork of end-of-day files from 200 entities.

Courts still decide netting and priority. Canton doesn't replace bankruptcy law. It turns step one, "what do we have?", from a forensic project into a read.

![fig.5 — discovery: 80 jurisdictions of paper vs one ACS stream at offset N](/images/Blog/lehman-on-canton/fig5-discovery.svg)

---

## Where Canton makes it worse

I'd be lying if I stopped there. The same mechanics cut the other way.

**Atomic means prefunded.** Today's markets run on netting and intraday credit, which is a polite way of saying "I'll pay you later." Atomic DvP needs both legs to exist at commit time. Allocations lock holdings until settlement. For a firm in a liquidity squeeze, being forced to lock everything up front is brutal. A Lehman on Canton might run out of usable cash *faster*.

**No weekends.** The NY Fed used Saturday and Sunday to try to save Lehman. On a ledger that commits 24/7, collateral calls and runs don't wait for Monday.

**The synchronizer is load-bearing.** Atomicity comes from the sequencer and mediator. On the Canton global synchronizer they're run by a BFT set of super validators, not one operator. But if ordering stalls, nothing settles anywhere. That's a different failure mode from 2008's, not an absent one.

**Privacy by default is opacity by default.** Sub-transaction privacy is why banks will use this. It's also why, without deliberate design, nobody sees the whole system. The supervisor only sees a repo if someone wrote `observer supervisor`. Systemic visibility is a template-design and governance choice, not a protocol guarantee.

---

## Scorecard

- **Repo 105 hid ~$50B of obligations** → Signatory-bound contract + supervisor observer. **Fixed, if supervisors are on the template**
- **Funds didn't know where collateral was** → Authority only via client-signed contract; client is stakeholder on every move. **Fixed**
- **Trillions in settlement fails** → One transaction tree, one mediator verdict. **Fixed**
- **Years to discover the book** → ACS at a single offset, shared contract IDs. **Fixed for discovery; courts still decide**
- **Leverage on bad mortgage bets** → nothing. **Not fixed. No ledger fixes this.**
- **Liquidity crunch** → Prefunded atomic settlement. **Possibly worse**

---

## So what?

Lehman was a bank that took too much risk. That part's on the people.

But the damage didn't come from the risk alone. It came from the fog. Nobody could see what was owed, where collateral sat, which trades had actually settled, or what the book contained. That fog turned one bank's failure into a global freeze.

Canton doesn't remove risk. It removes fog. For the parties written onto the contract.

Which means the most important line in a financial Daml template might not be a choice at all.

It might be `observer`.

---

*Disclosure: I work at SatsTerminal, which builds OneSwap, a DEX on the Canton Network. Nobody paid for this piece. The code is illustrative, not production, but it compiles on Daml SDK 3.4.8, and every claim above about what succeeds or fails has a Daml Script test. Historical figures are from the public sources below.*

---

## References

- [Anton R. Valukas, Report of Examiner, In re Lehman Brothers Holdings Inc. (2010), Vol. 3 (Repo 105)](https://web.stanford.edu/~jbulow/lehmandocs/VOLUME%203.pdf)
- [Felix Salmon, "Lehman Europe and Prime Brokerage Counterparty Risk" (2008)](https://www.felixsalmon.com/2008/10/lehman-europe-and-prime-brokerage-counterparty-risk/)
- [Euromoney, "Prime brokerage: The day the music stopped."](https://www.euromoney.com/article/b1322h65c9hbf8/prime-brokerage-the-day-the-music-stopped)
- [Risk.net, "DTCC closes out over $500 billion of Lehman exposure."](https://www.risk.net/infrastructure/clearing/1518577/dtcc-closes-out-over-500-billion-lehman-exposure)
- [IPE, "DTCC closes out $500bn in Lehman's bankruptcy."](https://ipe.com/dtcc-closes-out-500bn-in-lehmans-bankruptcy/29564.article)
- [CCP Global, "The Lehman Case."](https://ccp-global.org/the-lehman-case)
- [Garbade et al., "The Introduction of the TMPG Fails Charge for U.S. Treasury Securities," FRBNY Economic Policy Review (2010)](https://www.newyorkfed.org/research/epr/10v16n2/exesum_garb.html)
- [Liberty Street Economics (FRBNY) on Treasury settlement fails](https://libertystreeteconomics.newyorkfed.org/?p=817)
- [Canton documentation: Daml authorization, privacy and the transaction protocol](https://docs.canton.network/)
- [CIP-56, Canton Network Token Standard](https://github.com/canton-foundation/cips)
