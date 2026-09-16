import app from './app.mjs'

const PORT = process.env.PORT || 5200
app.listen(PORT, () => {
  console.info(`API on http://localhost:${PORT}`)
})