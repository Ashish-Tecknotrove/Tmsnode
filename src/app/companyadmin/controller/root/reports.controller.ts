import { Request, Response } from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');
import moment from "moment";


import ElearningResult from "../../../../core/model/elearning/eLearningresult.model";
import CompanyDepartment from "../../../../core/model/root/company_department.model";
import CurriculumBuilder from "../../../../core/model/root/curriculumbuilder.model";
import MasterDepartment from "../../../../core/model/root/master_department.model";
import SubCompany from "../../../../core/model/root/subcompany.model";
import Trainee from "../../../../core/model/root/trainee.model";
import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import Trainer from "../../../../core/model/root/trainer.model";
import Curriculum from "../../../../core/model/root/curriculum.model";
import Subscription from "../../../../core/model/root/subscription.model";
import { Op } from "sequelize";
import ClinicalPerformance from "../../../../core/model/driving/stimulator/clinical/clinicalperformance.model";
import CurriculumParentCategoryTest from "../../../../core/model/root/curriculum_parent_category_test.model";
import ElearningStatus from "../../../../core/model/elearning/elearning_status.model";

class ReportsController {

   //* CompanyAdmin Dashboard Card1 Report
   async get_company_card1_data(req: Request, res: Response) {
      try {

         const TraineesData = await Trainee.findAll({
            where: {
               company_id: req.body.company_id,
               IsDeleted: 0,
               IsBlock: 0
            }
         });

         let currentMonth = moment().format("YYYY-MM");
         let currentMonthText = moment().format("MMMM");
         let currentYearText = moment().format("YYYY");

         if (TraineesData.length != 0) {

            let TraineeCurrentMonth = TraineesData.filter((element) => {


               var elementMonth = moment(element['createdAt'], "YYYY-MM-DD").format("YYYY-MM");

               if (currentMonth == elementMonth) {
                  return element
               }
            })

            res.status(responseCodes.SUCCESS).json({
               response_code: 1,
               message: responseStrings.GET,
               currentYearText: currentYearText,
               currentMonthText: currentMonthText,
               currentMonthTraineesCount: TraineeCurrentMonth.length,
               allTraineesCount: TraineesData.length
            });

         } else {
            res.status(responseCodes.SUCCESS).json({
               response_code: 0,
               message: "Oops! Trainees not register yet.",
               currentYearText: currentYearText,
               currentMonthText: currentMonthText,
               currentMonthTraineesCount: 0,
               allTraineesCount: 0
            });

         }
      } catch (error: any) {
         res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
      }
   }

   //* Trainee Trainning Progress Dashboard Card1 Report
   async getTrainerTrainingReport(req: Request, res: Response) {
      try {

         let where = {};

         if (req.body.trainer_id && req.body.department_id && req.body.sub_company_id) {
            where = {
               IsDeleted: 0,
               company_id: req.body.company_id,
               sub_company_id: req.body.sub_company_id,
               department_id: req.body.department_id,
               trainer_id: req.body.trainer_id
            }
         } else if (req.body.department_id && req.body.sub_company_id) {
            where = {
               IsDeleted: 0,
               company_id: req.body.company_id,
               sub_company_id: req.body.sub_company_id,
               department_id: req.body.department_id
            }
         } else if (req.body.sub_company_id) {
            where = {
               IsDeleted: 0,
               company_id: req.body.company_id,
               sub_company_id: req.body.sub_company_id
            }
         } else if (req.body.trainer_id && req.body.department_id) {
            where = {
               IsDeleted: 0,
               company_id: req.body.company_id,
               department_id: req.body.department_id,
               trainer_id: req.body.trainer_id
            }
         } else if (req.body.department_id) {
            where = {
               IsDeleted: 0,
               company_id: req.body.company_id,
               department_id: req.body.department_id
            }
         } else if (req.body.trainer_id) {
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
                  // required:false,
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

            let UnBlockTraineesId = Array();
            //Get Unblock Trainees Filter
            let UnBlockTrainees: any = TraineesData.filter((element: any) => {
               if (element['IsBlock'] == "0") {
                  UnBlockTraineesId.push(element['id'])
                  return element
               }
            });
            // console.log("UnBlockTraineesId->", UnBlockTraineesId);

            let YetToStart = 0;
            let Completed = 0;
            let InProgress = 0;

            //* Get Curriculums By Trainees
            let TraineeCurriculumId = Array();
            let getTraineeCurriculum: any = await TraineeCurriculum.findAll({
               where: {
                  trainee_id: UnBlockTraineesId, //? In Query of Trainees
                  IsDeleted: 0
               },
               group: ['curriculum_id']
            });

            //* Get Curriculums Ids for IN Query
            getTraineeCurriculum.filter((element: any) => {
               TraineeCurriculumId.push(element['curriculum_id']);
            });
            // console.log("TraineeCurriculumId->", TraineeCurriculumId);


            //Get Curriculum Builder by Curriculums Ids
            let CurriculumBuilderData1: any = await CurriculumBuilder.findAll({
               where: {
                  curriculum_id: TraineeCurriculumId,
                  IsDeleted: 0
               }
            });


            let ElearningResultData1 = await ElearningResult.findAll({
               where: {
                  IsDeleted: 0,
                  trainee_id: UnBlockTraineesId
               },
               order: [['attempt_no', 'DESC']]
            })


            for (let i = 0; i < UnBlockTrainees.length; i++) {

               let TraineeCurriculums = UnBlockTrainees[i]['dataValues']['TraineeCurriculums'];
               let TotalCurriculum = TraineeCurriculums.length;
               let CurriculumNotAttempt = 0;
               let CurriculumAttempt = 0;
               let CurriculumPass = 0;

//                if(TraineeCurriculums.length==0){
// console.log(UnBlockTrainees[i]['dataValues']['id']);
//                }

               for (let j = 0; j < TraineeCurriculums.length; j++) {

                  let CurriculumBuilderData: any = CurriculumBuilderData1.filter((element: any) => {
                     if (element['curriculum_id'] == TraineeCurriculums[j]['dataValues']['curriculum_id']) {
                        return element
                     }
                  });


                  let TotalTest = CurriculumBuilderData.length;
                  let ElearningResultTestNotAttempt = 0;
                  let ElearningResultTestAttempt = 0;
                  let ElearningResultTestPassed = 0;
                  let ElearningResultTestFailed = 0;


                  for (let k = 0; k < TotalTest; k++) {

                     let ElearningResults: any = ElearningResultData1.filter((element: any) => {
                        if (element['dataValues']['curriculum_test_id'] == CurriculumBuilderData[k]['dataValues']['curriculum_parent_category_test_id'] &&
                           element['dataValues']['trainee_id'] == UnBlockTrainees[i]['dataValues']['id']) {
                           return element
                        }
                     });


                     let ElearningResultData = ElearningResults[0];
                     if (ElearningResults.length != 0) {

                        if (ElearningResultData['status'] == '3') {
                           ElearningResultTestPassed += 1;
                        } else if (ElearningResultData['status'] == '2') {
                           ElearningResultTestFailed += 1;
                        }

                        ElearningResultTestAttempt += 1;
                     } else {
                        ElearningResultTestNotAttempt += 1;
                     }

                     CurriculumBuilderData[k]['dataValues']['ElearningResult'] = ElearningResultData;
                     TraineeCurriculums[j]['dataValues']['CurriculumBuilder'] = CurriculumBuilderData;
                     TraineeCurriculums[j]['dataValues']['TotalTest'] = TotalTest;
                  }//TotalTest for loop end


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

               } // TraineeCurriculums for loop end

               UnBlockTrainees[i]['dataValues']['TotalCurriculum'] = TotalCurriculum;
               if (CurriculumNotAttempt == TotalCurriculum) {
                  UnBlockTrainees[i]['dataValues']['AllCurriculumNotAttempt'] = true;
                  YetToStart += 1;
               }

               if (CurriculumPass == TotalCurriculum) {
                  UnBlockTrainees[i]['dataValues']['AllCurriculumsPassed'] = true;
                  Completed += 1;
               }

               if (CurriculumAttempt == TotalCurriculum) {
                  UnBlockTrainees[i]['dataValues']['AllCurriculumAttempt'] = true;
                  InProgress += 1;
               }


            } // TraineeCurriculums unblock trainee for loop end

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
               SuccessRatio: Math.round(SuccessRatio),
               // Curriculum: getTraineeCurriculum,
               // CurriculumBuilderData: CurriculumBuilderData,
               // TotalTraineesData: UnBlockTrainees,

            });

         } else {
            res.status(responseCodes.SUCCESS).json({
               response_code: 0,
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
         res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
      }
   }

   async get_company_card3_data(req: Request, res: Response) {
      try {
         let company_id = req.body.company_id;
         let panel_id = req.body.panel_id;

         let seriesData = Array();
         let xAxisData = Array();

         let TraineesData: any = await Trainee.findAll({
            where: {
               company_id: req.body.company_id,
               IsDeleted: 0
            }
         });

         if (TraineesData.length != 0) {
            if (panel_id == 3) {
               const BranchData: any = await SubCompany.findAll({
                  where: {
                     company_id: company_id,
                     IsDeleted: 0
                  }
               });

               if (BranchData.length != 0) {
                  for (let i = 0; i < BranchData.length; i++) {
                     xAxisData[i] = BranchData[i]['name'];


                     let branchTrainees: any = TraineesData.filter((element: any) => {
                        if (element['sub_company_id'] == BranchData[i]['id']) {
                           return element
                        }
                     });

                     seriesData[i] = branchTrainees.length;
                  }
               } else {
                  res.status(responseCodes.SUCCESS).json({
                     response_code: 0,
                     message: responseStrings.NOT
                  });
               }
            }
            else if (panel_id == 2) {
               const DepartmentData: any = await CompanyDepartment.findAll({
                  include: [
                     {
                        model: MasterDepartment,
                        where: {
                           IsDeleted: 0,
                           company_id: company_id
                        }
                     }
                  ],
                  where: {
                     company_id: company_id,
                     IsDeleted: 0
                  }
               });

               if (DepartmentData.length != 0) {
                  for (let i = 0; i < DepartmentData.length; i++) {
                     xAxisData[i] = DepartmentData[i]['MasterDepartment']['name'];

                     let departmentTrainees: any = TraineesData.filter((element: any) => {
                        if (element['department_id'] == DepartmentData[i]['id']) {
                           return element
                        }
                     });

                     seriesData[i] = departmentTrainees.length;
                  }
               } else {
                  res.status(responseCodes.SUCCESS).json({
                     response_code: 0,
                     message: responseStrings.NOT
                  });
               }
            }
            else {
               const TrainerData: any = await Trainer.findAll({
                  where: {
                     company_id: company_id,
                     IsDeleted: 0
                  }
               });

               if (TrainerData.length != 0) {
                  for (let i = 0; i < TrainerData.length; i++) {
                     xAxisData[i] = TrainerData[i]['name'];

                     let trainerTrainees: any = TraineesData.filter((element: any) => {
                        if (element['trainer_id'] == TrainerData[i]['id']) {
                           return element
                        }
                     });

                     seriesData[i] = trainerTrainees.length;
                  }
               } else {
                  res.status(responseCodes.SUCCESS).json({
                     response_code: 0,
                     message: responseStrings.NOT
                  });
               }

            }

            let options = {
               tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                     type: 'cross',
                  },
               },
               grid: {
                  right: '5%',
               },

               xAxis: [
                  {
                     type: 'category',
                     axisTick: {
                        alignWithLabel: true,
                     },
                     // prettier-ignore
                     data: xAxisData,
                     axisLabel: {
                        interval: 0,
                        //rotate: 30 //If the label names are too long you can manage this by rotating the label.
                     }
                  },
               ],
               yAxis: [
                  {
                     type: 'value',
                     name: 'count',
                     min: 0,
                     max: TraineesData.length,
                     position: 'left',
                     axisLine: {
                        show: true,
                     },
                  },
               ],
               series: [
                  {
                     type: 'bar',
                     barMaxWidth: 50,
                     // showBackground: true,
                     data: seriesData,
                  },
               ],
            };

            res.status(responseCodes.SUCCESS).json({
               response_code: 1,
               message: responseStrings.GET,
               echartOption: options
            });
         } else {
            res.status(responseCodes.BAD_REQUEST).json({
               response_code: 0,
               message: responseStrings.NOT
            });
         }


      } catch (error: any) {
         res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
      }

   }

   //* Trainer Perfomance Dashboard Card Report
   async getTrainerPerfomance(req: Request, res: Response) {
      try {
         const TraineesData: any = await Trainee.findAll({
            include: [
               {
                  model: TraineeCurriculum,
                  where: {
                     IsDeleted: 0,
                     IsBlock: 0
                  }
               }
            ],
            where: {
               IsDeleted: 0,
               trainer_id: req.body.trainer_id
            }
         });

         if (TraineesData.length != 0) {

            let Completed = 0;
            let InProgress = 0;

            let LastDay0TraineeCount = 0;
            let LastDay1TraineeCount = 0;
            let LastDay2TraineeCount = 0;
            let LastDay3TraineeCount = 0;
            let lastDay0 = moment().subtract(0, 'day').format('YYYY-MM-DD');
            let lastDay1 = moment().subtract(1, 'day').format('YYYY-MM-DD');
            let lastDay2 = moment().subtract(2, 'day').format('YYYY-MM-DD');
            let lastDay3 = moment().subtract(3, 'day').format('YYYY-MM-DD');

            //Get TraineesId by Filter
            let TraineesId = Array();
            TraineesData.filter((element: any) => {
               TraineesId.push(element['id'])
            });


            //* Get Curriculums By Trainees
            let getTraineeCurriculum: any = await TraineeCurriculum.findAll({
               where: {
                  trainee_id: TraineesId, //? In Query of Trainees
                  IsDeleted: 0
               },
               group: ['curriculum_id']
            });

            //* Get Curriculums Ids for IN Query
            let TraineeCurriculumId = Array();
            getTraineeCurriculum.filter((element: any) => {
               TraineeCurriculumId.push(element['curriculum_id']);
            });

            //Get Curriculum Builder by Curriculums Ids
            let CurriculumBuilderData1: any = await CurriculumBuilder.findAll({
               where: {
                  curriculum_id: TraineeCurriculumId,
                  IsDeleted: 0
               }
            });

            let ElearningResultData1 = await ElearningResult.findAll({
               where: {
                  IsDeleted: 0,
                  trainee_id: TraineesId
               },
               order: [['attempt_no', 'DESC']]
            })

            for (let i = 0; i < TraineesData.length; i++) {

               let TraineeCurriculums = TraineesData[i]['dataValues']['TraineeCurriculums'];
               let TotalCurriculum = TraineeCurriculums.length;
               let CurriculumNotAttempt = 0;
               let CurriculumAttempt = 0;
               let CurriculumPass = 0;

               let LastDay0CurriculumCount = 0;
               let LastDay1CurriculumCount = 0;
               let LastDay2CurriculumCount = 0;
               let LastDay3CurriculumCount = 0;


               for (let j = 0; j < TraineeCurriculums.length; j++) {

                  // Curriculum Builder Filter to get Particulur Trainees Curriculum Test Module 
                  let CurriculumBuilderData: any = CurriculumBuilderData1.filter((element: any) => {
                     if (element['curriculum_id'] == TraineeCurriculums[j]['dataValues']['curriculum_id']) {
                        return element
                     }
                  });

                  let TotalTest = CurriculumBuilderData.length;
                  let ElearningResultTestNotAttempt = 0;
                  let ElearningResultTestAttempt = 0;
                  let ElearningResultTestPassed = 0;
                  let ElearningResultTestFailed = 0;


                  let LastDay0TestCount = 0;
                  let LastDay1TestCount = 0;
                  let LastDay2TestCount = 0;
                  let LastDay3TestCount = 0;

                  for (let k = 0; k < TotalTest; k++) {

                     // Get Elearning Results
                     let ElearningResults: any = ElearningResultData1.filter((element: any) => {
                        if (element['dataValues']['curriculum_test_id'] == CurriculumBuilderData[k]['dataValues']['curriculum_parent_category_test_id'] &&
                           element['dataValues']['trainee_id'] == TraineesData[i]['dataValues']['id']) {
                           return element
                        }
                     });



                     let ElearningResultData = ElearningResults[0];
                     if (ElearningResults.length != 0) {

                        if (ElearningResultData['status'] == '3') { //check Passed 

                           ElearningResultTestPassed += 1;

                           // lastDay0
                           if (moment(ElearningResultData['dataValues']['createdAt']).format('YYYY-MM-DD') == lastDay0) {
                              LastDay0TestCount += 1;
                           }

                           // lastDay1
                           if (moment(ElearningResultData['dataValues']['createdAt']).format('YYYY-MM-DD') == lastDay1) {
                              LastDay1TestCount += 1;
                           }

                           // lastDay2
                           if (moment(ElearningResultData['dataValues']['createdAt']).format('YYYY-MM-DD') == lastDay2) {
                              LastDay2TestCount += 1;
                           }

                           // lastDay3
                           if (moment(ElearningResultData['dataValues']['createdAt']).format('YYYY-MM-DD') == lastDay3) {
                              LastDay3TestCount += 1;
                           }

                        } else if (ElearningResultData['status'] == '2') { // check failed
                           ElearningResultTestFailed += 1;
                        }
                        ElearningResultTestAttempt += 1;
                     } else {
                        ElearningResultTestNotAttempt += 1;
                     }


                     CurriculumBuilderData[k]['dataValues']['ElearningResult'] = ElearningResultData;
                     TraineeCurriculums[j]['dataValues']['CurriculumBuilder'] = CurriculumBuilderData;
                     TraineeCurriculums[j]['dataValues']['TotalTest'] = TotalTest;
                  } //TotalTest for loop end

                  if (ElearningResultTestPassed == TotalTest) {
                     TraineeCurriculums[j]['dataValues']['AllCurriculumsTestPassed'] = true;
                     CurriculumPass += 1;

                     let LastDayAttempt = false;
                     let LastAttemptBit = 0;
                     if (LastDay3TestCount >= 1) {
                        LastDayAttempt = true;
                        LastAttemptBit = 3;
                     }
                     if (LastDay2TestCount >= 1) {
                        LastDayAttempt = true;
                        LastAttemptBit = 2;
                     }
                     if (LastDay1TestCount >= 1) {
                        LastDayAttempt = true;
                        LastAttemptBit = 1;
                     }

                     if (LastDay0TestCount >= 1) {
                        LastDayAttempt = true;
                        LastAttemptBit = 0;
                     }

                     if (LastDayAttempt == true && LastAttemptBit == 1) {
                        LastDay1CurriculumCount += 1;
                     }

                     if (LastDayAttempt == true && LastAttemptBit == 2) {
                        LastDay2CurriculumCount += 1;
                     }

                     if (LastDayAttempt == true && LastAttemptBit == 3) {
                        LastDay3CurriculumCount += 1;
                     }

                  }

                  if (ElearningResultTestAttempt > 0 && ElearningResultTestAttempt <= TotalTest && ElearningResultTestPassed != TotalTest) {
                     TraineeCurriculums[j]['dataValues']['AllCurriculumsTestAttempt'] = true;
                     CurriculumAttempt += 1;
                  }


               } //TraineeCurriculums for loop end

               TraineesData[i]['dataValues']['TotalCurriculum'] = TotalCurriculum;

               if (CurriculumPass == TotalCurriculum) {
                  TraineesData[i]['dataValues']['AllCurriculumsPassed'] = true;
                  Completed += 1;
                  if (CurriculumPass == LastDay1CurriculumCount) {
                     LastDay1TraineeCount += 1;
                  }

                  if (CurriculumPass == LastDay2CurriculumCount) {
                     LastDay2TraineeCount += 1;
                  }

                  if (CurriculumPass == LastDay3CurriculumCount) {
                     LastDay3TraineeCount += 1;
                  }

               }

               if (CurriculumAttempt == TotalCurriculum) {
                  TraineesData[i]['dataValues']['AllCurriculumAttempt'] = true;
                  InProgress += 1;
               }


            } // TraineesData for loop end

            let SuccessRatio = (Completed / TraineesData.length) * 100;


            res.status(responseCodes.SUCCESS).json({
               response_code: 1,
               message: responseStrings.GET,
               AssignTrainees: TraineesData.length,
               InProgress: InProgress,
               Completed: Completed,
               SuccessRatio: Math.round(SuccessRatio),
               Last3DaysPerfomance: {
                  Last1DayDate: lastDay1,
                  Last1DayCount: LastDay1TraineeCount,
                  Last2DayDate: lastDay2,
                  Last2DayCount: LastDay2TraineeCount,
                  Last3DayDate: lastDay3,
                  Last3DayCount: LastDay3TraineeCount,
               }
               // TraineesData: TraineesData
            });


         } else {
            res.status(responseCodes.SUCCESS).json({
               response_code: 0,
               message: "Oops! Trainees not assign yet.",
               assignTrainees: 0,
               InProgress: 0,
               Completed: 0,
               SuccessRatio: 0
            });
         }


      } catch (error: any) {
         res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
      }
   }

   async getTraineeSimulatorConsolidatedReport(req: Request, res: Response) {
      try {

         let test_array = ["Reaction Time Test", "Driving Aptitude Test", "Anticipation Test", "Judgement Test", "Color Blindness Test", "Vision Test"];
         let AllReport = Array();

         for (let t = 0; t < test_array.length; t++) {
            await ClinicalPerformance.findAll({
               include: [{
                  model: Trainer,
                  attributes: ['name', 'email']
               }],
               where: {
                  IsDeleted: 0,
                  trainee_enrollmentId: req.body.enrollmentId,
                  ModuleCT: test_array[t]
               },
               order: [['id', 'DESC'],],
            }).then(async (ClinicalPerformanceData: any) => {

               if (ClinicalPerformanceData.length != 0) {
                  ClinicalPerformanceData = ClinicalPerformanceData[0];

                  let ResponseAccuracy: any = {
                     "C": "Correct",
                     "I": "In Correct",
                     "NA": "Not Attempted",
                     "H": "Crashed"
                  }
                  if (ClinicalPerformanceData['ModuleCT'] == "Reaction Time Test") {
                     let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                     var FaultsCTArray = FaultsCT.split(",");
                     let FaultsCTData = Array();
                     for (let i = 0; i < FaultsCTArray.length; i++) {
                        let tempFaultsCT = FaultsCTArray[i].split("-");
                        FaultsCTData.push({
                           Attempts: i + 1,
                           ResponseTime: tempFaultsCT[0],
                           ResponseAccuracy: tempFaultsCT[1],
                           Status: ResponseAccuracy[tempFaultsCT[1]],
                        });
                     }

                     AllReport.push({
                        ModuleCT: ClinicalPerformanceData['ModuleCT'],
                        data: ClinicalPerformanceData,
                        FaultsCTData: FaultsCTData
                     })
                  }
                  else if (ClinicalPerformanceData['ModuleCT'] == "Driving Aptitude Test") {
                     let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                     var FaultsCTArray = FaultsCT.split(",");
                     let FaultsCTData = Array();
                     for (let i = 0; i < FaultsCTArray.length; i++) {
                        let tempFaultsCT = FaultsCTArray[i].split("-");
                        FaultsCTData.push({
                           Attempts: i + 1,
                           ResponseTime: tempFaultsCT[0],
                           ResponseAccuracy: tempFaultsCT[1],
                           Status: ResponseAccuracy[tempFaultsCT[1]],
                        });
                     }

                     AllReport.push({
                        ModuleCT: ClinicalPerformanceData['ModuleCT'],
                        data: ClinicalPerformanceData,
                        FaultsCTData: FaultsCTData
                     })
                  }
                  else if (ClinicalPerformanceData['ModuleCT'] == "Color Blindness Test") {
                     let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                     var FaultsCTArray = FaultsCT.split("-");
                     let outof = ['1', '3', '3', '3'];
                     let name = ['General', 'Red-Green', 'Blue-Yellow', 'Total Colour Blindness'];
                     let FaultsCTData = Array();

                     for (let i = 0; i < FaultsCTArray.length; i++) {
                        FaultsCTData.push({
                           name: name[i],
                           value: FaultsCTArray[i],
                           outof: outof[i],
                        });
                     }

                     AllReport.push({
                        ModuleCT: ClinicalPerformanceData['ModuleCT'],
                        data: ClinicalPerformanceData,
                        FaultsCTData: FaultsCTData
                     })

                  }
                  else if (ClinicalPerformanceData['ModuleCT'] == "Judgement Test") {
                     let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                     var FaultsCTArray = FaultsCT.split("-");
                     let FaultsCTData = {};

                     FaultsCTData = {
                        Total_hits: FaultsCTArray[0],
                        LS: FaultsCTArray[0],
                        RS: FaultsCTArray[0],
                     };


                     AllReport.push({
                        ModuleCT: ClinicalPerformanceData['ModuleCT'],
                        data: ClinicalPerformanceData,
                        FaultsCTData: FaultsCTData
                     })

                  }
                  else if (ClinicalPerformanceData['ModuleCT'] == "Vision Test") {
                     let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                     let FaultsCTData = {};

                     FaultsCTData = {
                        score: FaultsCT.substr(2) + '/' + '7',
                        RemarksCT: ClinicalPerformanceData['RemarksCT']
                     };


                     AllReport.push({
                        ModuleCT: ClinicalPerformanceData['ModuleCT'],
                        data: ClinicalPerformanceData,
                        FaultsCTData: FaultsCTData
                     })

                  }
                  else if (ClinicalPerformanceData['ModuleCT'] == "Anticipation Test") {
                     let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                     var FaultsCTArray = FaultsCT.split(",");
                     let FaultsCTData = Array();
                     for (let i = 0; i < FaultsCTArray.length; i++) {
                        let tempFaultsCT = FaultsCTArray[i];

                        if (tempFaultsCT == 'NA') {
                           FaultsCTData.push({
                              attempts: i + 1,
                              value: tempFaultsCT,
                              accurracy: '-'
                           });
                        } else if (tempFaultsCT >= 0 && tempFaultsCT <= 2) {
                           FaultsCTData.push({
                              attempts: i + 1,
                              value: tempFaultsCT,
                              accurracy: 'Ideal Zone'
                           });
                        } else if (tempFaultsCT > 2) {
                           FaultsCTData.push({
                              attempts: i + 1,
                              value: tempFaultsCT,
                              accurracy: 'Underrun'
                           });
                        } else if (tempFaultsCT < 0) {
                           FaultsCTData.push({
                              attempts: i + 1,
                              value: tempFaultsCT,
                              accurracy: 'Overrun'
                           });
                        }

                     }


                     AllReport.push({
                        ModuleCT: ClinicalPerformanceData['ModuleCT'],
                        data: ClinicalPerformanceData,
                        FaultsCTData: FaultsCTData
                     })
                  }

               }


            }).catch((err: any) => {
               res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            });
         }

         if (AllReport.length != 0) {

            res.status(responseCodes.SUCCESS).json({
               response_code: 1,
               Report: AllReport
            });
         } else {
            res.status(responseCodes.SUCCESS).json({
               response_code: 0,
               message: "Does not generate any test Report!"
            });
         }

      } catch (error: any) {
         res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
      }
   }

   async getTraineeElearingConsolidatedReport(req: Request, res: Response) {
      try {
         await TraineeCurriculum.findAll({
            include: [{
               model: Curriculum,
               where: {
                  IsDeleted: 0
               },
               attributes:['id','company_id','name']
            }],
            where: {
               IsDeleted: 0,
               trainee_id: req.body.trainee_id,
               technology_id: 1
            },
            attributes:['id','trainee_id','language_id','curriculum_id','technology_id']
         }).then(async(TraineeCurriculumData: any) => {

            // console.log("TraineeCurriculumData->",TraineeCurriculumData[0]['dataValues']);

            for(let i=0;i<TraineeCurriculumData.length;i++){

               await CurriculumBuilder.findAll({
                  include:[{
                     model:CurriculumParentCategoryTest,
                     include: [
                        {
                            model: ElearningResult,
                            include:[{
                               model:ElearningStatus,
                                attributes:['id','status']
                            }],
                            required: false,
                            limit: 1,
                            order: [['attempt_no', 'DESC']],
                            where: {trainee_id: req.body.trainee_id,test_start:1},
                            attributes:{exclude:['created_by','updated_by','deleted_by','updatedAt','deletedAt','IsBlock','IsDeleted']}
                        }],
                     where:{
                        technology_type_id:TraineeCurriculumData[i]['technology_id'],
                        language_id:TraineeCurriculumData[i]['language_id'],
                     },
                     attributes:['id','prefix','title','description','parent_id','technology_type_id','language_id']
                  }],
                  where:{
                     curriculum_id:TraineeCurriculumData[i]['curriculum_id'],
                     IsDeleted:0
                  },
                  attributes:['id','curriculum_id','curriculum_parent_category_id','curriculum_parent_category_test_id','passing_marks','total_marks','attempts']
               }).then(async(CurriculumBuilderData: any) => {

                  let TestObj=Array();

                  for(let j=0;j<CurriculumBuilderData.length;j++){
                     let ElearningResult=CurriculumBuilderData[j]['dataValues']['CurriculumParentCategoryTest']['ElearningResults'];
                     if(ElearningResult.length!=0){
                        let score=ElearningResult[0]['score'];
                        let total_marks=CurriculumBuilderData[j]['dataValues']['total_marks'];

                        TestObj.push({
                           prefix:CurriculumBuilderData[j]['dataValues']['CurriculumParentCategoryTest']['prefix'],
                           title:CurriculumBuilderData[j]['dataValues']['CurriculumParentCategoryTest']['title'],
                           passing_marks:CurriculumBuilderData[j]['dataValues']['passing_marks'],
                           total_marks:CurriculumBuilderData[j]['dataValues']['total_marks'],
                           attempts:CurriculumBuilderData[j]['dataValues']['attempts'],
                           percentage:Math.round((score/total_marks)*100),
                           score:score,
                           trainee_attempt:ElearningResult[0]['attempt_no'],
                           trainee_test_status:ElearningResult[0]['ElearningStatus']['status'],
                        });
                     }else{

                        TestObj.push({
                           prefix:CurriculumBuilderData[j]['dataValues']['CurriculumParentCategoryTest']['prefix'],
                           title:CurriculumBuilderData[j]['dataValues']['CurriculumParentCategoryTest']['title'],
                           passing_marks:CurriculumBuilderData[j]['dataValues']['passing_marks'],
                           total_marks:CurriculumBuilderData[j]['dataValues']['total_marks'],
                           attempts:CurriculumBuilderData[j]['dataValues']['attempts'],
                           percentage:'NA',
                           score:'NA',
                           trainee_attempt:'NA',
                           trainee_test_status:'yet to start',
                        });

                     }

                  }


                  TraineeCurriculumData[i]['dataValues']['CurriculumBuilderData']=TestObj;
               }).catch((err: any) => {
                  res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
               });
            }

            if(TraineeCurriculumData.length!=0){
               res.status(responseCodes.SUCCESS).json({
                  response_code: 1,
                  Report: TraineeCurriculumData
               });
            }else{
               res.status(responseCodes.SUCCESS).json({
                  response_code: 0,
                  Report: TraineeCurriculumData
               });
            }

         }).catch((err: any) => {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
         });
      } catch (error: any) {
         res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
      }
   }
}

export default new ReportsController();