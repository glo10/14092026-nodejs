/**
 * Certaines fonctions ont le suffixe Sync => traitement synchrone et bloquant
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname, join} from 'node:path'
import { fileURLToPath } from 'node:url'
const rootPath = resolve(dirname(fileURLToPath(import.meta.url)))
writeFileSync(join(rootPath, 'files', 'readme.txt'), 'dddd world')
const data = readFileSync(join(rootPath, 'files', 'readme.txt'))
console.log('data', data.toString('utf-8'))