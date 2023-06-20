import fs from "fs";
import os from "os";
import http from 'http';
import process from "process";
import cluster from "cluster";
import csvToJson from "./parser.js";
import readDir from "./readdir.js";
import divPathArr from './divide.js';
import errorCheck from "./errorCheck.js";
import { resForSuccess, resForFail } from "./response.js";

if(cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  const csvFiles = readDir('./.csvFiles', ".csv");
  
  csvFiles.then(res => {
    const workerCount = Math.min(numCPUs, res.length);
    const csvFilePath = divPathArr(res, workerCount);
    for (let i = 0; i < csvFilePath.length; i++) {
      const worker = cluster.fork({ file: csvFilePath[i] });
      console.log('worker:', worker.id);
    }
  }).catch(err => {
    console.log(err);
  })
  
} else {
  const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/exports') {
      const csvFiles = process.env.file.split(',');
      csvToJson('.csvFiles', csvFiles);

      resForSuccess(res, 'Converted successfully');
    }else if(req.method === 'GET' && req.url === '/files') {
      const jsonFiles = readDir('./converted', '.json');

      jsonFiles.then(result => {
        resForSuccess(res, result);
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
        errorCheck(err, res, 'Delete file successfully.');
      });
    } else {
      resForFail(res, 'Invalid endpoint');
    }
  })
  server.listen(3000);
  
}

