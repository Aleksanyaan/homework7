import { resForSuccess, resForFail } from "./response";
import { ServerResponse } from 'http';


function errorCheck(err: unknown, res: ServerResponse, end: string) {
    if (err) {
        resForFail(res, 'File not found');
    } else {
        resForSuccess(res, end);
    }
}

export default errorCheck;