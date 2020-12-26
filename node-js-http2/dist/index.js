'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const querystring_1 = __importDefault(require("querystring"));
const server = http_1.default.createServer((req, res) => {
    const now = new Date();
    console.info(`[${now}] Requested by ${req.connection.remoteAddress}`);
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    switch (req.method) {
        case 'GET':
            // GET のときに `./form.html` の内容を送る
            // fs モジュールの createReadStream でファイルの読み込みストリームを作成したあと、レスポンスのオブジェクト res に対して pipe 関数でパイプしている。
            // Node.js では Stream 形式のデータは、読み込み用の Stream と書き込み用の Stream を繋いでそのままデータを受け渡すことができます。 それが pipe という関数の機能である。
            const rs = fs_1.default.createReadStream('./dist/form.html');
            rs.pipe(res); // pipe 関数を使った場合は res.end() を呼ぶ必要がない
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
                res.write(`<!DOCTYPE html><html lang="ja"><body><h1>${parsed.name} さんは ${parsed.pasta} に投票しました</h1></body></html>`);
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