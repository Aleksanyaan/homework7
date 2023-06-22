import * as fs from 'fs';
import * as path from 'path';

function readDir(dir: string, extname: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dir, (err, files: string[]) => {
      if (err) {
        reject(err.message);
      } else {
        files.forEach(file => {
          if (path.extname(file) == extname)
            resolve(files);
        })
      }
    });
  });
}

export default readDir;
