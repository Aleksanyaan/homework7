function resForSuccess(res,end) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(end);
}

function resForFail(res, end) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end(end);
}

export { resForSuccess, resForFail };