import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import Languages from "../../model/language/language.model";

class LanguageController{
    async create(req:Request,res:Response)
    {
        const id = uuidv4();

        try
        {
            const record=await Languages.create({...req.body});
            return res.json({msg:"Successfully Created Language"});

        } catch(e)
        {
            return res.json({msg:e});
        }
    }
}

export default new LanguageController();