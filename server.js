import http from 'http';
import fs from 'fs';
import process from "process";
import csvToJson from "./parser.js";
import readDir from "./readdir.js";
import errorCheck from "./errorCheck.js";
import { resForSuccess, resForFail } from "./response.js";


function server() {
    return http.createServer((req, res) => {
        if (req.method === 'POST' && req.url === '/exports') {
          const csvFiles = process.env.file.split(',');
          csvToJson('.csvFiles', csvFiles);
    
          resForSuccess(res, 'Converted successfully');
        }else if(req.method === 'GET' && req.url === '/files') {
          const jsonFiles = readDir('./converted', '.json');
    
          jsonFiles.then(result => {
            resForSuccess(res, JSON.stringify(result));
          }).catch(error => {
            resForFail(res, error.message);
          })
        } else if(req.method === 'GET' && req.url.startsWith('/files/')) {
          const filename = req.url.split('/')[2];
          fs.readFile(`./converted/${filename}`, 'utf8', (err, data) => {
            errorCheck(err, res, data);
          });
        }else if(req.method === 'DELETE' && req.url.startsWith('/files/')) {
          const filename = req.url.split('/')[2];
          fs.unlink(`./converted/${filename}`, (err) => {
            errorCheck(err, res, 'Delete file succesfully');
          });
        } else {
          resForFail(res, 'Invalid endpoint');
        }
      }).listen(3000);
}

export default server;