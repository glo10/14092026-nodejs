import app from './app.mjs'

const PORT = 5100
app.listen(PORT, () => {
  console.info(`API on http://localhost:${PORT}`)
})