import fs from 'fs';
import path from 'path';

function readDir(dir, extname) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, { recursive: true }, (err, files) => {
            if (err)
              reject(err.message);
            else {
              files.forEach(file => {
                if (path.extname(file) == extname)
                  resolve(files);
              })
            }
        })
    }); 
}

export default readDir;
