import { fileURLToPath } from 'node:url';
import { resolve, join, dirname } from 'node:path';
export const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const publicDir = join(src, '..', 'public');
export const pagesDir = join(publicDir, 'html'); 
export const pagesBonusDir = join(publicDir, 'html-bonus'); 
export const configDir = join(src, '..', 'config');
export const cssDir = join(publicDir, 'css');
export const imgDir = join(publicDir, 'img');
