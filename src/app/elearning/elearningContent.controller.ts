import { Request, Response } from "express";
import { body } from "express-validator";
import { where } from "sequelize/types";
import ElearningMaster from "../../model/elearning/eLearningmaster.model";

class ElearningContent
{
    async elearningTestLink(req:Request,res:Response)
    {

        try{

            const checkExists = await ElearningMaster.findOne({
                where: {
                    test_id:req.body.test_id,
                    IsDeleted:0
                }
            });

            if (checkExists == null) {
                let obj={
                    test_id:req.body.test_id,
                    zipname:req.file?.filename
                };
    
                await ElearningMaster.create(obj).then(function(data){
                    res.status(200).json({ response_code: 1, message: "Elearning Content Uploaded", data: data });
                }).catch(err=>{
                    res.status(500).json({ response_code: 0, message: err});
                });
            }else{
                res.status(500).json({ response_code: 0, message: "Elearning Content already exits" });
            }
           
        }
        catch(err)
        {
            res.status(500).json({ response_code: 0, message: err});
        }

        
    } 
}


export default new ElearningContent();