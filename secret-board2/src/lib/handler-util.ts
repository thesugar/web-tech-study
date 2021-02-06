'use strict'

import http from 'http'

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

export { handleLogout, handleNotFound, handleBadRequest }