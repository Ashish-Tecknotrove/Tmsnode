import { Request, Response } from "express";
import { where } from "sequelize/types";
import Company from "../../model/root/company.model";
import CompanyUser from "../../model/root/compayuser.model";
import Users from "../../model/root/users.model";


class CompanyController {


    async registerCompany(req: Request, res: Response)
    {
        try {
            var company_name = req.body.company_name;

            const checkName = await Company.findOne({
                where: {
                    company_name: company_name
                }
            });

            if (checkName == null) {
                await Company.create({ ...req.body }).then(function (response) {
                    res.status(200).json({ response_code: 1, message: "company registered successfully", data: response });

                }).catch(function (err) {
                    res.status(500).json({ response_code: 0, message: err });
                });
            }
            else
            {
                res.status(500).json({ response_code: 0, message: "Company with same name already exits" });
            }

        }
        catch (error) {
            return res.status(500).json({ response_code: 0, message: error });
        }
    }


    async add_company_user(req: Request, res: Response) {
        try {
            await CompanyUser.create({ ...req.body }).then(function (data) {
                res.status(200).json({ response_code: 1, message: "company user added" ,data:data});

            }).catch(function (err) {
                res.status(500).json({ response_code: 0, message: err });
            });
        }
        catch (error) {
            return res.status(500).json({ response_code: 0, message: error });
        }
    }

    async add_company_login(req:Request,res:Response)
    {
        //Table Fields for Company Contact
        const company_contact={
            company_id:req.body.company_id,
            name:req.body.name,
            department:req.body.department,
            mobile_no:req.body.mobile_no,
            canlogin:1,
            created_by:req.body.created_by,
            updated_by:req.body.updated_by,
        };

        await CompanyUser.create({...company_contact}).then(function ()
        {
            //Add login in User table
            const userLoginData={
                company_id:req.body.company_id,
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                user_type:2,
                language:1,
                created_by:req.body.created_by,
                updated_by:req.body.updated_by,
            }

            Users.create({...userLoginData}).then(function ()
            {
                res.status(200).json({ response_code: 1, message: "company Login Created" });

            }).catch(function (err){
                res.status(500).json({ response_code: 0, message: err });
            });

        }).catch(function (err) {
            res.status(500).json({ response_code: 0, message: err });
        });

    }
}


export default new CompanyController();