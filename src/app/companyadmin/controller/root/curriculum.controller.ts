import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');


import Subscription from "../../../../core/model/root/subscription.model";
import Curriculum from "../../../../core/model/root/curriculum.model";
import TechnologyCategory from "../../../../core/model/root/technology.model";
import CurriculumBuilder from "../../../../core/model/root/curriculumbuilder.model";
import CurriculumParentCategoryTest from "../../../../core/model/root/curriculum_parent_category_test.model";
import { Op } from "sequelize";


//! Last Upated Ashish Rhatwal 9 feb 4:43 PM
class CurriculumController {

  async getTechnology(req: Request, res: Response) {
    try {
      const getTechnology = await TechnologyCategory.findAll();

      if (getTechnology != null) {
        return res.status(responseCodes.SUCCESS).json({
          response_code: 1,
          message: "data have been fetched successfully",
          data: getTechnology,
        });
      } else {
        return res
          .status(responseCodes.SUCCESS)
          .json({ response_code: 0, message: "No data were found", data: "" });
      }
    } catch (e: any) {
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 0,
        message:  "Oops! "+ e.message,
        data: "",
      });
    }
  }


  //!TODO GET CURRICULUM WITH SUBSCRIPTION CHECK
  //! This Function using in Company Panle to Load Curriculum With Technologies
  async getCurriculum_with_subscription_check(req: Request, res: Response) {
    try {
      var currentDate = responseStrings.currentDate;

      await Subscription.findAll({
        include: {
          model: Curriculum,
          required: true,
          where: {
            IsDeleted: 0,
          },
        },
        attributes:['id','curriculum_id','expiry_date'],
        where: {
          expiry_date: { [Op.gte]: currentDate },
          activation_date: { [Op.lte]: currentDate },
          IsDeleted: 0,
          company_id: req.body.company_id,
        },
      })
        .then(async (data:any) => 
        {

          if(data.length !=0)
          {
            for(var i=0;i<data.length;i++)
            {
              await CurriculumBuilder.findAll({
                include:[{
                  attributes:['technology_type_id'],
                  model:CurriculumParentCategoryTest,
                  where:{
                    IsDeleted:0
                  },
                  include:[{
                    attributes:['name'],
                    model:TechnologyCategory,
                    where:{
                      IsDeleted:0
                    },
                  }]
                }],
                attributes:['CurriculumParentCategoryTest.technology_type_id',
                'CurriculumParentCategoryTest->TechnologyCategory.name'],
                where:{
                  curriculum_id:data[i]['Curriculum']['id']
                },
                group:['CurriculumParentCategoryTest.technology_type_id'],
                // logging:console.log
              }).then((techData:any)=>
              {
                //console.log(techData);
                data[i]['dataValues']['technologies']=techData;
              },err=>{
                res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message:  "Oops! "+ err.message });
              });
            }
           
  
            res
              .status(responseCodes.SUCCESS)
              .json({
                response_code: 1,
                message: "Curriculum Fetched Successfully...",
                data: data,
              });
          }
          else
          {
            res
            .status(responseCodes.SUCCESS)
            .json({
              response_code: 0,
              message: "Oops! Curriculum not found or Please check your subscription is valid",
            });
          }

         
        })
        .catch((err) => {
          res
            .status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message:  "Oops! "+ err.message });
        });
    } catch (err: any) {}
  }

  async getTestMarksAttemptByTechnology(req: Request, res: Response) {
    try {
      console.log(req.body.company_id);
      await CurriculumBuilder.findAll({
        include: [
          {
            model: Curriculum,
            where: {
              IsDeleted: 0,
              company_id: req.body.company_id,
            },
            attributes: ["id", "company_id", "name"],
            required: true,
          },
          {
            model: CurriculumParentCategoryTest,
            include: [
              {
                model: TechnologyCategory,
                where: {
                  IsDeleted: 0,
                },
                attributes: ["id", "name"],
                required: false,
              },
            ],
            where: {
              IsDeleted: 0,
              // technology_type_id: req.body.technology_type_id
            },
            attributes: ["id", "prefix", "title"],
            required: true,
          },
        ],
        where: {
          IsDeleted: 0,
          curriculum_id: req.body.curriculum_id,
        },
        attributes: [
          "id",
          "curriculum_id",
          "curriculum_parent_category_id",
          "curriculum_parent_category_test_id",
          "passing_marks",
          "total_marks",
          "attempts",
        ],
      })
        .then((result) => {
          res.status(responseCodes.SUCCESS).json({
            response_code: 1,
            message:"Data fetched successfully.",
            data: result,
          });
        })
        .catch((err: any) => {
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message:  "Oops! "+ err.message,
          });
        });
    } catch (err: any) {
      res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 0,
        message:  "Oops! "+ err.message,
      });
    }
  }

  async submitTestMarksAttemptByTechnology(req: Request, res: Response) {
    try {
      let data = req.body.data;
      let datalength = data.length;

      for (let i = 0; i < datalength; i++) {
        let updateMarksAttempt = {
          passing_marks: data[i]["passing_marks"],
          total_marks: data[i]["total_marks"],
          attempts: data[i]["attempts"],
          updated_by: req.body.updated_by,
          updatedAt: responseStrings.currentTime,
        };

        await CurriculumBuilder.update(
          { ...updateMarksAttempt },
          {
            where: {
              id: data[i]["id"],
            },
          }
        )
          .then((result) => {
            if (datalength - 1 == i) {
              res.status(responseCodes.SUCCESS).json({
                response_code: 1,
                message: "Curriculum Attempt And Marks updated successfully...",
              });
            }
          })
          .catch((err: any) => {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
              response_code: 0,
              message:  "Oops! "+ err.message,
            });
          });
      }
    } catch (err: any) {
      res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 0,
        message:  "Oops! "+ err.message,
      });
    }
  }

}

export default new CurriculumController();
