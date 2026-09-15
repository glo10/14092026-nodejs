import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootPath = resolve(dirname(fileURLToPath(import.meta.url)))
const helloFilename = join(rootPath, 'hello.md')
try {
    await writeFile(helloFilename, 'hello')
    const data = await readFile(helloFilename)
    console.log('data', data.toString())
} catch(error) {
    console.error('error', error)
}
