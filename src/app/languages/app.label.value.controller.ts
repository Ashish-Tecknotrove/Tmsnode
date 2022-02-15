import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import ApplabelValue from "../../model/language/app.label.value";
import Languages from "../../model/language/language.model";


class AppLabelValueController
{
    async create(req:Request,res:Response)
    {
        const id = uuidv4();

        try
        {
            const record=await ApplabelValue.create({...req.body});
            return res.json({msg:"Successfully Added value"});
        } 
        catch(e)
        {
            return res.json({msg:e});
        }
    }

    async findAll(req:Request,res:Response)
    {
        try{

            const joinData= await ApplabelValue.findAll(
                {
                    include:Languages
                }
            );
            
            return res.status(200).json({"response_code":1,"message":"Data Fetched Successfully...",data:joinData});
        }
        catch(e:any)
        {
            return res.status(500).json({"response_code":0,"message":e.message,data:[]});
        }
    }


    async addValue(req:Request , res:Response)
    {
        
    }
}

export default new AppLabelValueController();