'use strict'

import http from 'http'
import auth from 'http-auth'
import router from './lib/router'

const basic = auth.basic({
    realm: 'Enter username and password.',
    file: './users.htpasswd',
})

// node-js-http2 プロジェクトだと TypeScript 使ったときに Basic 認証できなさそうだったが
// 今回は普通にできたな。。pug ファイルの置き場が違うのとか関係あったりする？（node-js-http2 では dist フォルダ内に置いてた）
const server = http.createServer((basic as http.ServerOptions), (req, res) => {
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