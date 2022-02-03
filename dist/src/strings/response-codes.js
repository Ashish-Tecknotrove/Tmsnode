"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseCodes {
    constructor() {
        this.SUCCESS = 200;
        this.PROCESSING = 102;
        this.CREATED = 201;
        this.BAD_REQUEST = 400;
        this.UNAUTHORIZED = 401;
        this.INTERNAL_SERVER_ERROR = 500;
        this.ACCEPTED = 202;
        this.NO_CONTENT = 204;
    }
}
exports.default = new ResponseCodes();
