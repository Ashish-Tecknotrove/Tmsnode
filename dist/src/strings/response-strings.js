"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class ResponseStrings {
    constructor() {
        //TODO Success Response
        this.ADD = "Data Added Successfully";
        this.UPDATED = "Data Updated Successfully";
        this.DELETE = "Data Deleted Successfully";
        this.GET = "Data Fetched Successfully";
        this.NOT = "Data not found!";
        this.EXISTS = "Data already exists!";
        this.SUBMIT = "Submit Successfully!";
        // ! ERROR Reponse
        this.SERVER_ERROR = "Internal Server Error Please Try Again Later";
        this.REQUEST_ERROR = "Invalid Request";
        this.DATABASE_ERROR = "Database ERROR";
        this.tokenExpired = "Session Expired! Please Login again..";
        this.tokenValid = "access token is valid";
        this.currentTime = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        this.currentDate = (0, moment_1.default)().format('YYYY-MM-DD');
        this.imageFilePath = "";
        // elearningTestFilePath=new URL(Request.protocol + '://' + req.get('host'))+ "resources/company_logo/";
        this.UserTypeSuperAdmin = 1;
        this.UserTypeCompanyLogin = 2;
        this.UserTypeTrainer = 3;
        this.UserTypeTrainee = 4;
    }
}
exports.default = new ResponseStrings();
