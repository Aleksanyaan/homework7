"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function divPathArr(csvPath, workerCount) {
    var csvPathLength = csvPath.length;
    var count = Math.round(csvPathLength / workerCount);
    var divArr = [];
    var startIndex = 0;
    for (var i = 0; i < count; i++) {
        var endIndex = Math.min(startIndex + workerCount, csvPathLength);
        divArr.push(csvPath.slice(startIndex, endIndex));
        startIndex = endIndex;
    }
    return divArr;
}
exports.default = divPathArr;
