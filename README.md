# meta.ragbaz

The independently owned Cloudflare Worker for RAGBAZ meta-documents: reusable
publication surfaces rather than embedded papers. First mount:
`https://meta.ragbaz.cc/markdoc-ragbaz-sci-tufte/`.

## Ownership

- This repository: Worker, prefix routing, response policy and deployment.
- `ragbaz-common`: shared Markdoc renderer, sci/Tufte surface and package builder.
- Authors: manuscripts, sources, authorship, evidence and publication decisions.

No renderer implementation or witness manuscript is copied here. A build consumes
an explicit shared checkout and records its Git base, dirty state and file manifest.
`renderer.lock.json` pins the exact shared commit. Builds require that commit in a
clean checkout, including no untracked files, before importing the renderer.
Commit pinning does not constitute independent release or security review.

## Build and check

```sh
npm ci
npm test
npm run build -- --common /path/to/clean-pinned-ragbaz-common
npm run bundle
npm run smoke                      # real local workerd, asset hashes/MIME and routes
```

The build creates `build/public/markdoc-ragbaz-sci-tufte/`, with standalone HTML,
starter Markdown, the pinned rendering contract, SVG plates, runtime/CSS assets,
license notices and byte manifests. It does not copy the source checkout or
publish the witness paper. `build/provenance.json` is operator evidence outside
the public asset directory; a scrubbed dependency state accompanies public assets.

Open the mount without parameters for a neutral template. Supply
`?document=starter.md` or an encoded permitted Markdown URL; optionally add
`&sha256=<content digest>`. This is a browser-side, credential-free, policy-bounded
document load, not a Worker fetch proxy. Duplicate/bad parameters and mismatches
are refused visibly. No document parameter means no document network request.
The bundled contract remains readable offline; local files use the Open action.

## Routes and deployment

The Worker serves `/markdoc-ragbaz-sci-tufte`, `/heartfulness`, the three
`/aether/<variant>` mounts and their explicitly allowlisted public assets.
`/aether/` redirects to Prima materia. Slashless mounts redirect with their
query intact; unknown paths return 404 and writes return 405. Missing asset binding
returns 503. Public assets
do not forward Cookie/Authorization or set cookies. No D1, R2, KV or secrets needed.

`wrangler.jsonc` proposes a prefix route, not ownership of the whole domain.
`npm run bundle` is a dry run. Production deployment is a separate explicit action:
confirm the Cloudflare account/zone and existing route/access settings, review the
shared dependency, then use Wrangler with credentials only in the environment.
Do not infer a deployed Worker from a DNS record or from an HTTP 403 at the domain.
Do not bypass a domain-wide access policy without authorization.

Initial prototype record: user-authorized templates deployed 2026-10-15. Worker version
`fb81fbb0-e940-4e08-a996-a8920db13b73`. All 75 public file hashes, redirect/query,
refusals and live Chromium rendering were verified, including actual Google font
faces, starter loading and 320px layouts across all five templates. This is not an independently
reviewed, commit-bound release; that deployment used a working tree.

Git-bound redeployment: `9fe0369b-2de3-491c-9223-a2cc72d5405a`, built from Worker
commit `009fc3aca12f69d95e65c2273bc4edf7492fade7` and clean renderer commit
`6b2861713d2fea269248fa1d082704481c8f6611`. Both CI suites pass. All 75 normal-URL
public hashes, redirects, HEAD and refusal checks passed after edge propagation.
The renderer PR remains open; self-review findings are in `docs/RELEASE-REVIEW.md`.

## Heartfulness

The build now also emits `build/public/heartfulness/`, using the same shared
renderer and bounded document-loading contract, with a separate host-owned
botanical presentation. Pale yellow grain, original rose frames and section
flourishes can be adjusted under Document tools → Dress the page. System/Light/
Dark and offline opening remain available. Design direction: `docs/HEARTFULNESS.md`.

Live: `https://meta.ragbaz.cc/heartfulness/`. Original flowers, optional section
ornaments and independently switchable grain remain separate from manuscript
content. The completed polish includes scoped SVG styles, touch targets and
forced-colors suppression. The hostname root remains outside these mounts.

## Aether

- `https://meta.ragbaz.cc/aether/prima-materia/`
- `https://meta.ragbaz.cc/aether/sun-and-moon/`
- `https://meta.ragbaz.cc/aether/blackening/`

These new symbolic specimens share the bounded reader but have distinct palettes,
typography and original accessible plates. Family navigation never carries the
current manuscript URL. Design direction: `docs/AETHER.md`.

## Curated remote fonts

Typography → Theme fonts (Google) is an explicit alternative; System fonts is the
offline default. Pairings (titles / text): sci Source Serif 4 / Source Serif 4;
Heartfulness Cormorant Garamond / EB Garamond; Prima materia IM Fell English /
Crimson Pro; Sun and moon Cormorant Garamond / Spectral; Blackening Cormorant Infant /
EB Garamond. Sci tools additionally use Source Sans 3. Only host-specified Google
CSS/font endpoints are enabled; documents cannot supply font URLs. Remote font
bytes are not hash-pinned, and layout may change. Failed loading falls back visibly.

`npm run smoke` checks all five packages and manifest assets against real local
workerd. Live evidence: `/srv/ragbaz/reports/meta-aether-deployment-20261015.json`
and `/srv/ragbaz/reports/meta-aether-live-browser-20261015.json`. The Git-bound
redeployment record is `/srv/ragbaz/reports/meta-git-release-20261015.json`.
No independent release review or manuscript-publication approval is implied.

## Git and CI

Released 2026-10-22 as Worker version `028e1c31-b33c-4186-b490-629f3de67a81`.
All 75 public file hashes and live Chromium checks passed across the five templates;
route patterns and assignments are unchanged. See [release verification](docs/RELEASE-2026-10-22.md)
for exact commits, checks and remaining CI/review caveats.

The 2026-10-22 renderer update pins `326fee2`: Document tools now offers
**Document checks** (active Markdown digest and rendering diagnostics) and
**Inspect current Markdown** (inert text). Invalid UTF-8 local files leave the
current document intact. The shared CLI adds opt-in strict generation and JSON
integrity reports; neutral packages use strict generation. This pin also includes
the previously tested manuscript-only printing and portable prepared-assets
assembly. No route, access policy or manuscript publication is changed by the pin.
Shared validation: 122 tests, including offline Chromium; release/deployment
verification is recorded separately rather than inferred from this dependency file.

Public Worker repository: https://github.com/tabenius/meta.ragbaz. The renderer
remains in its owning repository. Check out the full commit in `renderer.lock.json`,
run `npm ci` in both repositories, then use the build command above. Research
manuscripts and generated outputs are not committed here.

CI runs offline Worker/pin refusal tests on pushes and pull requests. Push/manual
integration checks build all five templates, bundle Wrangler and run real-workerd
smoke tests. A dedicated read-only deploy key, stored as `COMMON_READ_KEY`, permits
checkout of the private renderer repository; credentials are not persisted in
that checkout. Fork PRs get unit coverage without the private-repository key;
integration must pass on the trusted push before deployment. CI never deploys or
receives Cloudflare credentials. Actions are SHA-pinned and permissions read-only.
