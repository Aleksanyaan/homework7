import fs from 'fs';
import process from "process";
import { parse } from "csv-parse";

async function csvToJson(input, arr) {
    arr.forEach(item => {
        const currentDir = process.cwd();
        const fileName = item.slice(0, item.length - 4);
    
        const outputPath = `${currentDir}/converted/${fileName}.json`;
    
        const readableStream = fs.createReadStream(`${currentDir}/${input}/${item}`);
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
        });
    
        readableStream.pipe(parser);

        writableStream.on('close', () => {  
            process.exit(0);
        });
    })
    
}

export default csvToJson;