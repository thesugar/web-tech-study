'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const http_auth_1 = __importDefault(require("http-auth"));
const router_1 = __importDefault(require("./lib/router"));
const basic = http_auth_1.default.basic({
    realm: 'Enter username and password.',
    file: './users.htpasswd',
});
// node-js-http2 プロジェクトだと TypeScript 使ったときに Basic 認証できなさそうだったが
// 今回は普通にできたな。。pug ファイルの置き場が違うのとか関係あったりする？（node-js-http2 では dist フォルダ内に置いてた）
const server = http_1.default.createServer(basic, (req, res) => {
    router_1.default.route(req, res);
})
    .on('error', (e) => {
    console.error(`Server Error: ${e}`);
})
    .on('clientError', (e) => {
    console.error(`Client Error ${e}`);
});
const port = 8000;
server.listen(port, () => {
    console.info(`Listening on ${port}`);
});
//# sourceMappingURL=index.js.map