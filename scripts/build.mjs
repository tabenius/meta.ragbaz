#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { pinnedRenderer } from './renderer.mjs';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== '--common') throw new Error('Supply the shared renderer explicitly: npm run build -- --common /path/to/ragbaz-common');
const common = resolve(args[1]);
const pkg = JSON.parse(await readFile(resolve(common, 'package.json'), 'utf8'));
if (pkg.name !== '@ragbaz/common') throw new Error('Expected owning ragbaz-common repository');
// Refuse before importing executable dependency code or writing public assets.
const head = await pinnedRenderer(common);
const builder = await import(pathToFileURL(resolve(common, 'scripts/build-markdoc-ragbaz-sci-tufte.mjs')).href);
const output = resolve(root, 'build/public');
const inventories = {};
for (const template of ['markdoc-ragbaz-sci-tufte', 'heartfulness', 'aether-prima-materia', 'aether-sun-and-moon', 'aether-blackening']) {
  const result = await builder.buildMetaDocument({ output, template });
  const provenance = { schema: 'ragbaz.meta-dependency/1', repository: 'ragbaz-common', baseCommit: head, state: 'pinned clean checkout; independent review not asserted', runtimeSHA256: result.manifest.runtimeSHA256, renderSHA256: result.manifest.renderSHA256 };
  const dependency = JSON.stringify(provenance, null, 2) + '\n';
  await writeFile(resolve(result.directory, 'dependency.json'), dependency);
  result.manifest.files['dependency.json'] = { sha256: createHash('sha256').update(dependency).digest('hex'), bytes: Buffer.byteLength(dependency) };
  await writeFile(resolve(result.directory, 'manifest.json'), JSON.stringify(result.manifest, null, 2) + '\n');
  inventories[template] = { ...provenance, assets: result.manifest };
  console.log(`Built ${result.directory}; dependency: ${provenance.state}`);
}
await mkdir(resolve(root, 'build'), { recursive: true });
await writeFile(resolve(root, 'build/provenance.json'), JSON.stringify({ checkout: common, templates: inventories }, null, 2) + '\n');
