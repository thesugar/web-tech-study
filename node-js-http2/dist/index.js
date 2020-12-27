'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const querystring_1 = __importDefault(require("querystring"));
const pug_1 = __importDefault(require("pug"));
const server = http_1.default.createServer((req, res) => {
    const now = new Date();
    console.info(`[${now}] Requested by ${req.connection.remoteAddress}`);
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    switch (req.method) {
        case 'GET':
            const [firstItem, secondItem] = req.url === '/enquetes/pasta' ? ['カチョエペペ', 'カルボナーラ'] : req.url === '/enquetes/cheese' ? ['パルミジャーノ・レッジャーノ', 'ペコリーノ・ロマーノ'] : [];
            res.write(pug_1.default.renderFile('./dist/form.pug', {
                path: req.url,
                firstItem,
                secondItem,
            }));
            res.end();
            break;
        case 'POST':
            let rawData = '';
            // req（リクエストオブジェクト）はイベントを発行するオブジェクト
            // データを受け取った際には 'data' というイベントが発生する。
            req.on('data', (chunk) => {
                rawData += chunk;
            }).on('end', () => {
                const decoded = decodeURIComponent(rawData);
                const parsed = querystring_1.default.parse(decoded);
                console.info(`[${now}] 投稿: ${decoded}`);
                res.write(`<!DOCTYPE html><html lang="ja"><body><h1>${parsed.name} さんは ${parsed.favorite} に投票しました</h1></body></html>`);
                res.end();
            });
            break;
        case 'DELETE':
            res.write(`DELETE ${req.url}`);
            break;
        default:
            break;
    }
}).on('error', e => {
    console.error(`[${new Date()}] Server Error`, e);
}).on('clientError', e => {
    console.error(`[${new Date()}] Client Error`, e);
});
const port = 8000;
server.listen(port, () => {
    console.info(`[${new Date()}] Listening on ${port}`);
});
//# sourceMappingURL=index.js.map