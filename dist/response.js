"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resForFail = exports.resForSuccess = void 0;
function resForSuccess(res, end) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(end);
}
exports.resForSuccess = resForSuccess;
function resForFail(res, end) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(end);
}
exports.resForFail = resForFail;
