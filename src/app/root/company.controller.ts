import { Model } from 'sequelize';
import { Request, Response } from "express";
import { body } from "express-validator";
import { where } from "sequelize/types";
import Company from "../../model/root/company.model";
import CompanyUser from "../../model/root/compayuser.model";
import Curriculum from "../../model/root/curriculum.model";
import Subscription from "../../model/root/subscription.model";
import Users from "../../model/root/users.model";
import responseCodes from "../../strings/response-codes";
import responseStrings from "../../strings/response-strings";
import CurriculumParentCategory from '../../model/root/curriculum_parent_category.model';
import moment from 'moment';
import Countries from '../../model/resources/countries.model';
import States from '../../model/resources/states.model';
import Cities from '../../model/resources/cities.model';


class CompanyController {

  async registerCompany(req: Request, res: Response) {
    try {
      var company_name = req.body.company_name;

      const checkName = await Company.findOne({
        where: {
          company_name: company_name,
        },
      });

      if (checkName == null) {

          req.body.updated_by = "";
          req.body.createdAt=responseStrings.currentTime

        await Company.create({ ...req.body })
          .then(function (response) {
            res
              .status(responseCodes.SUCCESS)
              .json({
                response_code: 1,
                message: responseStrings.ADD,
                data: response,
              });
          })
          .catch(function (err:any) {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message: err.message });
          });
      } else {
        res
          .status(responseCodes.CREATED)
          .json({
            response_code: 0,
            message: "company with same name already exits",
          });
      }
    } catch (error:any) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: error.message });
    }
  }

  async total_companies(req: Request, res: Response) {
    try {
      var company_count = await Company.count({
        where: {
          IsDeleted: 0,
        },
      })
        .then((success) => {
          res
            .status(responseCodes.SUCCESS)
            .json({
              response_code: 1,
              message: responseStrings.GET,
              count: company_count,
            });
        })
        .catch((error:any) => {
          res
            .status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message: error.message });
        });
    } catch (error:any) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: error.message });
    }
  }

  async updateCompany(req: Request, res: Response) {
    try {
      let company_id = req.body.company_id;

      let check_company_is_valid = await Company.findOne({
        where: {
          id: company_id,
          IsDeleted: 0,
        }
      }).catch((err:any) => {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: err.message });
      });

      if (check_company_is_valid != null) {
        
        req.body.updatedAt=responseStrings.currentTime;

        await Company.update({ ...req.body }, { where: { id: company_id } })
          .then(function (data) {
            res
              .status(responseCodes.SUCCESS)
              .json({ response_code: 1, message: responseStrings.UPDATED });
          })
          .catch(function (err:any) {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message: err.message });
          });
      } else {
        res
          .status(responseCodes.BAD_REQUEST)
          .json({
            response_code: 0,
            message:
              "Invalid Company please check company id or company is deleted",
          });
      }
    } catch (error:any) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: error.message });
    }
  }

  async deleteCompany(req: Request, res: Response) {
    try {
      let company_id = req.body.company_id;

      let check_company_is_valid = await Company.findOne({
        where: {
          id: company_id,
          IsDeleted: 0,
        },
        logging: console.log,
      }).catch((err:any) => {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: err });
      });

      if (check_company_is_valid != null) {
        let updateData = {
          IsDeleted: 1,
          deletedAt:responseStrings.currentTime,
          deleted_by: req.body.deleted_by,
        };

        await Company.update({ ...updateData }, { where: { id: company_id } })
          .then(function (data) {
            res
              .status(responseCodes.SUCCESS)
              .json({ response_code: 1, message: responseStrings.DELETE });
          })
          .catch(function (err:any) {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message: err.message });
          });
      } else {
        res
          .status(responseCodes.BAD_REQUEST)
          .json({
            response_code: 0,
            message:
              "Invalid Company please check company id or company is deleted",
          });
      }
    } catch (error:any) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: error.message });
    }
  }

  async getCompany(req: Request, res: Response) {
    try {
      let company_id = "";
      let where_condition = {};
      let include_condition = {};

      //TODOD Get Company By
      if (req.body.company_id) {
        company_id = req.body.company_id;
        where_condition = { id: company_id, IsDeleted: 0 };
        include_condition = {};
      }
      //TODO Get All Company
      else 
      {
        where_condition = { IsDeleted: 0 };
      }

      const getCompany = await Company.findAll(
        {
          where: where_condition,
          order: [["id", "DESC"]],
        })
        .then((data) => {
          if (data.length != 0) {
            res
              .status(responseCodes.SUCCESS)
              .json({
                response_code: 1,
                message: responseStrings.GET,
                data: data,
              });
          } else {
            res
              .status(responseCodes.SUCCESS)
              .json({ response_code: 0, message: "no data found" });
          }
        })
        .catch((err:any) => {
          console.log(err);
          res
            .status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message: err.message });
        });
    } catch (error:any) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: error.message });
    }
  }

  async get_company_details_by_id(req: Request, res: Response) {

    try {

      await Company.findOne({
        include: [
          {
            model: CompanyUser,
            attributes:['id','name','department','mobile_no','canlogin'],
            where: {
              IsDeleted: 0
            },
            required: false
          },
          {
            model: Subscription,
            include:[{
              model:Curriculum,
              attributes:['id','name'],
              where:{
                IsDeleted:0
              },
              required: false
            }],
            where: {
              IsDeleted: 0,
              company_id: req.body.company_id
            },
            required: false
          },
          {
            model:Countries,
            attributes:['title','slug'],
            required:false
          },
          {
            model:States,
            attributes:['title','slug'],
            required:false
          },
          {
            model:Cities,
            attributes:['title','slug'],
            required:false
          }
        ],
        logging:console.log,
        where: {
          id: req.body.company_id,
          IsDeleted: 0
        }
      }).then((result) => {

        if (result != null) {
          res
            .status(responseCodes.SUCCESS)
            .json({
              response_code: 1,
              message: responseStrings.GET,
              data: result,
            });
        } else {
          res
            .status(responseCodes.SUCCESS)
            .json({ response_code: 0, message: responseStrings.NOT });
        }
      })
    } catch (err:any) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: err.message });
    }
  }

  //TODO Company Login Calls

  async add_company_user(req: Request, res: Response) {
    try {

      req.body.createdAt=responseStrings.currentTime;

    
      await CompanyUser.create({ ...req.body })
        .then(function (data) {
          res
            .status(responseCodes.SUCCESS)
            .json({
              response_code: 1,
              message: "company user added",
              data: data,
            });
        })
        .catch(function (err:any) {
          res
            .status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message: err.message });
        });
    } catch (error:any) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: error.message });
    }
  }

  async add_company_login(req: Request, res: Response) {
    try {
      //Table Fields for Company Contact
      const company_contact = {
        company_id: req.body.company_id,
        name: req.body.name,
        department: req.body.department,
        mobile_no: req.body.mobile_no,
        canlogin: 1,
        created_by: req.body.created_by,
        updated_by: "",
        createdAt:responseStrings.currentTime
      };

      const checkUserExist= await CompanyUser.findAll({
        where:{
          name:req.body.name,
          company_id:req.body.company_id,
          IsDeleted:0
        }
      });

      if(checkUserExist.length == 0)
      {
        await CompanyUser.create({ ...company_contact })
        .then((userdata) => {
          //Add login in User table
          const userLoginData = {
            company_id: req.body.company_id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            user_type: 2,
            language: 1,
            createdAt:responseStrings.currentTime,
            created_by: req.body.created_by,
            updated_by: "",
          };

          Users.create({ ...userLoginData })
            .then((data) => {
              const updateId = {
                login_table_id: data["id"],
              };
              CompanyUser.update(
                { ...updateId },
                { where: { id: userdata["id"] } }
              ).catch((err:any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
              });

              res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.ADD });
              responseCodes;
            })
            .catch(function (err:any) {
              res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            });
        })
        .catch(function (err:any) {
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
        });
      }
      else
      {
        res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: "Contact with same name already exist" });
      }

     
    } catch (error:any) {
      res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: error.message });
    }
  }

  async updated_company_user(req:Request, res:Response)
  {
    try {
      let user_id = req.body.user_id;

      let check_company_user_is_valid = await CompanyUser.findOne({
        where: {
          id: user_id,
          IsDeleted: 0,
        }
      }).catch((err:any) => {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: err.message });
      });

      if (check_company_user_is_valid != null) {
        
        req.body.updatedAt=responseStrings.currentTime;
        const user_login_id=check_company_user_is_valid['login_table_id'];

        await CompanyUser.update({ ...req.body }, { where: { id: user_id } })
          .then(function (data) {

            const user_table_update={
              name:req.body.name,
              email:req.body.email,
              mobile_no:req.body.mobile_no,
              password:req.body.password,
              department:req.body.department,
              updated_by:req.body.updated_by,
              updatedAt:responseStrings.currentTime
            };

            Users.update(user_table_update,{where:{id:user_login_id}}).then(function(data){
              res
              .status(responseCodes.SUCCESS)
              .json({ response_code: 1, message: responseStrings.UPDATED });
            }).catch((err:any)=>{
              res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 1, message: err.message });
            });
           
          })
          .catch(function (err:any) {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message: err.message });
          });
      } else {
        res
          .status(responseCodes.BAD_REQUEST)
          .json({
            response_code: 0,
            message:
              "Invalid Company User  please check user id or user is deleted",
          });
      }
    } catch (error:any) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: error.message });
    }
  }

  async get_company_user(req: Request, res: Response) {

    try {
      const company_id = req.body.company_id;
     
      const company_user_data = await CompanyUser.findAll({
        include: [
          {
            model: Users,
          }
        ],
        where: {
          company_id: company_id,
          canlogin: 1,
          IsDeleted: 0,
        },
      }).catch((err:any) => {
        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
      });

      if (company_user_data) {
        res
          .status(responseCodes.SUCCESS)
          .json({
            response_code: 0,
            message: "company user fetched successfully...",
            data: company_user_data,
          });
      } else {
        res.status(responseCodes.SUCCESS).json({ response_code: 0, message: "no data found" });
      }
    }
    catch (error:any) {
      res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: error.message });
    }

  }

  async delete_company_user(req: Request, res: Response) {
    try {
      const user_id = req.body.user_id;

      const UserData=await CompanyUser.findOne({
        where:{
          id:user_id,
          IsDeleted:0
        }
      });

      if(UserData !=null)
      {
        //* This Array has been used to update two table check before any change
        let updateData = {
          IsDeleted: 1,
          deleted_by:req.body.deleted_by,
          deletedAt:responseStrings.currentTime
        };

        //! Delete the User from Company Contacts table
        await CompanyUser.update({ ...updateData }, { where: { id: user_id } })
        .then(function (data)
        {
           //! Delete the User from user table
          const login_table_id=UserData['login_table_id'];
         
          Users.update({...updateData},{where:{id:login_table_id}}).then(function(data)
          {
            res.status(responseCodes.SUCCESS)
            .json({
              response_code: 1,
              message: responseStrings.DELETE,
            });
          }).catch(function(err:any){
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
          });
         
         
        })
        .catch(function (err:any) {
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
        });
      }
      else
      {
        res.status(responseCodes.SUCCESS).json({ response_code: 0, message: "User Id is not valid" });

      }

      

      
    }
    catch (error:any) {
      res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: error.message });
    }

  }

}

export default new CompanyController();
