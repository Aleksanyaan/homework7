import { ServerResponse } from 'http';

function resForSuccess(res: ServerResponse, end: string) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(end);
}

function resForFail(res: ServerResponse, end: string) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end(end);
}

export { resForSuccess, resForFail };