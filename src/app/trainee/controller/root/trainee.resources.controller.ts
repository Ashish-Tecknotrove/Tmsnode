
import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import responseCodes from "../../../../core/strings/response-codes";
import {AnyAaaaRecord} from "dns";
import express, {NextFunction, Request, Response} from "express";

import TechnologyCategory from "../../../../core/model/root/technology.model";

//TODO THIS FILE CREATED TOTALLY FOR TRAINEE DASHBOARD API FOR ELEARNING 
class TraineeResources {
    
    async getTechnologiesAllotedToTrainee(req: Request, res: Response)
    {
        try{
            await TraineeCurriculum.findAll({
                include:[{
                    model:TechnologyCategory,
                    attributes:['id','name'],
                    where:{IsDeleted:0}
                }],
                where:{
                  trainee_id:req.body.trainee_id,
                  IsBlock:0,
                  IsDeleted:0
                },
                attributes:['TechnologyCategory.name'],
                group:['TraineeCurriculum.technology_id']
              }).then((techData:any)=>
              {
                  if(techData.length !=0)
                  {
                    res
                    .status(responseCodes.SUCCESS)
                    .json({ response_code: 1, message:"Technologies Loaded",data:techData});
                  }
                  else
                  {
                    res
                    .status(responseCodes.SUCCESS)
                    .json({ response_code: 0, message:  "Oops! no curriculum has been alloted to you."});
                  }
                
              },err=>{
                res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message:  "Oops! "+ err.message });
              });
        }
        catch(err:any){
            res.status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message:  "Oops! "+ err.message });
            }
    }
}


export default new TraineeResources();