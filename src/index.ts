// Object.defineProperty(exports, "__esModule", { value: true });

import * as os from "os";
import cluster from "cluster";
import readDir from "./readdir";
import divPathArr from './divide';
import server from './server';


if(cluster.isPrimary) {
  const numCPUs: number = os.cpus().length;

  const csvFiles = readDir('./.csvFiles', ".csv");
  
  csvFiles.then((res: string[]) => {
    const workerCount = Math.min(numCPUs, res.length);
    const csvFilePath = divPathArr(res, workerCount);
    for (let i = 0; i < csvFilePath.length; i++) {
      const worker = cluster.fork({ file: csvFilePath[i] });
      console.log('worker:', worker.id);
    }
  }).catch((err: string) => {
    console.log(err);
  })
  
} else {
  server();
}

