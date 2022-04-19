import { Request, Response } from "express";
import moment from "moment";
import { Op } from "sequelize";
import ClinicalPerformance from "../../../core/model/driving/stimulator/clinical/clinicalperformance.model";
import ElearningResult from "../../../core/model/elearning/eLearningresult.model";
import ElearningStatus from "../../../core/model/elearning/elearning_status.model";
import CompanyDepartment from "../../../core/model/root/company_department.model";
import Curriculum from "../../../core/model/root/curriculum.model";
import CurriculumBuilder from "../../../core/model/root/curriculumbuilder.model";
import CurriculumParentCategoryTest from "../../../core/model/root/curriculum_parent_category_test.model";
import MasterDepartment from "../../../core/model/root/master_department.model";
import Trainee from "../../../core/model/root/trainee.model";
import TraineeCurriculum from "../../../core/model/root/trainee_curriculum.model";
import Trainer from "../../../core/model/root/trainer.model";
import Users from "../../../core/model/root/users.model";
import responseCodes from "../../../core/strings/response-codes";
import responseStrings from "../../../core/strings/response-strings";

class BranchAdminController {
  //TODO Department Management
  async get_assigned_department(req: Request, res: Response) {
    try {
      var where = {
        sub_company_id: req.body.sub_company_id,
        company_id: req.body.company_id,
        IsDeleted: 0,
        IsBlock: 0,
      };

      await CompanyDepartment.findAll({
        attributes: [
          "id",
          "login_table_id",
          "name",
          "contactNumber",
          "designation",
          "email",
        ],
        include: [
          {
            model: Users,
            required: true,
            attributes: ["id", "email", "portal_language"],
          },
          {
            model: MasterDepartment,
            attributes: ["name", "descripition"],
            required: true,
          },
        ],
        where: where,
        order:[["id","DESC"]]
      })
        .then((data) => {
          if (data.length != 0) {
            res.status(responseCodes.SUCCESS).json({
              response_code: 1,
              message: "data have been fetched successfully.",
              data: data,
            });
          } else {
            res.status(responseCodes.SUCCESS).json({
              response_code: 0,
              message:
                "No data were found, Department have not been assigned to this branch",
              data: data,
            });
          }
        })
        .catch((err) => {
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: "Oops! " + err.message,
          });
        });
    } catch (err: any) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: "Oops! " + err.message });
    }
  }

  async get_assigned_trainer_with_department(req: Request, res: Response) {
    try {
      await Trainer.findAll({
        attributes: {
          exclude: [
            "password",
            "updated_by",
            "created_by",
            "deleted_by",
            "createdAt",
            "updatedAt",
            "deletedAt",
            "IsDeleted",
            "IsBlock",
          ],
        },
        include: [
          {
            attributes: ["id", "name", "designation"],
            required: false,
            model: CompanyDepartment,
            include: [
              {
                model: MasterDepartment,
                attributes: ["id", "name", "descripition"],
              },
            ],
          },
        ],
        where: {
          sub_company_id: req.body.sub_company_id,
          company_id: req.body.company_id,
          IsBlock: 0,
          IsDeleted: 0,
        },
        order:[["id","DESC"]]
      })
        .then((trainerData) => {
          if (trainerData.length != 0) {
            res.status(responseCodes.SUCCESS).json({
              response_code: 1,
              message: "data have been fetched successfully.",
              data: trainerData,
            });
          } else {
            res.status(responseCodes.SUCCESS).json({
              response_code: 0,
              message:
                "No data were found, Trainer have not been assigned to this branch",
              data: trainerData,
            });
          }
        })
        .catch((err) => {
          res
            .status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message: "Oops! " + err.message });
        });
    } catch (err: any) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: "Oops! " + err.message });
    }
  }

  async assign_trainer_to_department(req: Request, res: Response) {
    try {
      var company_id = req.body.company_id;
      var branch_id = req.body.sub_company_id;
      var department_id = req.body.department_id;
      var trainer_id = req.body.trainer_id;

      var changeTraineeDepartment = req.body.change_trainee_department_bit;
      var updateData = {
        department_id: department_id,
      };

      var where = {
        id: trainer_id,
        company_id: company_id,
        sub_company_id: branch_id,
      };

      await Trainer.update({ ...updateData }, { where: where })
        .then(async (trainerupdateDone) => {
          //TODO CHANGE

          if (changeTraineeDepartment == 1) {
            var updateTraineeData = {
              sub_company_id: branch_id,
              department_id: department_id,
            };

            var where = {
              company_id: company_id,
              trainer_id: trainer_id,
            };

            await Trainee.update({ ...updateTraineeData }, { where: where })
              .then((success) => {
                res
                  .status(responseCodes.SUCCESS)
                  .json({
                    response_code: 1,
                    message: "Trainer assigned to department successfully.",
                  });
              })
              .catch((err) => {
                res
                  .status(responseCodes.INTERNAL_SERVER_ERROR)
                  .json({ response_code: 0, message: "Oops! " + err.message });
              });
          } else {
            res
              .status(responseCodes.SUCCESS)
              .json({
                response_code: 1,
                message: "Trainer assigned to department successfully.",
              });
          }
        })
        .catch((err) => {
          res
            .status(responseCodes.INTERNAL_SERVER_ERROR)
            .json({ response_code: 0, message: "Oops! " + err.message });
        });
    } catch (err: any) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: "Oops! " + err.message });
    }
  }

  //TODO Trainer Management

  async get_assigned_trainer(req: Request, res: Response) {
    
      try {
        await Trainer.findAll({
          attributes: {
            exclude: [
              "password",
              "updated_by",
              "created_by",
              "deleted_by",
              "createdAt",
              "updatedAt",
              "deletedAt",
              "IsDeleted",
              "IsBlock",
            ],
          },
          where: {
            company_id: req.body.company_id,
            sub_company_id: req.body.sub_company_id,
            IsBlock: 0,
            IsDeleted: 0,
          },
          order:[["id","DESC"]]
        })
          .then((trainerData) => {
            if (trainerData.length != 0) {
              res.status(responseCodes.SUCCESS).json({
                response_code: 1,
                message: "data have been fetched successfully.",
                data: trainerData,
              });
            } else {
              res.status(responseCodes.SUCCESS).json({
                response_code: 0,
                message:
                  "No data were found, Trainer have not been assigned to this branch",
                data: trainerData,
              });
            }
          })
          .catch((err) => {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message: "Oops! " + err.message });
          });
      } catch (err: any) {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: "Oops! " + err.message });
      }
   
  }

  //this Function will get All Assigned and Not Assigned Trainee OF Trainer
  async get_trainee_assigned_to_trainer_and_not_assigned(req: Request, res: Response) {
    try {
      try {

        var trainer_id=req.body.trainer_id;
        var company_id=req.body.company_id;
        var sub_company_id=req.body.sub_company_id;

        await Trainee.findAll({
            attributes:["id","first_name" ,"last_name","trainer_id"],
            where:{
                [Op.or]:[{trainer_id:trainer_id},{trainer_id:0}],
                company_id:company_id,
                sub_company_id:sub_company_id,
                IsBlock:0,
                IsDeleted:0
            },
            order:[["id","DESC"]]
        }).then((result:any)=>{

            if(result.length != 0)
            {
                for(let i=0;i<result.length;i++)
                {
                   
                    if(result[i]["trainer_id"] == 0 || result[i]["trainer_id"] == null)
                    {
                        result[i]["dataValues"]["assign"]=false;
                    }
                    else
                    {
                        result[i]["dataValues"]["assign"]=true;
                    }
                }
                res
                .status(responseCodes.SUCCESS)
                .json({ response_code: 1, message: "trainee fetched successfully.",data:result});
            }
            else
            {
                res
                .status(responseCodes.SUCCESS)
                .json({ response_code: 0, message: "Oops! No Trainee Found.",data:result});
            }

        }).catch(err=>{
            res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: "Oops! " + err.message });
        });

        
      } catch (err: any) {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: "Oops! " + err.message });
      }
    } catch (err: any) {
      res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: "Oops! " + err.message });
    }
  }

  async assign_trainee(req: Request, res: Response)
  {
      try
      {
          var updateJSON=JSON.parse(req.body.updateData);
        
          for(let i=0;i<updateJSON.length;i++)
          {
            var trainee_id=updateJSON[i]["id"];
             if(updateJSON[i]["trainer_id"] == 0)
             {
               var update={
                  trainer_id:updateJSON[i]["trainer_id"]
              }
              
              await Trainee.update({...update},{where:{id:trainee_id}}).then(res=>{

              }).catch(err=>{
                res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: "Oops! " + err.message });
              });
             }
             else
             {
                await Trainer.findOne({
                   where:{id:updateJSON[i]["trainer_id"]}
                }).then(async (getTrainer:any)=>{
                   var sub_company_id=getTrainer["sub_company_id"];
                   var department_id=getTrainer["department_id"];

                   var update={
                     trainer_id:updateJSON[i]["trainer_id"],
                     sub_company_id:sub_company_id,
                     department_id:department_id}

                     await Trainee.update({...update},{where:{id:trainee_id}}).then(res=>{

                     }).catch(err=>{
                       res
                       .status(responseCodes.INTERNAL_SERVER_ERROR)
                       .json({ response_code: 0, message: "Oops! " + err.message });
                     });

                }).catch(err=>{
                  res
                  .status(responseCodes.INTERNAL_SERVER_ERROR)
                  .json({ response_code: 0, message: "Oops! " + err.message });
                })
             }
              
          }

          res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Operation updated successfully" });


      }
      catch(err:any)
      {
        res
        .status(responseCodes.INTERNAL_SERVER_ERROR)
        .json({ response_code: 0, message: "Oops! " + err.message });
      }
  }

  //TODO Trainee Management
  async get_branch_assign_trainee(req: Request, res: Response)
  {
    try {
        await Trainee.findAll({
          attributes: [
           "id","enrollmentId","first_name","last_name","email","contact"
          ],
          include:[{
              model:Trainer,
              attributes:["id","name"],
              required:false,
              where:{
                  IsBlock:0,
                  IsDeleted:0
              }
          }],
          where: {
            company_id: req.body.company_id,
            sub_company_id: req.body.sub_company_id,
            IsBlock: 0,
            IsDeleted: 0,
          },
          order:[["id","DESC"]]
        })
          .then((trainerData) => {
            if (trainerData.length != 0) {
              res.status(responseCodes.SUCCESS).json({
                response_code: 1,
                message: "data have been fetched successfully.",
                data: trainerData,
              });
            } else {
              res.status(responseCodes.SUCCESS).json({
                response_code: 0,
                message:
                  "No data were found, Trainer have not been assigned to this branch",
                data: trainerData,
              });
            }
          })
          .catch((err) => {
            res
              .status(responseCodes.INTERNAL_SERVER_ERROR)
              .json({ response_code: 0, message: "Oops! " + err.message });
          });
      } catch (err: any) {
        res
          .status(responseCodes.INTERNAL_SERVER_ERROR)
          .json({ response_code: 0, message: "Oops! " + err.message });
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
                          order: [['id', 'DESC']],
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
                         trainee_test_status:'Yet to Start',
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

 //TODO DASHBOARD

 async getTrainerPerfomance(req: Request, res: Response) 
 {
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
           message: "Trainer progress fetched successfully.",
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

  //* Trainee Trainning Progress Dashboard Card1 Report
  async getTraineeTrainingReport(req: Request, res: Response) {
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

  async getDashboardCount(req: Request, res: Response)
  {
    try
    {
        var company_id=req.body.company_id;
        var sub_company_id=req.body.sub_company_id;

        var trainee_count=0;
        var trainer_count=0;
        var department_count=0;

        await Trainee.count({
          where:{
            company_id:company_id,
            sub_company_id:sub_company_id,
            IsBlock:0,
            IsDeleted:0
          }
        }).then(count=>{
          trainee_count = count;
        }).catch(error=>{
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });

        });

        await Trainer.count({
          where:{
            company_id:company_id,
            sub_company_id:sub_company_id,
            IsBlock:0,
            IsDeleted:0
          }
        }).then(count=>{
          trainer_count = count;
        }).catch(error=>{
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });

        });

        await CompanyDepartment.count({
          where:{
            company_id:company_id,
            sub_company_id:sub_company_id,
            IsBlock:0,
            IsDeleted:0
          }
        }).then(count=>{
          department_count = count;
        }).catch(error=>{
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });

        });

        res.status(responseCodes.SUCCESS).json({
          response_code: 1, 
          message: "Data fetched successfully",
          trainee_count:trainee_count,
          trainer_count:trainer_count,
          department_count:department_count
        });



    }
    catch(err:any)
    {

    }
  }


}

export default new BranchAdminController();
