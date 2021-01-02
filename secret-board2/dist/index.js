'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const router_1 = __importDefault(require("./lib/router"));
const server = http_1.default.createServer((req, res) => {
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