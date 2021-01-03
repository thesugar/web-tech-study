'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBadRequest = exports.handleNotFound = exports.handleLogout = void 0;
const handleLogout = (req, res) => {
    res.writeHead(401, {
        'Content-Type': 'text/plain; charset=utf-8',
    });
    res.end('ログアウトしました');
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
//# sourceMappingURL=handler-util.js.map