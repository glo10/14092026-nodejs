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
    exclude: ['0-exercices', 'cypress', 'node_modules', 'demo', 'admin', 'tests/0-exercices/corrections/ex9']
  }
})
