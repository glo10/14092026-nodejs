import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    },
    environmentMatchGlobs: [
      [
        'tests/*/*.test.[c|m]js',
        'node'
      ]
    ],
    exclude: ['node_modules']
  }
})
