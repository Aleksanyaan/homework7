"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var response_1 = require("./response");
function errorCheck(err, res, end) {
    if (err) {
        (0, response_1.resForFail)(res, 'File not found');
    }
    else {
        (0, response_1.resForSuccess)(res, end);
    }
}
exports.default = errorCheck;
