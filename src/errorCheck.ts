import { resForSuccess, resForFail } from "./response";
import { ServerResponse } from 'http';


function errorCheck(err: unknown, res: ServerResponse, end: string) {
    if (err) {
        resForFail(res, 404, 'File not found');
    } else {
        resForSuccess(res, 200, end);
    }
}

export default errorCheck;