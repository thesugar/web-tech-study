'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pug_1 = __importDefault(require("pug"));
const handler_util_1 = require("./handler-util");
const contents = [];
const handle = (req, res) => {
    switch (req.method) {
        case 'GET':
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end(pug_1.default.renderFile('./views/posts.pug', { contents }));
            break;
        case 'POST':
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                // Stream に流れてくるデータが文字列とは限らないので、toString() を使って文字列にする
                const bodyString = Buffer.concat(body).toString();
                const decoded = decodeURIComponent(bodyString);
                // 以下の content は、フォーム（posts.pug）で自分で定義した name (key-value の key)
                const content = decoded.split('content=')[1];
                console.info(`投稿されました: ${content}`);
                contents.push(content);
                console.info(`投稿された全内容: ${contents}`);
                handleRedirectPosts(req, res);
            });
            break;
        default:
            handler_util_1.handleBadRequest(req, res);
            break;
    }
};
const handleRedirectPosts = (req, res) => {
    // ステータスコード 303 = See other (POST でアクセスした際に、その処理の終了後、GET でも同じパスにアクセスしなおしてほしいときに利用するステータスコード)
    res.writeHead(303, {
        'Location': '/posts'
    });
    res.end();
};
exports.default = { handle };
//# sourceMappingURL=posts-handler.js.map