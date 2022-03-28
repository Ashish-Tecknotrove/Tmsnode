import CurriculumParentCategory from "../../model/root/curriculum_parent_category.model";
import { Request, Response } from "express";
import TechnologyCategory from "../../model/root/technology.model";
import CurriculumParentCategoryTest from "../../model/root/curriculum_parent_category_test.model";
import CurriculumBuilder from "../../model/root/curriculumbuilder.model";
import Curriculum from "../../model/root/curriculum.model";
import { Op } from "sequelize";
import sequelize from "sequelize";
import responseCodes from "../../strings/response-codes";
import Languages from "../../model/language/language.model";
import moment from "moment";
import responseStrings from "../../strings/response-strings";
import Subscription from "../../model/root/subscription.model";

//! Last Upated Ashish Rhatwal 9 feb 4:43 PM
class CurriculumController {

  async create_curriculum_parent_category(req: Request, res: Response) {
    try {
      await CurriculumParentCategory.findOne({
        where: {
          title: req.body.title,
          IsDeleted: 0,
        },
      }).then(async (result) => {
          if (result == null) {
            req.body.createdAt = responseStrings.currentTime;
            req.body.updated_by = "";

            await CurriculumParentCategory.create({ ...req.body })
              .then(function (data) {
                res.status(responseCodes.SUCCESS).json({
                  response_code: 1,
                  message: "Category added successfully.",
                  data: data,
                });
              })
              .catch(function (err: any) {
                res
                  .status(responseCodes.INTERNAL_SERVER_ERROR)
                  .json({ response_code: 0, message:  "Oops! "+ err.message });
              });
          } else {
            res
              .status(responseCodes.BAD_REQUEST)
              .json({ response_code: 0, message: "Oops! Name of category already exists, please use another name" });
          }
        })
        .catch((err: any) => {
          res
            .status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message:  "Oops! "+ err.message });
        });
    } catch (error: any) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message:  "Oops! "+ error.message });
    }
  }
  
  async create_curriculum_parent_category_test(req: Request, res: Response) {
    try {
      req.body.createdAt = responseStrings.currentTime;
      req.body.updated_by = "";

      await CurriculumParentCategoryTest.findOne({
        where: { title: req.body.title },
      })
        .then(async (data) => {
          if (data == null) {
            await CurriculumParentCategoryTest.create({ ...req.body })
              .then(function (data) {
                res.status(responseCodes.SUCCESS).json({
                  response_code: 1,
                  message: "Test added successfully.",
                  data: data,
                });
              })
              .catch(function (err: any) {
                res
                  .status(responseCodes.INTERNAL_SERVER_ERROR)
                  .json({ response_code: 0, message:  "Oops! "+ err.message });
              });
          } else {
            res
              .status(responseCodes.CREATED)
              .json({ response_code: 0, message: "Oops! Name of test already exists, please use another name" });
          }
        })
        .catch((err: any) => {
          res
            .status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message:  "Oops! "+ err.message });
        });
    } catch (error: any) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message:  "Oops! "+ error.message });
    }
  }

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

  async getCompanyCurriculum(req: Request, res: Response) {
    try {
      await Curriculum.findAll({
        where: {
          company_id: req.body.company_id,
          IsDeleted: 0
        },
        order:[["id","DESC"]]
      })
        .then((data) => {
          res.status(responseCodes.SUCCESS).json({
            response_code: 1,
            message: "data have been fetched successfully",
            data: data,
          });
        })
        .catch((err: any) => {
          console.log("err1->", err);
          res
            .status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message:  "Oops! "+ err.message });
        });
    } catch (err: any) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message:  "Oops! "+ err.message });
    }
  }

  async getCurriculumParent(req: Request, res: Response) {
    try {
      const technology_id = req.body.technology_id;

      const getCurriculum = await CurriculumParentCategory.findAll({
        include: [
          {
            model: CurriculumParentCategoryTest,
          },
        ],
        where: {
          technology_type_id: {
            [Op.in]: [sequelize.literal(`${technology_id}`)],
          },
          IsDeleted: 0
        },
        order:[["id","desc"]]
        // logging: console.log
      });

      // console.log(getCurriculum);

      if (getCurriculum.length == 0) {
        return res
          .status(responseCodes.SUCCESS)
          .json({
            response_code: 0,
            message: "No data were found",
            data: getCurriculum,
          });
      } else {
        return res.status(responseCodes.SUCCESS).json({
          response_code: 1,
          message: "data have been fetched successfully",
          data: getCurriculum,
        });
      }
    } catch (e: any) {
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 0,
        message:  "Oops! "+ e.message,
        data: "",
      });
    }
  }

  async getCurriculumParentTest(req: Request, res: Response) {
    try {
      const parent_id = req.body.parent_id;

      const getTest = await CurriculumParentCategoryTest.findAll({
        include: [
          {
            model: Languages,
            attributes: {
              exclude: [
                "id",
                "description",
                "created_by",
                "isDeleted",
                "createdAt",
                "updatedAt",
              ],
            },
          },
        ],
        where: {
          parent_id: parent_id,
          IsDeleted: 0,
        },
        order:[["id","desc"]]
      });

      if (getTest != null) {
        return res.status(responseCodes.SUCCESS).json({
          response_code: 1,
          message: "data have been fetched successfully",
          data: getTest,
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

  async deleteCurriculumParentCategoryTest(req: Request, res: Response) {
    try {
      const test_id = req.body.test_id;

      let check_company_is_valid = await CurriculumParentCategoryTest.findOne({
        where: {
          id: test_id,
          IsDeleted: 0,
        },
        // logging:console.log
      }).catch((err: any) => {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message:  "Oops! "+ err.message });
      });

      const updateData = {
        IsDeleted: 1,
        deletedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        deleted_by: req.body.deleted_by
      };

      // console.log("check_company_is_valid->",check_company_is_valid);

      if (check_company_is_valid != null) {
        await CurriculumParentCategoryTest.update(updateData, {
          where: { id: test_id },
        })
          .then(function (data) {
            res
              .status(responseCodes.SUCCESS)
              .json({ response_code: 1, message: "Test deleted successfully." });
          })
          .catch(function (err: any) {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message:  "Oops! "+ err.message });
          });
      } else {
        res
          .status(responseCodes.SUCCESS)
          .json({ response_code: 0, message: "Oops! An invalid ID was entered, or this test was already deleted" });
      }
    } catch (e: any) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message:  "Oops! "+ e.message });
    }
  }

  async updateCurriculumParentCategoryTest(req: Request, res: Response) {
    try {
      const test_id = req.body.test_id;

      let check_company_is_valid = await CurriculumParentCategoryTest.findOne({
        where: {
          id: test_id,
          IsDeleted: 0,
        },
        // logging:console.log
      }).catch((err: any) => {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message:  "Oops! "+ err.message });
      });

      const updateData = {
        prefix: req.body.prefix,
        title: req.body.title,
        description:req.body.description,
        updated_by: req.body.updated_by,
        updatedAt: responseStrings.currentTime,
      };

      if (check_company_is_valid != null) {
        await CurriculumParentCategoryTest.update(updateData, {
          where: { id: test_id },
        })
          .then(function (data) {
            res
              .status(responseCodes.SUCCESS)
              .json({ response_code: 1, message: "Test updated successfully." });
          })
          .catch(function (err: any) {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message:  "Oops! "+ err.message });
          });
      } else {
        res
          .status(responseCodes.SUCCESS)
          .json({ response_code: 0, message: "No data were found" });
      }
    } catch (e: any) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message:  "Oops! "+ e.message });
    }
  }

  async buildCurriculum(req: Request, res: Response) {
    try {
      //Create Curriculum
      const curriculum = {
        company_id: req.body.company_id,
        name: req.body.name,
        created_by: req.body.created_by,
        updated_by: "",
        createdAt: responseStrings.currentTime,
      };

      //Check Curriculum Already Exist
      var check_curriculum_exist = await Curriculum.findOne({
        where: {
          name: req.body.name,
          IsDeleted: 0,
        },
        // logging: console.log,
      });

      if (check_curriculum_exist == null) {
        //Parse JSON String into JSON Object
        var curriculumBody = req.body.curriculum;
        var curriculumBodyData = JSON.parse(curriculumBody);
        //Parse JSON String into JSON Object

        //Step 1 Create Curriculum Data
        await Curriculum.create({ ...curriculum })
          .then(function (data) {
            //Get Curriculum Id
            var curriculum_id = data["id"];

            let trueFalse = 0;

            //Add This id and Created Curriculum Builder with parent id
            for (var i = 0; i < curriculumBodyData.length; i++) {
              var curriculum_data = {
                curriculum_id: curriculum_id,
                curriculum_parent_category_id: curriculumBodyData[i]["cp_id"],
                curriculum_parent_category_test_id:
                  curriculumBodyData[i]["cptest_id"],
                created_by: curriculumBodyData[i]["created_by"],
                updated_by: curriculumBodyData[i]["updated_by"],
                createdAt:responseStrings.currentTime
              };

              CurriculumBuilder.create({ ...curriculum_data })
                .then((result) => {
                  trueFalse = trueFalse + 1;
                  // console.log("trueFalse->",trueFalse)

                  if (trueFalse == curriculumBodyData.length) {
                    res.status(responseCodes.SUCCESS).json({
                      response_code: 1,
                      curriculum_id: data["id"],
                      message: "Curriculum build successfully. Please add subscription to use the curriculum.",
                    });
                  }
                })
                .catch((err: any) => {
                  console.log(err);
                  res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message:  "Oops! "+ err.message,
                  });
                });
            }
          })
          .catch(function (err: any) {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message:  "Oops! "+ err.message });
          });
      } else {
        res
          .status(responseCodes.CREATED)
          .json({ response_code: 0, message: responseStrings.EXISTS });
      }
    } catch (err: any) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message:  "Oops! "+ err.message });
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
