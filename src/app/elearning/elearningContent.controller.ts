import { Request, Response } from "express";
import ElearningMaster from "../../model/elearning/eLearningmaster.model";
import logController from "../root/log.controller";

class ElearningContent
{
    async elearningTestLink(req:Request,res:Response)
    {
        //var createdBy=req.body.createdBy;
        try{
            await ElearningMaster.create({...req.body}).then(function(data){

                res.status(200).json({ response_code: 1, message: "Elearning Content Uploaded", data: data });

                //logController.createLog(createdBy,"New Elearning Content Updated");
    
            }).catch(err=>{
    
                res.status(500).json({ response_code: 0, message: err});
    
            });
        }
        catch(err)
        {
            res.status(500).json({ response_code: 0, message: err});
        }

        res.status(500).json({ response_code: 0, message: "Done"});
        
    } 
}


export default new ElearningContent();