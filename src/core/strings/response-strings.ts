import { Request, Response } from "express";
import moment from "moment";

class ResponseStrings{
    //TODO Success Response
    ADD="Data Added Successfully";
    UPDATED="Data Updated Successfully";
    DELETE="Data Deleted Successfully";
    GET="Data Fetched Successfully";
    NOT="Data not found!";
    EXISTS="Data already exists!";
    SUBMIT="Submit Successfully!";

    // ! ERROR Reponse
    SERVER_ERROR="Internal Server Error Please Try Again Later";
    REQUEST_ERROR="Invalid Request";
    DATABASE_ERROR="Database ERROR";
    
    tokenExpired="Session Expired! Please Login again..";
    tokenValid="access token is valid";

    currentTime =  String(moment().format('YYYY-MM-DD HH:mm:ss'));

    currentDate=moment().format('YYYY-MM-DD');

    imageFilePath="";

    // elearningTestFilePath=new URL(Request.protocol + '://' + req.get('host'))+ "resources/company_logo/";
    
    UserTypeSuperAdmin=1;
    UserTypeCompanyLogin =2;
    UserTypeTrainer=3;
    UserTypeTrainee=4;
  

}
export default new ResponseStrings();