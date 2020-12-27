'use strict'

import http from 'http'
import qs from 'querystring'
import pug from 'pug'

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    const now = new Date()
    console.info(`[${now}] Requested by ${req.connection.remoteAddress}`)
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    
    switch (req.method) {
        case 'GET':
            const [firstItem, secondItem] = req.url === '/enquetes/pasta' ? ['カチョエペペ', 'カルボナーラ'] : req.url === '/enquetes/cheese' ? ['パルミジャーノ・レッジャーノ', 'ペコリーノ・ロマーノ'] : []
            res.write(pug.renderFile('./dist/form.pug', {
                path: req.url,
                firstItem,
                secondItem,
            }))
            
            res.end()
            break
    
        case 'POST':
            let rawData = ''

            // req（リクエストオブジェクト）はイベントを発行するオブジェクト
            // データを受け取った際には 'data' というイベントが発生する。
            req.on('data', (chunk) => {
                rawData += chunk
            }).on('end', () => {
                const decoded = decodeURIComponent(rawData)
                const parsed = qs.parse(decoded)
                console.info(`[${now}] 投稿: ${decoded}`)
                res.write(`<!DOCTYPE html><html lang="ja"><body><h1>${parsed.name} さんは ${parsed.favorite} に投票しました</h1></body></html>`)
                res.end()
            })
            break

        case 'DELETE':
            res.write(`DELETE ${req.url}`)
            break

        default:
            break
    }

}).on('error', e => {
    console.error(`[${new Date()}] Server Error`, e)
}).on('clientError', e => {
    console.error(`[${new Date()}] Client Error`, e)
})

const port = 8000
server.listen(port, () => {
    console.info(`[${new Date()}] Listening on ${port}`)
})
