'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    const now = new Date();
    console.info(`[${now}] Requested by ${req.connection.remoteAddress}`);
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    switch (req.method) {
        case 'GET':
            res.write(`GET ${req.url}`);
            break;
        case 'POST':
            res.write(`POST ${req.url}`);
            let rawData = '';
            // req（リクエストオブジェクト）はイベントを発行するオブジェクト
            // データを受け取った際には 'data' というイベントが発生する。
            req.on('data', (chunk) => {
                rawData += chunk;
            }).on('end', () => {
                console.info(`[${now}] Data Posted: ${rawData}`);
            });
            break;
        case 'DELETE':
            res.write(`DELETE ${req.url}`);
        default:
            break;
    }
    res.end();
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