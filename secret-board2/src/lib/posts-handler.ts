'use strict'

import http from 'http'
import pug from 'pug'
import Cookies from 'cookies'
import { handleBadRequest } from './handler-util'
import Post from './post'

const trackingIdKey = 'tracking_id'

type PostType = {
    id: string,
    content: string,
    postedBy: string,
    trackingCookie: string,
    createdAt: string,
    updatedAt: string,
}

const handle = (req: http.IncomingMessage, res: http.ServerResponse) => {
    const cookies = new Cookies(req, res)
    addTrackingCookie(cookies)
    switch (req.method) {
        case 'GET':
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            // order: ['id', 'DESC'] 後で投稿されたものが先に表示される（ID の降順）
            Post.findAll({order: [['id', 'DESC']]}).then((posts: PostType) => {
                res.end(pug.renderFile('./views/posts.pug', { posts }))
            })
            console.info(`閲覧されました: user: ${req.user}\n` +
            `trackigId: ${cookies.get(trackingIdKey)}\n` +
            `remoteAddress: ${req.connection.remoteAddress}\n` +
            `userAgent: ${req.headers['user-agent']}`
            ) 
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
                Post.create({
                    content,
                    trackingCookie: cookies.get(trackingIdKey),
                    postedBy: req.user,
                }).then(() => {
                    handleRedirectPosts(req, res)
                })
            })
            break

        default:
            handleBadRequest(req, res)
            break
    }
}

const addTrackingCookie = (cookies: Cookies) => {
    if (!cookies.get(trackingIdKey)) {
        const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
        const tomorrow = new Date(Date.now() + (1000 * 60 * 60 * 24))
        cookies.set(trackingIdKey, trackingId, { expires: tomorrow })
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