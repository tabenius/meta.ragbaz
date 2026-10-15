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
