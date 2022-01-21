import Log from "./log.model";

class LogController{

    createLog(id:any,message:any)
    {
        var logdata={
            user_id:id,
            message:message
        };

        Log.create({...logdata}).then(sucess=>{
            console.log("Log generated successfully")
        }).catch(err=>{
            console.log("Error Generating Log")
        });
    }

}

export default new LogController();