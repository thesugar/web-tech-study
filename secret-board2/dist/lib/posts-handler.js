'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pug_1 = __importDefault(require("pug"));
const cookies_1 = __importDefault(require("cookies"));
const handler_util_1 = require("./handler-util");
const post_1 = __importDefault(require("./post"));
const trackingIdKey = 'tracking_id';
const handle = (req, res) => {
    const cookies = new cookies_1.default(req, res);
    addTrackingCookie(cookies);
    switch (req.method) {
        case 'GET':
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            // order: ['id', 'DESC'] 後で投稿されたものが先に表示される（ID の降順）
            post_1.default.findAll({ order: [['id', 'DESC']] }).then((posts) => {
                res.end(pug_1.default.renderFile('./views/posts.pug', { posts, user: req.user }));
            });
            console.info(`閲覧されました: user: ${req.user}\n` +
                `trackigId: ${cookies.get(trackingIdKey)}\n` +
                `remoteAddress: ${req.connection.remoteAddress}\n` +
                `userAgent: ${req.headers['user-agent']}`);
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
                post_1.default.create({
                    content,
                    trackingCookie: cookies.get(trackingIdKey),
                    postedBy: req.user,
                }).then(() => {
                    handleRedirectPosts(req, res);
                });
            });
            break;
        default:
            handler_util_1.handleBadRequest(req, res);
            break;
    }
};
const handleDelete = (req, res) => {
    switch (req.method) {
        case 'POST':
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body);
                const bodyString = body.toString();
                const decoded = decodeURIComponent(bodyString);
                const id = decoded.split('id=')[1]; // 投稿の ID を取得
                post_1.default.findByPk(id).then((post) => {
                    // 必ず、サーバーサイドにおいても、利用者が（削除）機能を利用する権限があるかを資格に応じて許可（認可）
                    if (req.user === post.postedBy) {
                        post.destroy().then(() => {
                            console.info(`削除されました: user: ${req.user}, \nremoteAddress: ${req.connection.remoteAddress}, \nuserAgent: ${req.headers['user-agent']}`);
                            handleRedirectPosts(req, res);
                        });
                    }
                });
            });
            break;
        default:
            break;
    }
};
const addTrackingCookie = (cookies) => {
    if (!cookies.get(trackingIdKey)) {
        const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
        const tomorrow = new Date(Date.now() + (1000 * 60 * 60 * 24));
        cookies.set(trackingIdKey, trackingId, { expires: tomorrow });
    }
};
const handleRedirectPosts = (req, res) => {
    // ステータスコード 303 = See other (POST でアクセスした際に、その処理の終了後、GET でも同じパスにアクセスしなおしてほしいときに利用するステータスコード)
    res.writeHead(303, {
        'Location': '/posts'
    });
    res.end();
};
exports.default = { handle, handleDelete };
//# sourceMappingURL=posts-handler.js.map