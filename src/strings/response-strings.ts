
class ResponseStrings{
    //TODO Success Response
    ADD="Data Added Successfully";
    UPDATED="Data Updated Successfully";
    DELETE="Data Deleted Successfully";
    GET="Data Fetched Successfully";
    NOT="Data not found!";
    EXISTS="Data already exists!";

    // ! ERROR Reponse
    SERVER_ERROR="Internal Server Error Please Try Again Later";
    REQUEST_ERROR="Invalid Request";
    DATABASE_ERROR="Database ERROR";
    
    tokenExpired="Session Expired! Please Login again..";
    tokenValid="access token is valid";
    

  

}
export default new ResponseStrings();