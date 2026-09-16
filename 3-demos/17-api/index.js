import { createServer } from 'node:http'
import { app } from './app.js'
const PORT = 7000
const httpServer = createServer(app)
httpServer.listen(PORT, () => {
    console.info(`http://localhost:${PORT}`)
})