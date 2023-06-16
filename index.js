import fs from "fs";
import os from "os";
import path from "path";
import process from "process";
import cluster from "cluster";
import csvToJson from "./parser.js";
import divPathArr from './divide.js';


const input = process.argv[process.argv.length - 1];

if(cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  const csvFiles = new Promise((resolve, reject) => {
    fs.readdir(input, { recursive: true }, (err, files) => {
      if (err)
        reject(err.message);
      else {
        files.forEach(file => {
          if (path.extname(file) == ".csv")
            resolve(files);
        })
      }
    })
  });

  csvFiles.then(res => {
    const workerCount = Math.min(numCPUs, res.length);
    const csvFilePath = divPathArr(res, workerCount)
    for (let i = 0; i < csvFilePath.length; i++) {
      const worker = cluster.fork({ file: csvFilePath[i] });
      console.log('worker:', worker.id);
    }
  }).catch(err => {
    console.log(err);
  })
  
} else {
  const csvFiles = process.env.file.split(',');
  csvToJson(input, csvFiles);
}

