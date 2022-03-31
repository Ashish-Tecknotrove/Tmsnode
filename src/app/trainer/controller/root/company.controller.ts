import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');

import Trainee from "../../../../core/model/root/trainee.model";
import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import CurriculumBuilder from "../../../../core/model/root/curriculumbuilder.model";
import ElearningResult from "../../../../core/model/elearning/eLearningresult.model";
import Subscription from "../../../../core/model/root/subscription.model";
import Curriculum from "../../../../core/model/root/curriculum.model";
import { Op } from "sequelize";
import CurriculumParentCategoryTest from "../../../../core/model/root/curriculum_parent_category_test.model";
import TechnologyCategory from "../../../../core/model/root/technology.model";


class CompanyController {

    async get_company_card2_data(req: Request, res: Response) {
        try {

            let where = {};

            if (req.body.trainer_id) {
                where = {
                    IsDeleted: 0,
                    company_id: req.body.company_id,
                    trainer_id: req.body.trainer_id
                }
            } else {
                where = {
                    company_id: req.body.company_id,
                    IsDeleted: 0
                }
            }

            const TraineesData = await Trainee.findAll({
                include: [
                    {
                        model: TraineeCurriculum,
                        where: {
                            IsDeleted: 0
                        }
                    }
                ],
                where: where
            });

            if (TraineesData.length != 0) {

                //Get Block Trainees Filter
                let BlockTrainees = TraineesData.filter((element) => {
                    if (element['IsBlock'] == "1") {
                        return element
                    }
                });

                //Get Unblock Trainees Filter
                let UnBlockTrainees: any = TraineesData.filter((element) => {
                    if (element['IsBlock'] == "0") {
                        return element
                    }
                });


                let YetToStart = 0;
                let Completed = 0;
                let InProgress = 0;


                for (let i = 0; i < UnBlockTrainees.length; i++) {

                    let TraineeCurriculums = UnBlockTrainees[i]['dataValues']['TraineeCurriculums'];
                    let TotalCurriculum = TraineeCurriculums.length;
                    let CurriculumNotAttempt = 0;
                    let CurriculumAttempt = 0;
                    let CurriculumPass = 0;

                    for (let j = 0; j < TraineeCurriculums.length; j++) {

                        await CurriculumBuilder.findAll({
                            where: {
                                curriculum_id: TraineeCurriculums[j]['dataValues']['curriculum_id'],
                                IsDeleted: 0
                            }
                        }).then(async (CurriculumBuilderData: any) => {

                            let TotalTest = CurriculumBuilderData.length;
                            let ElearningResultTestNotAttempt = 0;
                            let ElearningResultTestAttempt = 0;
                            let ElearningResultTestPassed = 0;
                            let ElearningResultTestFailed = 0;


                            for (let k = 0; k < CurriculumBuilderData.length; k++) {
                                await ElearningResult.findOne({
                                    attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']],
                                    where: {
                                        curriculum_test_id: CurriculumBuilderData[k]['dataValues']['curriculum_parent_category_test_id'],
                                        trainee_id: UnBlockTrainees[i]['dataValues']['id'],
                                        test_start:1,
                                        IsDeleted: 0
                                    },
                                    // logging:console.log
                                }).then((ElearningResultData: any) => {

                                    // if (ElearningResultData == null) {
                                    if (ElearningResultData['id'] == null) {
                                        ElearningResultTestNotAttempt += 1;
                                    } else {
                                        if (ElearningResultData['status'] == '3') {
                                            ElearningResultTestPassed += 1;
                                        } else if (ElearningResultData['status'] == '2') {
                                            ElearningResultTestFailed += 1;
                                        }

                                        ElearningResultTestAttempt += 1;
                                    }

                                    CurriculumBuilderData[k]['dataValues']['ElearningResult'] = ElearningResultData;

                                    TraineeCurriculums[j]['dataValues']['TotalTest'] = TotalTest;
                                    TraineeCurriculums[j]['dataValues']['CurriculumBuilder'] = CurriculumBuilderData;
                                })
                            }


                            if (ElearningResultTestNotAttempt == TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestNotAttempt'] = true;
                                CurriculumNotAttempt += 1;
                            }

                            if (ElearningResultTestPassed == TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestPassed'] = true;
                                CurriculumPass += 1;
                            }

                            if (ElearningResultTestAttempt > 0 && ElearningResultTestAttempt <= TotalTest && ElearningResultTestPassed != TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestAttempt'] = true;
                                CurriculumAttempt += 1;
                            }


                        });


                    }

                    UnBlockTrainees[i]['dataValues']['TotalCurriculum'] = TotalCurriculum;
                    if (CurriculumNotAttempt == TotalCurriculum) {
                        UnBlockTrainees[i]['dataValues']['AllCurriculumNotAttempt'] = true;
                        YetToStart += 1;
                    }

                    if (CurriculumPass == TotalCurriculum) {
                        UnBlockTrainees[i]['dataValues']['AllCurriculumsPassed'] = true;
                        Completed += 1;
                    }

                    // console.log("CurriculumAttempt->",CurriculumAttempt);
                    if (CurriculumAttempt == TotalCurriculum) {
                        UnBlockTrainees[i]['dataValues']['AllCurriculumAttempt'] = true;
                        InProgress += 1;
                    }


                }

                // console.log("UnBlockTrainees->",UnBlockTrainees)

                let SuccessRatio = (Completed / UnBlockTrainees.length) * 100;


                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: responseStrings.GET,
                    TotalTraineesRegister: UnBlockTrainees.length,
                    TotalBlockTrainees: BlockTrainees.length,
                    YetToStart: YetToStart,
                    Completed: Completed,
                    InProgress: InProgress,
                    SuccessRatio: Math.round(SuccessRatio)
                    // TotalTraineesData: UnBlockTrainees,
                });

            } else {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: "Oops! Trainees not register or assign yet.",
                    TotalTraineesRegister: 0,
                    TotalBlockTrainees: 0,
                    YetToStart: 0,
                    Completed: 0,
                    InProgress: 0,
                    SuccessRatio: 0
                });

            }
        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + error.message});
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
}

export default new CompanyController();
