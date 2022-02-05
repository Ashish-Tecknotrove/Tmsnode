"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseCodes {
    constructor() {
        this.PROCESSING = 102;
        this.SUCCESS = 200;
        this.CREATED = 201;
        this.ACCEPTED = 202;
        this.NO_CONTENT = 204;
        this.BAD_REQUEST = 400;
        this.UNAUTHORIZED = 401;
        this.INTERNAL_SERVER_ERROR = 500;
    }
}
exports.default = new ResponseCodes();
