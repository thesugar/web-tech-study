'use strict'
import postsHandler from './posts-handler'
import http from 'http'

const route = (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.url) {
        case '/posts':
            postsHandler.handle(req, res)            
            break

        case '/logout':
            // TODO: ログアウト処理
            break
    
        default:
            break
    }
}

export default { route }