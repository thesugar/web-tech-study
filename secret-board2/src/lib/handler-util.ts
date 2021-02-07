'use strict'

import http from 'http'
import fs from 'fs'

const handleLogout = (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(401, {
        'Content-Type': 'text/html; charset=utf-8',
    })
    res.end('<!DOCTYPE html><html lang="ja"><body>' +
    '<h1>ログアウトしました</h1>' +
    '<a href="/posts">ログイン</a>' +
    '</body></html>')
}

const handleNotFound = (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8',
    })
    res.end('ページが見つかりません')
}

const handleBadRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(400, {
        'Content-Type': 'text/plain; charset=utf-8',
    })
    res.end('未対応のメソッドです')
}

const handleFavicon = (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(200, {
        'Content-Type': 'image/vnd.microsoft.icon'  // favicon のコンテンツタイプ
    })
    const favicon = fs.readFileSync('./favicon.ico') // favicon のファイルを Stream として同期的に読み出し、それをレスポンスの内容として書き出している
    res.end(favicon)
}

export { handleLogout, handleNotFound, handleBadRequest, handleFavicon }