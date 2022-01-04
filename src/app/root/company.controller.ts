import { Request, Response } from "express";
import Company from "../../model/root/company.model";
import CompanyUser from "../../model/root/compayuser.model";


class CompanyController
{


    async registerCompany(req:Request , res:Response)
    {
        try
        {
            await Company.create({...req.body}).then(function (response)
            {
                res.status(200).json({response_code:1,message:"company registered successfully",response:response});

            }).catch(function (err)
            {
                res.status(500).json({response_code:0,message:err});
            });
        }
        catch (error)
        {
            return res.status(500).json({ response_code:0,message: error });
        }
    }


    async add_company_user(req:Request,res:Response)
    {
        try
        {
            await CompanyUser.create({...req.body}).then(function (response)
            {
                res.status(200).json({response_code:1,message:"company user added"});

            }).catch(function (err)
            { 
                res.status(500).json({response_code:0,message:err});
            });
        }
        catch(error)
        {
            return res.status(500).json({response_code:0,message:error});
        }
    }
}



export default new CompanyController();