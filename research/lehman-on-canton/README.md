# Lehman on Canton: executable companion

Reproducible Daml examples for [What if Lehman Brothers had run on Canton?](https://virajbhartiya.com/blog/what-if-lehman-brothers-had-run-on-canton).

The three code excerpts in the article are reproduced verbatim in [Lehman.daml](daml/Lehman.daml). [Test.daml](daml/Test.daml) contains ten executable scripts, including two counterexamples that expose limitations of the illustrative contracts. This is an educational model, not production financial infrastructure or a simulation of Lehman's balance sheet.

## Reproduce

Requires Git, Bash, Python 3, Java 17+, and Daml SDK **3.4.8**. This is the pinned research environment, not a recommendation to downgrade an existing application. See the [official SDK 3.4.8 release](https://github.com/digital-asset/daml/releases/tag/v3.4.8) and [Daml testing guide](https://docs.canton.network/appdev/modules/m3-testing).

```sh
git clone https://github.com/virajbhartiya/virajbhartiya.com.git
cd virajbhartiya.com
# If SDK 3.4.8 is not installed:
daml install 3.4.8
./research/lehman-on-canton/verify.sh
```

The script pins `DAML_SDK_VERSION=3.4.8`, checks that the article excerpts match the tested code, builds the DAR, then runs the scripts. Any failed step returns a nonzero exit code. No validator, wallet, funds, credentials or live network is needed. The initial SDK installation requires a download.

Expected outcome: **10 scripts pass**, with all five templates created. See [the recorded verification output](verification.txt), captured on November 7, 2026. A passing script containing `submitMustFail` means the expected rejection occurred; it does not mean every submitted transaction succeeded.

The legacy assistant emits a deprecation notice. The compiler also warns that this educational package combines templates and `daml-script`; it is intentionally local-only. For a deployable application, separate templates and tests into different packages. Do not upload this DAR to a production ledger.

## What the scripts establish

| Script                | Evidence                                                                                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `repo`                | One-sided creation and archival fail; the supervisor can query the repo; short repayment and missing disclosure fail; disclosed repayment succeeds and archives the repo.                                  |
| `repoJointArchive`    | Neither signatory nor observer can archive alone; both signatories together can archive without repayment; an unrelated party cannot query the repo.                                                       |
| `rehypo`              | The broker cannot directly transfer the client's holding; the signed right authorizes reuse; the client sees the resulting loan; an over-cap attempt leaves the remaining holding and cap state unchanged. |
| `dvp`                 | With the bond disclosed, insufficient payment fails and cash, bond and offer all remain active.                                                                                                            |
| `dvpVisibility`       | Adequate payment still fails without bond disclosure; the original contracts remain active.                                                                                                                |
| `dvpDisclosed`        | Disclosure enables authorized settlement; both recipients receive the expected assets and amounts; the input holdings and offer are consumed.                                                              |
| `dvpRollback`         | Cash transfer is evaluated before a second-leg authorization failure; rejection leaves the original cash and bond active and creates no seller holding.                                                    |
| `activeBook`          | A party's query includes its visible active holdings and excludes another party's holdings and consumed contracts.                                                                                         |
| `wrongAssetAccepted`  | Counterexample: the toy DvP checks amount but not currency, so an equal quantity of the wrong asset is accepted.                                                                                           |
| `custodianCanArchive` | Counterexample: the toy holding's sole signatory can archive it without the owner's consent.                                                                                                               |

## Evidence boundary

`daml test` runs Daml Script against a local script test environment. These results demonstrate model-level authorization, visibility, queries and atomic rollback. They are **not** packet captures, a multi-validator deployment, a Byzantine-participant test, or evidence of production throughput, availability or OneSwap behavior.

The article's discussion of encrypted views, sequencers, mediators and confirmation comes from [Canton's protocol documentation](https://docs.canton.network/appdev/deep-dives/privacy-model). The ACS test does not call `StateService` at historical offsets or establish a global snapshot across participants. The [Ledger API documentation](https://docs.canton.network/sdks-tools/api-reference/ledger-api) explains that interface separately.

`submitMustFail` checks rejection, not a particular error code. Tests isolate the intended failure by satisfying other preconditions where possible. For example, the short-payment test explicitly discloses the bond, while the disclosure test supplies enough cash.

## Deliberate model limitations

- `Holding` trusts its custodian, has no positive-amount check, and uses a text asset label instead of a validated instrument identity.
- `DvPOffer` does not validate payment currency, issuer, expiry, positive price, or make change for overpayment. Atomic execution enforces the rules written, including incomplete rules.
- `Repo.maturity` is stored but not enforced. Joint signatories can archive the obligation without exercising repayment. Neither the contract nor the test determines legal discharge or accounting treatment.
- `RehypoRight.cap` is an absolute quantity in this single-asset example. It does not calculate a regulatory ratio, value collateral, aggregate multiple mandates, or prevent the custodian from using its own signatory powers.
- Observer visibility does not establish legal ownership, custody segregation, solvency or system-wide regulatory visibility. Off-ledger obligations remain outside the model.

These limitations are disclosed rather than silently repaired so readers can reproduce the exact examples shown in the article. Real financial contracts require substantially stronger business rules and review.

## Disclosure

The author works at SatsTerminal, which builds OneSwap on Canton. The article was not commissioned or paid for and is being shared for consideration under the Canton Community Research Grants program. No grant award is claimed. Historical and protocol claims have sources linked in the article; the scripts support only the bounded claims listed above.
