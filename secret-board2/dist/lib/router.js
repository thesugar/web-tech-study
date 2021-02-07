'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const posts_handler_1 = __importDefault(require("./posts-handler"));
const handler_util_1 = require("./handler-util");
const route = (req, res) => {
    switch (req.url) {
        case '/posts':
            posts_handler_1.default.handle(req, res);
            break;
        case '/posts?delete=1':
            posts_handler_1.default.handleDelete(req, res);
            break;
        case '/logout':
            handler_util_1.handleLogout(req, res);
            break;
        case '/favicon.ico':
            handler_util_1.handleFavicon(req, res);
            break;
        default:
            handler_util_1.handleNotFound(req, res);
            break;
    }
};
exports.default = { route };
//# sourceMappingURL=router.js.map