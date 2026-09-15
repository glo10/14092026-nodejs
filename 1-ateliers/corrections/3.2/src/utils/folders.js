import { fileURLToPath } from 'node:url';
import { resolve, join, dirname } from 'node:path';
export const src = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const publicDir = join(src, '..', 'public');
export const pages = join(publicDir, 'html'); 
export const pagesBonus = join(publicDir, 'html-bonus'); 
export const config = join(src, '..', 'config');
export const css = join(publicDir, 'css');
export const img = join(publicDir, 'img');
