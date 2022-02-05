"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseStrings {
    constructor() {
        //TODO Success Response
        this.ADD = "Data Added Successfully";
        this.UPDATED = "Data Updated Successfully";
        this.DELETE = "Data Deleted Successfully";
        this.GET = "Data Fetched Successfully";
        this.NOT = "Data not found!";
        this.EXISTS = "Data already exists!";
        // ! ERROR Reponse
        this.SERVER_ERROR = "Internal Server Error Please Try Again Later";
        this.REQUEST_ERROR = "Invalid Request";
        this.DATABASE_ERROR = "Database ERROR";
        this.tokenExpired = "Session Expired! Please Login again..";
        this.tokenValid = "access token is valid";
    }
}
exports.default = new ResponseStrings();
