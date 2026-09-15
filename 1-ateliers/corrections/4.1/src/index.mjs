import app from './app.mjs'
const PORT = process.env.PORT || 4100

app.listen(PORT, () => {
  console.log(`Listen on http://localhost:${PORT}`)
})