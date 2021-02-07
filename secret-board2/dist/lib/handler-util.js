'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFavicon = exports.handleBadRequest = exports.handleNotFound = exports.handleLogout = void 0;
const fs_1 = __importDefault(require("fs"));
const handleLogout = (req, res) => {
    res.writeHead(401, {
        'Content-Type': 'text/html; charset=utf-8',
    });
    res.end('<!DOCTYPE html><html lang="ja"><body>' +
        '<h1>ログアウトしました</h1>' +
        '<a href="/posts">ログイン</a>' +
        '</body></html>');
};
exports.handleLogout = handleLogout;
const handleNotFound = (req, res) => {
    res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8',
    });
    res.end('ページが見つかりません');
};
exports.handleNotFound = handleNotFound;
const handleBadRequest = (req, res) => {
    res.writeHead(400, {
        'Content-Type': 'text/plain; charset=utf-8',
    });
    res.end('未対応のメソッドです');
};
exports.handleBadRequest = handleBadRequest;
const handleFavicon = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'image/vnd.microsoft.icon' // favicon のコンテンツタイプ
    });
    const favicon = fs_1.default.readFileSync('./favicon.ico'); // favicon のファイルを Stream として同期的に読み出し、それをレスポンスの内容として書き出している
    res.end(favicon);
};
exports.handleFavicon = handleFavicon;
//# sourceMappingURL=handler-util.js.map