
import express, { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import ClinicalPerformance from "../../../../core/model/driving/stimulator/clinical/clinicalperformance.model";
import ElearningResult from "../../../../core/model/elearning/eLearningresult.model";
import CurriculumBuilder from "../../../../core/model/root/curriculumbuilder.model";
import CurriculumParentCategoryTest from "../../../../core/model/root/curriculum_parent_category_test.model";
import TechnologyCategory from "../../../../core/model/root/technology.model";
import Trainee from "../../../../core/model/root/trainee.model";
import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import Users from "../../../../core/model/root/users.model";
import responseCodes from "../../../../core/strings/response-codes";

//TODO THIS FILE CREATED TOTALLY FOR TRAINEE DASHBOARD API FOR ELEARNING 
class TraineeDashboard {

   async getCompleteRatioOfCourse(req: Request, res: Response) {
      try {

         await TraineeCurriculum.findAll({
            where: {
               IsDeleted: 0,
               IsBlock: 0,
               trainee_id: req.body.trainee_id
            }
         }).then(async (TraineeCurriculumData: any) => {

            if (TraineeCurriculumData.length != 0) {

               let ModuleTest = Array();

               for (let i = 0; i < TraineeCurriculumData.length; i++) {

                  await CurriculumBuilder.findAll({
                     include: [{
                        required: true,
                        model: CurriculumParentCategoryTest,
                        where: {
                           IsDeleted: 0,
                           language_id: TraineeCurriculumData[i]['language_id'],
                           technology_type_id: TraineeCurriculumData[i]['technology_id'],
                        }
                     }],
                     where: {
                        IsDeleted: 0,
                        curriculum_id: TraineeCurriculumData[i]['curriculum_id']
                     }
                  }).then(async (CurriculumBuilderData: any) => {



                     for (let j = 0; j < CurriculumBuilderData.length; j++) {
                        ModuleTest.push(CurriculumBuilderData[j]['CurriculumParentCategoryTest']);
                     }




                  }).catch((err: any) => {
                     res.status(responseCodes.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                  })
               }

               let ResultTestPassed = 0;

               let technologysData = Array();

               await TraineeCurriculum.findAll({
                  include: [{
                     model: TechnologyCategory,
                     attributes: ['id', 'name'],
                     where: { IsDeleted: 0 }
                  }],
                  where: {
                     trainee_id: req.body.trainee_id,
                     IsBlock: 0,
                     IsDeleted: 0
                  },
                  attributes: ['TechnologyCategory.name'],
                  group: ['TraineeCurriculum.technology_id']
               }).then((techData: any) => {
                  if (techData.length != 0) {

                     for (let t = 0; t < techData.length; t++) {
                        technologysData.push(techData[t]['TechnologyCategory']);
                     }


                  }
                  else {
                     res
                        .status(responseCodes.SUCCESS)
                        .json({ response_code: 0, message: "Oops! no curriculum has been alloted to you." });
                  }

               }, err => {
                  res
                     .status(responseCodes.INTERNAL_SERVER_ERROR)
                     .json({ response_code: 0, message: "Oops! " + err.message });
               });


               let ElearningTestComplete = 0;
               let SimulatorTestComplete = 0;
               let ArTestComplete = 0;
               let VrTestComplete = 0;
               let InstructorLedTestComplete = 0;

               for (let k = 0; k < ModuleTest.length; k++) {


                  if (ModuleTest[k]['technology_type_id'] == 1) {  //E-Learning
                     await ElearningResult.findAll({
                        where: {
                           trainee_id: req.body.trainee_id,
                           curriculum_test_id: ModuleTest[k]['id'],
                           IsDeleted: 0,
                           IsBlock: 0,
                           test_start: 1
                        },
                        order: [['attempt_no', 'DESC']]
                     }).then((ElearningResultData: any) => {
                        if (ElearningResultData.length != 0) {
                           if (ElearningResultData[0]['status'] == '3') {
                              ResultTestPassed += 1;
                              ElearningTestComplete += 1;
                           }
                        }

                     }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR)
                           .json({ response_code: 0, message: "Oops! " + err.message });
                     })
                  } else if (ModuleTest[k]['technology_type_id'] == 2) {  //Simulator

                     await ClinicalPerformance.findOne({
                        where: {
                           trainee_enrollmentId:req.body.enrollment_Id,
                           IsDeleted:0,
                           ModuleCT: ModuleTest[k]['title'],
                           ResultCT: {
                              [Op.or]: ['Good', 'Average', 'Normal', 'Optimal']
                           }
                        },
                        // logging:console.log
                     }).then((ClinicalPerformanceData: any) => {
                        if (ClinicalPerformanceData != null) {
                           ResultTestPassed += 1;
                           SimulatorTestComplete += 1;
                        }
                     }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR)
                           .json({ response_code: 0, message: "Oops! " + err.message });
                     })

                  }
               }

               //E-Learning Test Data
               let ElearningTestData: any = ModuleTest.filter((element: any) => {
                  if (element['technology_type_id'] == 1) {
                     return element
                  }
               });

               //Simulator Test Data
               let SimulatorTestData: any = ModuleTest.filter((element: any) => {
                  if (element['technology_type_id'] == 2) {
                     return element
                  }
               });

               let CourseData=Array();
               for (let t = 0; t < technologysData.length; t++) {
                  if(technologysData[t]['id']==1){
                     CourseData.push({
                        technologys_id:technologysData[t]['id'],
                        technologys_name:technologysData[t]['name'],
                        total_test:ElearningTestData.length,
                        completed_test:ElearningTestComplete
                     });
                  }else if(technologysData[t]['id']==2){
                     CourseData.push({
                        technologys_id:technologysData[t]['id'],
                        technologys_name:technologysData[t]['name'],
                        total_test:SimulatorTestData.length,
                        completed_test:SimulatorTestComplete
                     });
                  }

               }

               let ProgressRatio = (ResultTestPassed / ModuleTest.length) * 100;


               res.status(responseCodes.SUCCESS)
                  .json({ response_code: 1, ProgressRatio: Math.round(ProgressRatio), courseData: CourseData });
            }







         }).catch((err: any) => {
            res.status(responseCodes.INTERNAL_SERVER_ERROR)
               .json({ response_code: 0, message: "Oops! " + err.message });
         })
      }
      catch (err: any) {
         res.status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message: "Oops! " + err.message });
      }
   }
}


export default new TraineeDashboard();