"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os = __importStar(require("os"));
var cluster_1 = __importDefault(require("cluster"));
var readdir_1 = __importDefault(require("./readdir"));
var divide_1 = __importDefault(require("./divide"));
var server_1 = __importDefault(require("./server"));
if (cluster_1.default.isPrimary) {
    var numCPUs_1 = os.cpus().length;
    var csvFiles = (0, readdir_1.default)('./.csvFiles', ".csv");
    csvFiles.then(function (res) {
        var workerCount = Math.min(numCPUs_1, res.length);
        var csvFilePath = (0, divide_1.default)(res, workerCount);
        for (var i = 0; i < csvFilePath.length; i++) {
            var worker = cluster_1.default.fork({ file: csvFilePath[i] });
            console.log('worker:', worker.id);
        }
    }).catch(function (err) {
        console.log(err);
    });
}
else {
    (0, server_1.default)();
}
