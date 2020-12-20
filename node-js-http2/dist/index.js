'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    console.info(`[${new Date()}] Requested by ${req.connection.remoteAddress}`);
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    res.write(req.headers['user-agent']);
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