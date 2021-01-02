'use strict'

import http from 'http'
import pug from 'pug'

const contents: string[] = []

const handle = (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.method) {
        case 'GET':
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.end(pug.renderFile('./views/posts.pug'))
            break
    
        case 'POST':
            let body: Uint8Array[] = []
            req.on('data', (chunk) => {
                body.push(chunk)
            }).on('end', () => {
                // Stream に流れてくるデータが文字列とは限らないので、toString() を使って文字列にする
                const bodyString: string = Buffer.concat(body).toString()
                const decoded = decodeURIComponent(bodyString)
                // 以下の content は、フォーム（posts.pug）で自分で定義した name (key-value の key)
                const content = decoded.split('content=')[1]
                console.info(`投稿されました: ${content}`)
                contents.push(content)
                console.info(`投稿された全内容: ${contents}`)
                handleRedirectPosts(req, res)
            })
            break

        default:
            break
    }
}

const handleRedirectPosts = (req: http.IncomingMessage, res: http.ServerResponse) => {
    // ステータスコード 303 = See other (POST でアクセスした際に、その処理の終了後、GET でも同じパスにアクセスしなおしてほしいときに利用するステータスコード)
    res.writeHead(303, {
        'Location': '/posts'
    })
    res.end()
}

export default { handle }