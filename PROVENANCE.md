# Provenance

Created 2026-10-15 at Tobias's request for a new Worker and the
markdoc-ragbaz-sci-tufte meta-document. Chosen ownership: a separate repository,
not product deployment policy inside ragbaz-common or a new project website in
ragbaz-cf-template. This Worker is a new bounded static-asset adapter.

Rendering stays in ragbaz-common. During development its source checkout is
explicitly supplied to the build, which records actual Git/dirty state and hashes
the generated package. There is no claim that uncommitted prototype work is a
reviewed Git release. The shared builder publishes full upstream license notices;
no license is invented for source without one. No credential or private paper is
part of this repository or its public assets.

## Changelog

- 2026-10-26: Deploy clean pushed Worker `79f0c98` and pinned renderer `6a297ef`
  after successful renderer PR/merge CI and successful host push
  worker/integration CI. Version `7024244d-b771-4272-b5de-6c54a4dee480`. Verify all
  75 public files against local manifests and live HTTP behavior. Live Chromium
  loaded a local Chart.js/Cytoscape document through the deployed reader: two
  interactive canvases, exact static/table/source fallbacks, no added network
  request, no global leakage, no page/CSP error, and static SVG restored for print.
  Preserve all 11 route patterns, assignments and unrelated route records; no
  access-policy operation. Chart.js 4.6.1, Cytoscape.js 3.34.4 and `@kurkle/color`
  0.3.4 are license-inventoried; the shared suite is 133/133 with zero skips. This
  is agent self-review, not independent security or manuscript-publication approval.
  Exact evidence is in `docs/RELEASE-2026-10-26.md`.

- 2026-10-22: Deploy clean pushed Worker `331846d` and pinned renderer `326fee2`
  after successful host push integration/Worker CI. Version
  `028e1c31-b33c-4186-b490-629f3de67a81`. Verify all 75 public files against local
  manifests and all five templates in live Chromium. Preserve all route patterns,
  assignments and unrelated route records; no access policy operation. Exact
  validation and the still-queued renderer CI caveat are in `docs/RELEASE-2026-10-22.md`.

- 2026-10-22: Pin pushed renderer `326fee2` for user-requested release: strict
  generation, deterministic integrity reports, active-document diagnostics and
  inert source inspection, fatal UTF-8 file decoding. Includes predecessor print
  and portable-assembly changes. Shared suite passes 122/122, zero skips; this is
  agent self-review, not independent security or manuscript-publication approval.
  Existing three prefix routes and access configuration are intentionally unchanged.

- 2026-10-15: Redeploy from clean pushed Worker `009fc3a` and locked renderer
  `6b28617` after green push and PR browser CI and green Worker/integration CI.
  Version `9fe0369b-2de3-491c-9223-a2cc72d5405a`. All 75 normal-URL public hashes,
  redirects, HEAD and refusals verified after initial edge propagation. Wrangler
  recreated IDs of the three managed routes; every route pattern and Worker
  assignment, and all unrelated route records, remained unchanged. Evidence:
  `/srv/ragbaz/reports/meta-git-release-20261015.json`. Renderer PR #2 remains open;
  this records self-reviewed reproducibility, not independent security approval.

- 2026-10-15: User requested commit/push, CI repair, review/polish and redeploy,
  then explicitly requested a public GitHub remote. Create `tabenius/meta.ragbaz`
  publicly without private research/build artifacts. Pin the renderer commit in
  `renderer.lock.json`; refuse mismatched or dirty dependencies before importing
  their code. Add offline pin refusal tests and SHA-pinned CI actions. Private
  renderer access uses a dedicated read-only deploy key, not a broad account token;
  fork PR jobs receive no key. Worker CI builds, bundles and runs local workerd but
  cannot deploy. Review also removed host-specific reader test paths, required
  browser CI, and linked typography status to its selector. This is an agent
  self-review, not independent security/publication approval.

- 2026-10-15: At the user's explicit request, deploy all three new Aether variants
  and finish/deploy Heartfulness in parallel. Final Worker version
  `fb81fbb0-e940-4e08-a996-a8920db13b73`; add only the `/aether*` and
  `/heartfulness*` prefixes alongside sci, preserving unrelated routes/access.
  Include host-curated, opt-in Google font alternatives for all five templates;
  no arbitrary font URL, manuscript SVG or remote-image permission was added.
  Shared tuple hashes bind catalogue/configuration, not mutable Google font bytes.
  108 shared tests, 9 Worker tests and real-workerd smoke pass. Live verification
  matched all 75 public file hashes and tested actual downloaded font faces,
  starter loading and 320px layouts in Chromium for all five templates.
  The immediate post-deploy pass briefly observed an old dependency asset;
  subsequent complete verification on normal URLs matched the final inventory.
  Evidence in `/srv/ragbaz/reports/meta-aether-deployment-20261015.json` and
  `meta-aether-live-browser-20261015.json`. Still a working-tree prototype, not a
  commit-bound independently reviewed release; no private recovered letter used.

- 2026-10-15: Prepare Heartfulness as a second independent template mount and
  manifest-aware build alongside sci. Shared code/ornaments stay in ragbaz-common;
  this repo owns only static serving, build integration and route configuration.
  Add mount-isolation tests and smoke checks for both packages. Contemporary
  interpretation; no historical-authenticity or affiliation claim. Not deployed.

- 2026-10-15: Post-deployment self-review: normalize upstream asset server errors
  to a minimal, non-cacheable 503, rather than forwarding diagnostics. Add GET/HEAD
  refusal tests and a checked-in `npm run smoke` real-workerd check covering every
  manifest asset hash, MIME, redirects, HEAD and refusals. These enhancements are
  local only, not a new deployed version or independent review approval.

- 2026-10-15: At Tobias's explicit request, deployed the polished dark-mode
  prototype as Worker version `5c98b355-b7d4-4fd4-968e-4518fdb73f00` to only
  `meta.ragbaz.cc/markdoc-ragbaz-sci-tufte*` in the confirmed ragbaz account/zone.
  Existing routes and access policies were not changed. Verified live HTML
  SHA-256 `5368c78bc2960104b9a71a6e7d20f9fa7eb4af99ddc1f0a5d07fb8947a50a8bb`,
  sampled asset hashes/MIME, query-preserving redirect, 404/405 refusals, and real
  Chromium neutral/starter loading plus persistent dark appearance. Exact build
  inventory recorded in `/srv/ragbaz/reports/meta-sci-deployment-20261015.json`.
  Deployment is not independent release review or manuscript publication.

- 2026-10-15: Initial prefix-scoped Worker, bounded public asset inventory,
  response security policy, shared-checkout build and deployment configuration.
  No production deployment or manuscript-publication approval recorded.
