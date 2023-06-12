import fs from "fs";
import process from "process";
import { parse } from "csv-parse";
import cluster from "cluster";
import os from "os";

const input = process.argv[process.argv.length - 1];

fs.readdir(input, { recursive: true }, (err, files) => {
  if (err) {
    console.log(err.message);
  } else {
    files.forEach((item) => {
      if (cluster.isPrimary) {
        for (let i = 0; i < os.cpus().length - 1; i++) {
          const worker = cluster.fork();
        }
      } else {
        console.log("Worker is running", process.pid);
        const old = new Date().getMilliseconds();
        const currentDir = process.cwd();
        console.log(currentDir);
        const fileName = item.slice(0, item.length - 4);

        const outputPath = `${currentDir}/converted/${fileName}.json`;

        const readableStream = fs.createReadStream(
          `${currentDir}/${input}/${item}`
        );
        const writableStream = fs.createWriteStream(outputPath);

        readableStream.on("error", (error) => {
          console.log("Error with the readable stream:", error.message);
          process.exit(1);
        });

        writableStream.on("error", (error) => {
          console.log("Error with the writable stream:", error.message);
          process.exit(1);
        });

        const parser = parse();
        parser.on("readable", () => {
          let data;
          while ((data = parser.read())) {
            const jsonData = JSON.stringify(data);
            writableStream.write(`${jsonData}\n`);
          }
        });

        parser.on("end", () => {
          writableStream.end();
          const newData = new Date().getMilliseconds();
          console.log(newData - old);
        });

        readableStream.pipe(parser);
      }
    });
  }
});
