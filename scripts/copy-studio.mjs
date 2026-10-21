import { cp, mkdir } from 'node:fs/promises';
const target = new URL('../dist/studio/', import.meta.url);
await mkdir(target, { recursive: true });
await cp(new URL('../studio/dist/', import.meta.url), target, { recursive: true });
console.log('Sanity editor copied to /studio.');
