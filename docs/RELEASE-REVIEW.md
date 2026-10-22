# Publication reader release self-review — 2026-10-15

Scope: shared renderer, source loading/inspection, browser controls, all five
presentations, template packaging, Worker routing and the release/CI boundary.
This is agent self-review, not independent security review or manuscript approval.

## Findings and changes

- **Nonportable tests:** replace host-specific paths with isolated portable
  temporary directories. Browser tests must fail rather than silently skip in CI.
- **Unpinned executable dependency:** `renderer.lock.json` requires a full commit
  and clean checkout, including untracked files, before importing renderer code.
  Regression tests refuse wrong commits, malformed locks and modified checkouts.
- **Offline contract after refusal:** rejected manuscript rendering clears current
  state; optional access now keeps the host-owned contract inspectable. A real
  Chromium regression exercises the complete refusal/inspection path.
- **Typography accessibility:** associate the selector with its loading/privacy
  status. Exercise selection with denied storage. Existing checks cover opt-in
  requests, offline failure fallback and spread reflow after typography changes.
- **CI/runtime drift:** pin current Actions by SHA and use Ubuntu 24.04. CI runs
  renderer browser tests plus Worker tests, all-template builds, bundling and real
  local workerd hash/MIME/redirect/refusal checks. No deployment credentials in CI.
- **Hosted browser races:** subsequent CI runs exposed slow Chrome startup and
  fixed-sleep assertions. Serialize test files, wait for reader readiness, disable
  unnecessary browser services and bound cleanup to the inspected owned PID.
  Do not suppress failed application assertions with blind retries.
- **Private renderer access:** use a dedicated read-only repository deploy key;
  do not expose a broad account token. Do not give fork PR jobs that key.

## Boundaries retained

No manuscript-selected fonts, executable SVG or imports; no document fetch proxy;
no credentials on source fetches; explicit digest/refusal behavior; host-owned
plates; explicit public projections; optional decoration and system-font fallback.
Family navigation does not carry manuscript parameters. Worker requests strip
credentials/query from asset keys and normalize upstream failures. Only named
prefix routes are managed; domain-root/access settings are outside this release.

Research manuscripts, private source snapshots and generated reports are excluded
from both release commits. The authored specimen texts are new and public.

## Remaining limits

Google font bytes are mutable and not hash-pinned; explicit selection contacts
Google and can change line breaks. Browser CORS and provider limits still apply.
Standalone HTML needs inline runtime/styles; CSP is not a substitute for the
renderer allowlists. Git pinning establishes reproducible source, not trustworthy
authorship, independent review or a new redistribution license. The renderer PR
remains open for independent review; deployment does not imply merge approval.
# 2026-10-22 renderer update

Self-review for renderer `326fee2f55eb8bfff0a5d98e105ab210e272e7ce`:

- Opt-in strict builds retain existing HTML on diagnostics; reports explicitly
  describe candidate bytes, not a retained previous output. Hard failures do not
  refresh reports, so CI must always check exit status.
- Output/report path collisions are refused, including existing symlink/hard-link
  aliases and missing outputs under symlinked parent directories. This is an
  accidental-overwrite guard, not protection against concurrent filesystem attacks.
- Reader checks distinguish active Markdown SHA-256 from embedded render identity.
  Diagnostic/source text uses inert DOM APIs; inspection enables no network action.
  Render refusal clears inspection state. Invalid UTF-8 preserves the old document;
  valid BOM/CRLF bytes remain part of the active digest.
- Shared 122-test suite passes with offline Chromium, narrow-screen drawer checks,
  refusal/local-file transitions, all-template printing and portable frozen outputs.
- No new origins, executable manuscript content, route patterns or access-policy
  changes. Deploy only clean commit-pinned packages and verify actual public bytes.

This is not independent security review or approval to publish any manuscript.
