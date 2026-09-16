import app from './app.mjs'

const PORT = process.env.PORT || 6100
app.listen(PORT, () => {
  console.info(`API on http://localhost:${PORT}`)
})