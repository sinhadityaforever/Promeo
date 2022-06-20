"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    dbConnectionUrl: (_a = process.env.CONNECTION_URL) !== null && _a !== void 0 ? _a : '',
    port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 5000,
    secret: (_c = process.env.secret) !== null && _c !== void 0 ? _c : ''
};
