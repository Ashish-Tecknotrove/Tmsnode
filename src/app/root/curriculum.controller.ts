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

//! Last Upated Ashish Rhatwal 9 feb 4:43 PM
class CurriculumController {



  async create_curriculum_parent_category(req: Request, res: Response) {
    try {

      await CurriculumParentCategory.findOne({
        where: {
          title: req.body.title,
          IsDeleted: 0,
        },
      }).then(async result => {

        if (result == null) {

          req.body.createdAt = responseStrings.currentTime;
          req.body.updated_by = "";

          await CurriculumParentCategory.create({ ...req.body })
            .then(function (data) {
              res.status(responseCodes.SUCCESS).json({
                response_code: 1,
                message: responseStrings.ADD,
                data: data,
              });
            })
            .catch(function (err) {
              res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err });
            });
        } else {
          res
            .status(responseCodes.CREATED)
            .json({ response_code: 0, message: responseStrings.EXISTS });
        }

      }).catch(async err => {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: err });
      })


    } catch (error) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: error });
    }
  }

  async create_curriculum_parent_category_test(req: Request, res: Response) {
    try {

      req.body.createdAt = responseStrings.currentTime;
      req.body.updated_by = "";

      await CurriculumParentCategoryTest.findOne({
        where: { title: req.body.title },
      }).then(async data => {

        if (data == null) {
          await CurriculumParentCategoryTest.create({ ...req.body })
            .then(function (data) {
              res.status(responseCodes.SUCCESS).json({
                response_code: 1,
                message: responseStrings.ADD,
                data: data,
              });
            })
            .catch(function (err) {
              res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err });
            });
        }
        else
        {
          res
          .status(responseCodes.CREATED)
          .json({ response_code: 0, message: responseStrings.EXISTS });
        }

      }).catch(err => {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: err });
      })


    } catch (error) {
      return res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: error });
    }
  }

  async getTechnology(req: Request, res: Response) {
    try {
      const getTechnology = await TechnologyCategory.findAll();

      if (getTechnology != null) {
        return res.status(responseCodes.SUCCESS).json({
          response_code: 1,
          message: responseStrings.GET,
          data: getTechnology,
        });
      } else {
        return res
          .status(responseCodes.SUCCESS)
          .json({ response_code: 0, message: responseStrings.NOT, data: "" });
      }
    } catch (e) {
      return res.status(responseCodes.SUCCESS).json({
        response_code: 1,
        message: e,
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
      }).then((data) => {
        res.status(responseCodes.SUCCESS).json({
          response_code: 0,
          message: responseStrings.GET,
          data: data,
        });
      })
        .catch((err) => {
          console.log("err1->", err);
          res
            .status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message: err });
        });
    } catch (err) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 1, message: err });
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
        // logging: console.log
      });

      // console.log(getCurriculum);

      if (getCurriculum.length == 0) {
        return res
          .status(responseCodes.SUCCESS)
          .json({ response_code: 0, message: responseStrings.NOT, data: getCurriculum });

      } else {
        return res.status(responseCodes.SUCCESS).json({
          response_code: 1,
          message: responseStrings.GET,
          data: getCurriculum,
        });
      }
    } catch (e) {
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 0,
        message: e,
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
      });

      if (getTest != null) {
        return res.status(responseCodes.SUCCESS).json({
          response_code: 1,
          message: responseStrings.GET,
          data: getTest,
        });
      } else {
        return res
          .status(responseCodes.SUCCESS)
          .json({ response_code: 0, message: responseStrings.NOT, data: "" });
      }
    } catch (e) {
      return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 1,
        message: e,
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
      }).catch((err) => {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: err });
      });

      const updateData = {
        IsDeleted: 1,
        deletedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        deleted_by:req.body.deleted_by
      };

      // console.log("check_company_is_valid->",check_company_is_valid);

      if (check_company_is_valid != null) {
        await CurriculumParentCategoryTest.update(updateData, {
          where: { id: test_id },
        })
          .then(function (data) {
            res
              .status(responseCodes.SUCCESS)
              .json({ response_code: 1, message: responseStrings.DELETE });
          })
          .catch(function (err) {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message: err });
          });
      } else {
        res
          .status(responseCodes.SUCCESS)
          .json({ response_code: 0, message: responseStrings.NOT });
      }
    } catch (e) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 1, message: e });
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
      }).catch((err) => {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: err });
      });

      const updateData = {
        prefix: req.body.prefix,
        title: req.body.title,
        updated_by:req.body.updated_by,
        updatedAt:responseStrings.currentTime
      };

      if (check_company_is_valid != null) {
        await CurriculumParentCategoryTest.update(updateData, {
          where: { id: test_id },
        })
          .then(function (data) {
            res
              .status(responseCodes.SUCCESS)
              .json({ response_code: 1, message: responseStrings.UPDATED });
          })
          .catch(function (err) {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message: err });
          });
      } else {
        res
          .status(responseCodes.SUCCESS)
          .json({ response_code: 0, message: responseStrings.NOT });
      }
    } catch (e) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 1, message: e });
    }
  }

  async buildCurriculum(req: Request, res: Response) {
    try {
      //Create Curriculum
      const curriculum = {
        company_id: req.body.company_id,
        name: req.body.name,
        created_by: req.body.created_by,
        updated_by: '',
        createdAt:responseStrings.currentTime
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
                      message: responseStrings.ADD,
                    });
                  }

                })
                .catch((err) => {
                  console.log(err);
                  res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err,
                  });
                });
            }

          })
          .catch(function (err) {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message: err });
          });
      } else {
        res
          .status(responseCodes.CREATED)
          .json({ response_code: 0, message: responseStrings.EXISTS });
      }
    } catch (err) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: err });
    }
  }
}

export default new CurriculumController();
