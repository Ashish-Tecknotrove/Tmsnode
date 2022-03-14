import { check } from 'express-validator';
import e, { Request, Response } from "express";
import responseCodes from "../../strings/response-codes";
import responseStrings from "../../strings/response-strings";
import MasterDepartment from '../../model/root/master_department.model';
  
import CompanyContact from '../../model/root/companycontacts.model';
import Trainer from '../../model/root/trainer.model';
import Users from '../../model/root/users.model';
import CompanyDepartment from '../../model/root/company_department.model';

class CompanyDepartmentController {

   async assignTrainersToDepartment_SubCompany(req: Request, res: Response) {
      try {

         let update = {};
         if (req.body.sub_company_id && req.body.department_id) {
            update = {
               sub_company_id: req.body.sub_company_id,
               department_id: req.body.department_id,
               updated_by:req.body.updated_by,
               updatedAt:responseStrings.currentTime,
            }
         } else if(req.body.department_id){
            update = {
               department_id: req.body.department_id,
               updated_by:req.body.updated_by,
               updatedAt:responseStrings.currentTime,
            }
         }else if(req.body.sub_company_id){
            update = {
               sub_company_id: req.body.sub_company_id,
               updated_by:req.body.updated_by,
               updatedAt:responseStrings.currentTime,
            }
         }

         await Trainer.findOne({
            where:{
               id:req.body.trainer_id,
               IsDeleted:0
            }
         }).then(async(data:any)=>{
            if(data!=null){

               await Trainer.update({...update},{
                  where:{
                     id:req.body.trainer_id
                  }
               }).then((data)=>{
                  res.status(responseCodes.SUCCESS).json({
                     response_code: 1,
                     message: "Trainer assigned successfully."
                  });
               }).catch((err:any)=>{
                  return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                     response_code: 0,
                     message: "Oops! "+ err.message,
                     data: "",
                  });
               })
            }else{
               return res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: "Oops! An invalid trainer ID was entered, or this trainer was already deleted",
                  data: "",
               });
            }
         }).catch((err:any)=>{
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
               response_code: 0,
               message: "Oops! "+err.message,
               data: "",
            });
         })



      } catch (e: any) {
         return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: "Oops! "+e.message,
            data: "",
         });
      }
   }

   async addDepartment(req: Request, res: Response)
   {
      try
      {
         var company_id=req.body.company_id;
          var master_data={
            company_id: req.body.company_id,
             name:req.body.department_name,
             descripition:req.body.description,
             created_by:req.body.created_by,
             createdAt:responseStrings.currentTime
          }

         var check_master_department_exist=await MasterDepartment.findAll({
            where:{
               company_id:company_id,
               name:req.body.department_name,
               IsDeleted:0
            }
         });

         var check_email_exist_in_user_table=await Users.findAll({
            where:{
                email:req.body.email,
                IsDeleted:0
            }
        });

        if(check_master_department_exist.length == 0 && check_email_exist_in_user_table.length ==0)
        {
           await MasterDepartment.create({...master_data}).then(msdata=>
            {
               var companyData={
                  company_id: req.body.company_id,
                  department_id:msdata['id'],
                  name:req.body.username,
                  designation:req.body.designation,
                  contactNumber:req.body.contactNumber,
                  email: req.body.email,
                  created_by:req.body.created_by,
                  createdAt:responseStrings.currentTime
               }
               CompanyDepartment.create({...companyData}).then(cdData=>
               {
                   const user_login_data={
                       company_id: req.body.company_id,
                       name:req.body.username,
                       email: req.body.email,
                       password: req.body.password,
                       user_type: 6,
                       language:1,
                       createdAt: responseStrings.currentTime,
                       updated_by: "",
                       updatedAt: '',
                       created_by: req.body.created_by
                   };
                   Users.create({...user_login_data}).then(userdata=>{
                     var updateData={
                        login_table_id:userdata['id']
                    }
                    CompanyDepartment.update({...updateData},{where:{id:cdData['id']}}).then(succ=>{

                        res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Added department successfully, and login created" });            

                    }).catch(err=>{
                        res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message:"Opps! "+err.message});            

                    })


                   }).catch(err=>{

                       res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message:"Opps! "+err.message});            
                   })


               }).catch(err=>{
   
                   res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Opps! "+err.message });            
   
               });

           }).catch(err=>{

            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
               response_code: 0,
               message: "Opps! "+err.message,
               data: "",
            });
           })
        }
        else
        {
         res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: "Name or email of department already exists, please use another one" });            

        }

      }
      catch(err:any)
      {
         return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: "Opps! "+err.message,
            data: "",
         });
      }
   }

   async departmentDetails(req: Request, res: Response)
   {
      try
      {
         await CompanyDepartment.findAll({
            include:[
            {
               model:MasterDepartment
            },
            {
               model:Trainer,
               required:false,
               where:{IsDeleted:0}
            }
         ],
         where:{
            company_id:req.body.company_id,
            IsDeleted:0
         }

         }).then(data=>{

            if(data.length !=0)
            {
               res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "data have been fetched successfully",data:data});            
            }
            else
            {
               res.status(responseCodes.SUCCESS).json({ response_code: 0, message: "No data were found, please add the department"});            
            }

         }).catch(err=>{
            res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: "Oops! "+ err.message });            

         });
      }
      catch(err:any)
      {
         res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: "Oops! "+err.message });            

      }
   }

   async getCompanyDepartment(req:Request,res:Response)
   {
      try
      {
         var where={};
         if(req.body.sub_company_id)
         {
            where={
               sub_company_id:req.body.sub_company_id,
               IsDeleted: 0,
               IsBlock:0,
               company_id: req.body.company_id
            };
         }
         else
         {
            where={
               IsDeleted: 0,
               IsBlock:0,
               company_id: req.body.company_id
            };
         }

         await CompanyDepartment.findAll({
            include:[{
               model:MasterDepartment,
               required:true,
               where:{IsDeleted:0}
            }],
            where:where
         }).then(data=>{

            if(data.length != 0)
            {
               res.status(responseCodes.SUCCESS).json({ response_code: 0, message: "data have been fetched successfully.",data:data });            

            }
            else
            {
               res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: "No data were found, please add the department",data:data });            

            }

         }).catch(err=>{

            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! "+err.message });            

         });


      }
      catch(err:any)
      {
         res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! "+err.message });            
      }
   }

}
export default new CompanyDepartmentController();