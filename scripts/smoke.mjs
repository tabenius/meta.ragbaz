#!/usr/bin/env node
// Owns one local Wrangler process. No production writes or remote documents.
import { spawn, execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const child = spawn(process.execPath, ['node_modules/wrangler/bin/wrangler.js', 'dev',
  '--local', '--ip', '127.0.0.1', '--port', '0', '--inspector-port', '0',
  '--show-interactive-dev-session=false'], {
  cwd: root, stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, WRANGLER_SEND_METRICS: 'false' },
});
const exited = new Promise(resolve => child.once('exit', resolve));
let output = '';
try {
  const base = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Local Worker startup timed out: ' + output.slice(-2000))), 30000);
    const data = chunk => {
      output = (output + chunk).slice(-8000);
      const match = /Ready on (http:\/\/127\.0\.0\.1:\d+)/.exec(output);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    };
    child.stdout.on('data', data); child.stderr.on('data', data);
    child.once('error', error => { clearTimeout(timer); reject(error); });
    child.once('exit', code => { clearTimeout(timer); reject(new Error('Wrangler exited ' + code + ': ' + output)); });
  });
  const get = (path, options = {}) => fetch(base + path, { signal: AbortSignal.timeout(10000), ...options });
  for (const mount of ['/markdoc-ragbaz-sci-tufte', '/heartfulness', '/aether/prima-materia', '/aether/sun-and-moon', '/aether/blackening']) {
  const assets = new URL('../build/public' + mount + '/', import.meta.url);
  const manifestBytes = await readFile(new URL('manifest.json', assets));
  const manifest = JSON.parse(manifestBytes);
  const redirect = await get(mount + '?document=starter.md', { redirect: 'manual' });
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get('location'), mount + '/?document=starter.md');
  const html = await get(mount + '/');
  assert.equal(html.status, 200);
  assert(html.headers.get('content-type').includes('text/html'));
  assert(html.headers.get('permissions-policy').includes('fullscreen=(self)'));
  assert.equal(hash(Buffer.from(await html.arrayBuffer())), manifest.files['index.html'].sha256);
  for (const [path, expected] of Object.entries(manifest.files)) {
    const r = await get(mount + '/' + path);
    assert.equal(r.status, 200, path);
    const bytes = Buffer.from(await r.arrayBuffer());
    assert.equal(hash(bytes), expected.sha256, path); assert.equal(bytes.length, expected.bytes, path);
    const mime = path.endsWith('.md') ? 'text/markdown' : path.endsWith('.js') ? 'javascript'
      : path.endsWith('.css') ? 'text/css' : path.endsWith('.svg') ? 'image/svg+xml'
      : path.endsWith('.json') ? 'application/json' : null;
    if (mime) assert(r.headers.get('content-type')?.includes(mime), path + ' MIME');
  }
  assert.equal(hash(Buffer.from(await (await get(mount + '/manifest.json')).arrayBuffer())), hash(manifestBytes));
  assert.equal((await get(mount + '/', { method: 'POST' })).status, 405);
  assert.equal((await get(mount + '/.env')).status, 404);
  assert.equal((await get('/')).status, 404);
  const head = await get(mount + '/starter.md', { method: 'HEAD' });
  assert.equal(head.status, 200); assert.equal(await head.text(), '');
  console.log(`Real local Worker smoke passed for ${mount}: ${Object.keys(manifest.files).length} asset hashes, MIME, query redirect, HEAD, refusals and fullscreen policy.`);
  }
} finally {
  // Signal only the process this script started; never kill peer servers.
  if (child.exitCode === null && child.signalCode === null) {
    const owned = execFileSync('ps', ['-p', String(child.pid), '-o', 'pid=,args='], { encoding: 'utf8' }).trim();
    assert.equal(Number(owned.split(/\s+/)[0]), child.pid);
    assert(owned.includes('node_modules/wrangler/bin/wrangler.js'));
    child.kill('SIGTERM');
  }
  await exited;
}
