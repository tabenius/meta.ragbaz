# meta.ragbaz

Read README.md and PROVENANCE.md before edits. This repository owns the public
meta-document Worker, route policy and deployment configuration. Shared rendering
belongs to ragbaz-common; never copy its implementation here or edit a dependency
snapshot. Read the persistent sci authoring guide when changing paper presentation.

Use Frog for tasks and exact file locks. Work and build artifacts stay under /srv.
No secrets, credentials, private manuscript snapshots or user-specific author lists
belong in this public package. GET/HEAD assets only; no arbitrary remote fetch proxy.
New route/refusal behavior needs offline tests. Run npm test, npm run build with an
explicit shared-renderer checkout, and npm run bundle before claiming readiness.
Builds do not deploy or approve publication. Never replace unrelated domain routes
or access controls. Release requires an explicitly pinned, reviewed renderer and
account/route confirmation; working-tree provenance is not a commit-bound release.
