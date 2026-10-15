import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.mjs';
const MOUNT = '/markdoc-ragbaz-sci-tufte';
const request = (path, init) => new Request('https://meta.ragbaz.cc' + path, init);

test('mount redirects locally with query intact and never proxies a document URL', async () => {
  const r = await worker.fetch(request(MOUNT + '?document=https%3A%2F%2Fexample.org%2Fpaper.md'), {});
  assert.equal(r.status, 308);
  assert.equal(r.headers.get('Location'), MOUNT + '/?document=https%3A%2F%2Fexample.org%2Fpaper.md');
});
test('Heartfulness has a distinct bounded mount and original botanical companions', async () => {
  const redirected = await worker.fetch(request('/heartfulness?document=starter.md'), {});
  assert.equal(redirected.status, 308);
  assert.equal(redirected.headers.get('Location'), '/heartfulness/?document=starter.md');
  const seen = [];
  const env = { ASSETS: { fetch: async req => { seen.push(req.url); return new Response('asset'); } } };
  for (const path of ['/heartfulness/', '/heartfulness/starter.md', '/heartfulness/assets/climbing-rose.svg', '/heartfulness/assets/rose-divider.svg']) {
    assert.equal((await worker.fetch(request(path), env)).status, 200);
  }
  assert(seen.every(url => url.startsWith('https://meta.ragbaz.cc/heartfulness/')));
  for (const path of ['/heartfulness-other', '/heartfulness/private.md', MOUNT + '/assets/climbing-rose.svg']) {
    assert.equal((await worker.fetch(request(path), env)).status, 404);
  }
});
test('Aether family entry and variant redirects preserve document parameters without a fetch proxy', async () => {
  const query = '?document=starter.md&sha256=' + 'a'.repeat(64);
  for (const path of ['/aether', '/aether/']) {
    const r = await worker.fetch(request(path + query), {});
    assert.equal(r.status, 308); assert.equal(r.headers.get('Location'), '/aether/prima-materia/' + query);
  }
  for (const slug of ['prima-materia', 'sun-and-moon', 'blackening']) {
    const r = await worker.fetch(request('/aether/' + slug + query), {});
    assert.equal(r.status, 308); assert.equal(r.headers.get('Location'), '/aether/' + slug + '/' + query);
    let delegated;
    const asset = await worker.fetch(request('/aether/' + slug + '/assets/symbolic-plate.svg'), {
      ASSETS: { fetch: async req => { delegated = req.url; return new Response('svg'); } },
    });
    assert.equal(asset.status, 200); assert.equal(delegated, 'https://meta.ragbaz.cc/aether/' + slug + '/assets/symbolic-plate.svg');
  }
  for (const path of ['/aether/other/', '/aether/secrets.md', '/aether/blackening/private.md', '/heartfulness/assets/symbolic-plate.svg']) {
    assert.equal((await worker.fetch(request(path), {})).status, 404);
  }
  assert.equal((await worker.fetch(request('/aether/', { method: 'POST' }), {})).status, 405);
});
test('unknown paths and wrong namespace stay absent', async () => {
  for (const path of ['/', '/other', MOUNT + '-other', MOUNT + '/.env', MOUNT + '/anything.md', MOUNT + '/assets/../private']) {
    assert.equal((await worker.fetch(request(path), {})).status, 404);
  }
});
test('writes and missing bindings have distinct minimal refusals', async () => {
  const write = await worker.fetch(request(MOUNT + '/', { method: 'POST' }), {});
  assert.equal(write.status, 405); assert.equal(write.headers.get('Allow'), 'GET, HEAD');
  assert.equal((await worker.fetch(request(MOUNT + '/'), {})).status, 503);
});
test('asset delegation strips credentials, query and cookies; security policy permits self fullscreen', async () => {
  let seen;
  const r = await worker.fetch(request(MOUNT + '/?document=starter.md', { headers: { Cookie: 'private=secret', Authorization: 'Bearer secret' } }), {
    ASSETS: { fetch: async req => { seen = req; return new Response('html', { headers: { 'Content-Type': 'text/html', 'Set-Cookie': 'bad=1' } }); } },
  });
  assert.equal(seen.url, 'https://meta.ragbaz.cc' + MOUNT + '/index.html');
  assert(!seen.headers.has('Cookie')); assert(!seen.headers.has('Authorization'));
  assert(!r.headers.has('Set-Cookie')); assert.equal(r.headers.get('Cache-Control'), 'no-store');
  assert(r.headers.get('Permissions-Policy').includes('fullscreen=(self)'));
  assert.equal(r.headers.get('X-Content-Type-Options'), 'nosniff');
});
test('HEAD and asset misses preserve HTTP semantics', async () => {
  for (const path of ['/', MOUNT + '/private', MOUNT + '/']) {
    const refusal = await worker.fetch(request(path, { method: 'HEAD' }), {});
    assert.equal(await refusal.text(), '');
  }
  const r = await worker.fetch(request(MOUNT + '/starter.md', { method: 'HEAD' }), { ASSETS: { fetch: async () => new Response('starter') } });
  assert.equal(await r.text(), ''); assert.equal(r.status, 200);
  const missing = await worker.fetch(request(MOUNT + '/starter.md'), { ASSETS: { fetch: async () => new Response('internal path', { status: 404 }) } });
  assert.equal(missing.status, 404); assert.equal(await missing.text(), 'Not found');
});
test('asset binding failure is an unavailable refusal, not an implementation leak', async () => {
  const r = await worker.fetch(request(MOUNT + '/'), { ASSETS: { fetch: async () => { throw new Error('private implementation detail'); } } });
  assert.equal(r.status, 503); assert.equal(await r.text(), 'Publication assets unavailable');
});
test('upstream server errors are minimal unavailable refusals, including HEAD', async () => {
  for (const status of [500, 502, 503, 504]) {
    for (const method of ['GET', 'HEAD']) {
      const r = await worker.fetch(request(MOUNT + '/starter.md', { method }), {
        ASSETS: { fetch: async () => new Response('private upstream diagnostics', {
          status, headers: { 'Set-Cookie': 'private=1', 'X-Internal-Trace': 'secret' },
        }) },
      });
      assert.equal(r.status, 503);
      assert.equal(await r.text(), method === 'HEAD' ? '' : 'Publication assets unavailable');
      assert.equal(r.headers.get('Cache-Control'), 'no-store');
      assert(!r.headers.has('Set-Cookie')); assert(!r.headers.has('X-Internal-Trace'));
    }
  }
});
