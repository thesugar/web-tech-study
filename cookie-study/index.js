'use strict'

const http = require('http')
const server = http.createServer((req, res) => {
    // new Date() だと 2020/12/31 01:34 のように時刻になるが、Date.now() だと 1609... のようにミリ秒の数値になる
    const now = Date.now()    
    res.setHeader('Set-Cookie', `last_access=${now};expires=Mon, 07 Jan 2036 00:00:00 GMT;`)

    const last_access_time = req.headers.cookie ? parseInt(req.headers.cookie.split('last_access=')[1]) : now
    // 最終アクセス時間のミリ秒表記を new Date に渡し、文字列に変換してから res.end() に渡すことで、ミリ秒を Thu Dec 31 2020 01:35:40 GMT+0900 (Japan Standard Time) のように見やすく表せる
    res.end(new Date(last_access_time).toString())
})

const port = 8000

server.listen(port, () => {
    console.info(`listening on: ${port}`)
})

/*
 💣 Tips.
 Cookie はサーバーとの通信を要するため、サーバーで必要になる情報の保存場所として適している。
 一方で Web Storage は読み書きに通信を必要としないため、クライアントのみで必要になる情報の保存場所として適している。

 ただし、セッション情報などの重要な情報は Web Storage には保存しないようにすること。
 Cookie は HttpOnly というフラグの付与により、サーバーからのみ読めるように制限できる。
 しかし Web Storage には同一生成元ポリシーは適用されるものの、HttpOnly フラグのような仕組みはないため、クロスサイトスクリプティングによって内容が意図せず読まれることを防ぎ切るのは難しい。
 Web Storage には見られてもよい情報のみを保存すること。
 */