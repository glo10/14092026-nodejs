import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 100,
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    },
    exclude: [ 'node_modules']
  }
})
