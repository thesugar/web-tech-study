'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const posts_handler_1 = __importDefault(require("./posts-handler"));
const route = (req, res) => {
    switch (req.url) {
        case '/posts':
            posts_handler_1.default.handle(req, res);
            break;
        case '/logout':
            // TODO: ログアウト処理
            break;
        default:
            break;
    }
};
exports.default = { route };
//# sourceMappingURL=router.js.map