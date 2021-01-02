'use strict'

import http from 'http'
import router from './lib/router'

const server = http.createServer((req, res) => {
    router.route(req, res)
})
.on('error', (e) => {
    console.error(`Server Error: ${e}`)
})
.on('clientError', (e) => {
    console.error(`Client Error ${e}`)
})

const port = 8000
server.listen(port, () => {
    console.info(`Listening on ${port}`)
})