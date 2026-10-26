# Scientific links and Pieces invitations — 2026-10-26

- Pushed Worker source: `05f9672`.
- Renderer pin: `5e237363b9a346635625e2f6f108a62331a8a2d1`.
- Production version: `e8188f4e-825e-4745-b4b7-5baef591c477`.
- Local tests: 10/10; clean pinned build, dry-run bundle and all five real-workerd
  asset/route smoke checks passed. Renderer tests: 135/135, zero skips.
- Renderer CI `40388116221` and Worker/integration CI `40388167937` passed.
- Live checks across meta and Pieces matched 184 asset hashes. Chromium checked
  five matching Pieces invitations, source replacement and writing entrances;
  four identifier links, code exclusion and static download passed without API
  writes or page errors. All route patterns/assignments and custom-domain
  ownership stayed unchanged. No Access-policy operations were issued.
- Three existing development-toolchain audit findings through Wrangler,
  Miniflare and undici remain; no dependency upgrade was bundled.

Operational evidence: `/tmp/opencode/scientific-release-live-assets.json` and
`/tmp/opencode/scientific-release-live-browser.json`. This is agent self-review,
not independent security review or approval to publish any private manuscript.
