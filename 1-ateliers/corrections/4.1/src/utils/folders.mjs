import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export const publicDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'public'
)
export const homepage = join(publicDir, 'html', 'index.html')