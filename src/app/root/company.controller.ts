import { Request, Response } from "express";
import { body } from "express-validator";
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

    async total_companies(req: Request, res: Response)
    {
        var company_count=await Company.count({
            where:{
                IsDeleted:0
            }
        });

        res.status(200).json({response_code:1,count:company_count});
    }

    async updateCompany(req:Request,res:Response)
    {
        
        let company_id=req.body.company_id;        

        let check_company_is_valid=await Company.findOne({
            where:{
                id:company_id,
                IsDeleted:0
            },
            logging:console.log
        }).catch(err=>{
            res.status(500).json({response_code:0,message:err});
        });


        if(check_company_is_valid != null)
        {
            await Company.update({ ...req.body },{where:{id:company_id}}).then(function (data) 
            {
                res.status(200).json({ response_code: 1, message: "company updated successfully"});

            }).catch(function (err) {

                res.status(500).json({ response_code: 0, message: err });
            });
        }
        else
        {
            res.status(400).json({response_code:0,message:"Invalid Company please check company id or company is deleted"});
        }
    }

    async deleteCompany(req:Request,res:Response)
    {

        let company_id=req.body.company_id;  

        let check_company_is_valid=await Company.findOne({
            where:{
                id:company_id,
                IsDeleted:0
            },
            logging:console.log
        }).catch(err=>{
            res.status(500).json({response_code:0,message:err});
        });

        if(check_company_is_valid != null)
        {
            let updateData={
                IsDeleted:1,
                updated_by:req.body.updated_by

            }
            await Company.update({...updateData },{where:{id:company_id}}).then(function (data) 
            {
                res.status(200).json({ response_code: 1, message: "company deleted successfully"});

            }).catch(function (err) {

                res.status(500).json({ response_code: 0, message: err });
            });
        }
        else
        {
            res.status(400).json({response_code:0,message:"Invalid Company please check company id or company is deleted"});
        }


    }

    async getCompany(req:Request,res:Response)
    {
        let company_id='';
        let where_condition={};

        //TODOD Get Company By 
        if(req.body.company_id)
        {
            company_id=req.body.company_id
            where_condition={id:company_id,IsDeleted:0}
        }
        //TODO Get All Company 
        else
        {
            where_condition={IsDeleted:0}
        }

        const getCompany = await Company.findAll({
            where:where_condition,
            order:[
                ['id','DESC']
            ]})
            .then(data=>{

            if(data)
            {
                res.status(200).json({response_code:1,message:"response successfull...",data:data});
            }
            else
            {
                res.status(200).json({response_code:0,message:"no data found"});
            }

        }).catch(err=>{
            console.log(err);
            res.status(500).json({response_code:0,message:err});
        });

       

    }

    //TODO Company Login Calls

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

        await CompanyUser.create({...company_contact}).then(userdata=>
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

            Users.create({...userLoginData}).then(data=>
            {
                const updateId={
                    login_table_id:data['id']
                };
                CompanyUser.update({...updateId},{where:{id:userdata['id']}}).catch(err=>{res.status(500).json({message:err})});

                res.status(200).json({ response_code: 1, message: "company Login Created" });

            }).catch(function (err){
                res.status(500).json({ response_code: 0, message: err });
            });

        }).catch(function (err) {
            res.status(500).json({ response_code: 0, message: err });
        });

    }

    async get_company_user(req:Request,res:Response)
    {
        const company_id = req.body.company_id;

        const company_user_data=await CompanyUser.findAll({
            include:[
                {
                    model:Users
                },
                {
                model:Company,
                where:
                {
                    IsDeleted:0
                }}
                
            ],
            where:{
                company_id:company_id,
                canlogin:1,
                IsDeleted:0
            }
        }).catch(err=>{
            res.status(500).json({response_code:0,message:err});
        });

        if(company_user_data)
        {
            res.status(200).json({response_code:0,message:"company user fetched successfully...",data:company_user_data});
        }
        else
        {
            res.status(200).json({response_code:0,message:"no data found"});
        }

    }

    async delete_company_user(req:Request,res:Response)
    {
        const user_id = req.body.user_id;

        let updateData={
            IsDeleted:1,
            updated_by:req.body.updated_by
        }

        await CompanyUser.update({ ...updateData },{where:{id:user_id}}).then(function (data) 
        {
            res.status(200).json({ response_code: 1, message: "company user deleted successfully"});

        }).catch(function (err) {

            res.status(500).json({ response_code: 0, message: err });
        });
    }
    
}



export default new CompanyController();