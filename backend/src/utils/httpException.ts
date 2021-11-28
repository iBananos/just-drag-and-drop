export default class HttpException extends Error {

    status : number;
    fileName : string;
    message : string;

    constructor(status : number, fileName : string, message : string) {
        super(message);
        this.status = status;
        this.fileName = fileName;
        this.message = message;
    }

    toString() {
        return "Error " + this.status + " at file " + this.fileName + " : " + this.message;
    }
}