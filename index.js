import os from "os";
import cluster from "cluster";
import readDir from "./readdir.js";
import divPathArr from './divide.js';
import server from './server.js';


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
  server();
}

