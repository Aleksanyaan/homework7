import { resForSuccess, resForFail } from "./response.js";

function errorCheck(err, res, end) {
    if (err) {
        resForFail(res, 'File not found');
    } else {
        resForSuccess(res, end);
    }
}

export default errorCheck;