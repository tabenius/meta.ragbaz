import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

export function verifyRenderer(lock, head, status) {
  if (lock.repository !== 'tabenius/ragbaz-common' || !/^[a-f0-9]{40}$/.test(lock.commit || '')) throw new Error('Invalid renderer lock');
  if (head !== lock.commit) throw new Error('Renderer commit does not match renderer.lock.json');
  if (status.trim()) throw new Error('Renderer checkout must be clean, including untracked files');
  return head;
}

export async function pinnedRenderer(common) {
  const lock = JSON.parse(await readFile(new URL('../renderer.lock.json', import.meta.url), 'utf8'));
  const git = (...args) => execFileSync('git', ['-C', common, ...args], { encoding: 'utf8' }).trim();
  return verifyRenderer(lock, git('rev-parse', 'HEAD'), git('status', '--porcelain', '--untracked-files=all'));
}
