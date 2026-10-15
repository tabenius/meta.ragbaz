const MOUNTS = ['/markdoc-ragbaz-sci-tufte', '/heartfulness',
  '/aether/prima-materia', '/aether/sun-and-moon', '/aether/blackening'];
const FILES = new Set(['index.html', 'template.md', 'surface.json', 'snapshots.json',
  'markdoc-ragbaz.md', 'starter.md', 'README.md', 'manifest.json', 'LICENSES.txt',
  'dependency.json', 'assets/reader.js', 'assets/reader.css', 'assets/weftmark.svg', 'assets/nostoi.svg']);

const headers = () => new Headers({
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  'Permissions-Policy': 'fullscreen=(self), camera=(), microphone=(), geolocation=()',
});
function refusal(message, status, extra = {}) {
  const h = headers(); h.set('Cache-Control', 'no-store'); h.set('Content-Type', 'text/plain; charset=utf-8');
  for (const [key, value] of Object.entries(extra)) h.set(key, value);
  return new Response(message, { status, headers: h });
}

export default {
  async fetch(request, env) {
    const response = await serve(request, env);
    return request.method === 'HEAD' ? new Response(null, { status: response.status, headers: response.headers }) : response;
  },
};

async function serve(request, env) {
    const url = new URL(request.url);
    if (['/aether', '/aether/'].includes(url.pathname)) {
      if (!['GET', 'HEAD'].includes(request.method)) return refusal('Method not allowed', 405, { Allow: 'GET, HEAD' });
      const h = headers(); h.set('Location', '/aether/prima-materia/' + url.search); h.set('Cache-Control', 'no-store');
      return new Response(null, { status: 308, headers: h });
    }
    const MOUNT = MOUNTS.find(mount => url.pathname === mount || url.pathname.startsWith(mount + '/'));
    if (!MOUNT) return refusal('Not found', 404);
    if (!['GET', 'HEAD'].includes(request.method)) return refusal('Method not allowed', 405, { Allow: 'GET, HEAD' });
    if (url.pathname === MOUNT) {
      const h = headers(); h.set('Location', MOUNT + '/' + url.search); h.set('Cache-Control', 'no-store');
      return new Response(null, { status: 308, headers: h });
    }
    const path = url.pathname.slice(MOUNT.length + 1) || 'index.html';
    const botanical = MOUNT === '/heartfulness' && ['assets/climbing-rose.svg', 'assets/rose-divider.svg'].includes(path);
    const symbolic = MOUNT.startsWith('/aether/') && path === 'assets/symbolic-plate.svg';
    if (!FILES.has(path) && !botanical && !symbolic) return refusal('Not found', 404);
    if (!env.ASSETS?.fetch) return refusal('Publication assets unavailable', 503);
    const assetURL = new URL(MOUNT + '/' + path, url.origin); // Query is client-side data, not an asset key.
    const h = new Headers();
    for (const name of ['Accept', 'If-None-Match', 'If-Modified-Since', 'Range']) {
      const value = request.headers.get(name); if (value) h.set(name, value);
    }
    let response;
    try { response = await env.ASSETS.fetch(new Request(assetURL, { method: request.method, headers: h })); }
    catch { return refusal('Publication assets unavailable', 503); }
    if (response.status >= 500) return refusal('Publication assets unavailable', 503);
    if (response.status === 404) return refusal('Not found', 404);
    const resultHeaders = new Headers(response.headers);
    for (const [key, value] of headers()) resultHeaders.set(key, value);
    resultHeaders.delete('Set-Cookie');
    resultHeaders.set('Cache-Control', path === 'index.html' ? 'no-store' : 'public, max-age=300');
    return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers: resultHeaders });
}
