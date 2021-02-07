'use strict'
import postsHandler from './posts-handler'
import http from 'http'
import {handleLogout, handleNotFound, handleFavicon} from './handler-util'

const route = (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.url) {
        case '/posts':
            postsHandler.handle(req, res)            
            break

        case '/posts?delete=1':
            postsHandler.handleDelete(req, res)
            break

        case '/logout':
            handleLogout(req, res)
            break

        case '/favicon.ico':
            handleFavicon(req, res)
            break
    
        default:
            handleNotFound(req, res)
            break
    }
}

export default { route }