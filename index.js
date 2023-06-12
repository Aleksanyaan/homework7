import fs from 'fs';
import { spawn } from 'child_process';

function getStatistics(command, args = [], timeout = Infinity) {
    const statistics = {
        start: new Date(),
        duration: 0,
        success: true,
    }

    statistics.start = new Date().toISOString();
    const start = new Date().getMilliseconds();
    const timestamp = statistics.start.replace(/[-:.]/g, '-');

    const childProcess = spawn(command, args);

    childProcess.on('error', (error) => {
        statistics.error = error.message;
        statistics.success = false;
    });

    childProcess.on('close', (code) => {
        if (code !== 0) {
          statistics.commandSuccess = false;
        }
    });

    childProcess.on('exit', (code) => {
        const end = Date.now();
        statistics.duration = end - start + 'ms';
        statistics.success = statistics.commandSuccess && code === 0;
    }); 

    const fileName = `./logs/${timestamp}${command}.json`;

    const end = new Date().getMilliseconds();
    statistics.duration = end - start + 'ms';

    fs.writeFile(fileName, JSON.stringify(statistics), (error) => {
        if (error) {
          console.error(`Error writing statistics to file: ${error}`);
        }
    });

    if (timeout !== Infinity) {
        setTimeout(() => {
            childProcess.kill();
        }, timeout);
    }

}

getStatistics('ls', ['-lh', '/usr'], 5000);