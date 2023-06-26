import { ServerResponse } from 'http';

function resForSuccess(res: ServerResponse, status: number, end: string) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(end);
}

function resForFail(res: ServerResponse, status: number, end: string) {
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.end(end);
}

export { resForSuccess, resForFail };