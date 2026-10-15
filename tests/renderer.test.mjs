import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyRenderer } from '../scripts/renderer.mjs';

test('release builds require an exact valid commit and clean renderer checkout', () => {
  const commit = 'a'.repeat(40), lock = { repository: 'tabenius/ragbaz-common', commit };
  assert.equal(verifyRenderer(lock, commit, ''), commit);
  assert.throws(() => verifyRenderer(lock, 'b'.repeat(40), ''), /does not match/);
  for (const status of [' M src/example.js', '?? private.md']) assert.throws(() => verifyRenderer(lock, commit, status), /must be clean/);
  assert.throws(() => verifyRenderer({ ...lock, commit: 'main' }, commit, ''), /Invalid/);
  assert.throws(() => verifyRenderer({ ...lock, repository: 'other/repo' }, commit, ''), /Invalid/);
});
