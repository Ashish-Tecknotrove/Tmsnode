import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');

import Trainee from "../../../../core/model/root/trainee.model";
import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import Users from "../../../../core/model/root/users.model";
import Curriculum from "../../../../core/model/root/curriculum.model";
import Assign_trainee_to_trainer from "../../../../core/model/root/assign_trainee_to_trainer.model";
import Languages from "../../../../core/model/language/language.model";
import TechnologyCategory from "../../../../core/model/root/technology.model";
import CurriculumBuilder from "../../../../core/model/root/curriculumbuilder.model";
import CurriculumParentCategoryTest from "../../../../core/model/root/curriculum_parent_category_test.model";
import TraineeRemarks from "../../../../core/model/root/trainee_remark.model";

class TraineeController {

    //!TODO FUNCTION USED TO GET ASSIGN TRAINEE TO TRAINER 
    async getAssignTraineeOfTrainer(req: Request, res: Response) 
    {
        try {
            await Assign_trainee_to_trainer.findAll({
                include: [{
                    model: Trainee,
                    required: false,
                    where: {
                        IsDeleted: 0,
                    },
                    include: [{
                        model: Users,
                        required: false,
                        where: {
                            IsDeleted: 0,
                        },
                        include: [{
                        model: Languages,
                            required: false,
                            as: "TraineeLanguage",
                        where: {
                            IsDeleted: 0,
                            },
                            attributes: ['id', 'name']
                        }, {
                            model: Languages,
                            required: false,
                            as: "portalLanguage",
                            where: {
                                IsDeleted: 0,
                            },
                            attributes: ['id', 'name']
                        }],
                        attributes: ['id', 'company_id', 'email', 'aadhar_no', 'mobile_no', 'user_type', 'language', 'portal_language']
                    }, {
                        model: TraineeCurriculum,
                        required: false,
                        where: {
                            IsDeleted: 0,
                        },
                        attributes: ['id', 'trainee_id', 'trainee_user_id', 'curriculum_id']
                    }],
                    attributes: ['id', 'enrollmentId','first_name', 'middle_name', 'last_name', 'email', 'contact', 'address', 'city', 'trainer_id']
                }],
                where: {
                    IsDeleted: 0,
                    trainer_id: req.body.trainer_id
                }
            }).then((result: any) => {
                res.status(responseCodes.SUCCESS).json({response_code: 1, message: 'Get Assign Trainee', data: result});
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});

        }
    }

    async getAssignTraineeToTrainer(req: Request, res: Response) {
        try {
            await Trainee.findAll({
                    include: [{
                        model: Users,
                        required: false,
                        where: {
                            IsDeleted: 0,
                        IsBlock:0
                        },
                        attributes: ['id', 'company_id', 'email', 'aadhar_no', 'mobile_no', 'user_type', 'language', 'portal_language']
                    }],
                where: {
                    IsDeleted: 0,
                    trainer_id: req.body.trainer_id,
                    IsBlock:0
                },
                attributes: ['id','enrollmentId', 'first_name', 'middle_name', 'last_name', 'email', 'contact', 'address', 'city', 'trainer_id']
            }).then((result: any) => {
                res.status(responseCodes.SUCCESS).json({response_code: 1, message: 'Get Assign Trainee', data: result});
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});

        }
    }

    async getAssignTraineeCurriculum(req: Request, res: Response) {
        try {
            await TraineeCurriculum.findAll({
                include: [
                    {
                        model: Curriculum,
                        where: {
                            IsDeleted: 0
                        },
                        attributes: ['id', 'company_id', 'name']
                    }
                ],
                where: {
                    IsDeleted: 0,
                    trainee_id: req.body.trainee_id
                },
                group: ['curriculum_id'],
                attributes: ['id', 'trainee_id', 'trainee_user_id', 'curriculum_id','technology_id']
            }).then((result: any) => {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: 'Get Trainee Assign Curriculum',
                    data: result
                });
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

        }
    }

    //! THIS API USE IN TRAINEE DASHBOARD 
    async getTechnologiesAllotedToTrainee(req: Request, res: Response)
    {
        try{
            await TraineeCurriculum.findAll({
                include:[{
                    model:TechnologyCategory,
                    attributes:['id','name'],
                    where:{IsDeleted:0}
                }],
                where:{
                  trainee_id:req.body.trainee_id,
                  IsBlock:0,
                  IsDeleted:0
                },
                attributes:['TechnologyCategory.name'],
                group:['TraineeCurriculum.technology_id']
              }).then((techData:any)=>
              {
                  if(techData.length !=0)
                  {
                    res
                    .status(responseCodes.SUCCESS)
                    .json({ response_code: 1, message:"Technologies Loaded",data:techData});
                  }
                  else
                  {
                    res
                    .status(responseCodes.SUCCESS)
                    .json({ response_code: 0, message:  "Oops! no curriculum has been alloted to you."});
                  }
                
              },err=>{
                res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message:  "Oops! "+ err.message });
              });
        }
        catch(err:any){
            res.status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message:  "Oops! "+ err.message });
            }
    }

    async getTraineeRemarks(req: Request, res: Response) {
        try {
            await CurriculumBuilder.findAll({
                include: [{
                    model: TraineeRemarks,
                    required: false,
                    where: {
                        IsDeleted: 0,
                        trainee_id: req.body.trainee_id
                    },
                    attributes: ['id', 'trainee_id', 'trainer_id', 'curriculum_id', 'curriculum_builder_id', 'remarks']
                }, {
                    model: CurriculumParentCategoryTest,
                    where: {
                        IsDeleted: 0,
                        language_id: req.body.language_id,
                        technology_type_id: req.body.technology_id
                    },
                    attributes: ['id', 'prefix', 'title', 'parent_id', 'technology_type_id', 'language_id']
                }],
                where: {
                    IsDeleted: 0,
                    curriculum_id: req.body.curriculum_id
                },
                attributes: ['id', 'curriculum_id', 'vehicle_id', 'curriculum_parent_category_id', 'curriculum_parent_category_test_id', 'passing_marks', 'total_marks', 'attempts']
            }).then((result) => {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: "Get Trainee Remarks Fetching successfully.",
                    data: result
                });
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                })
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! " + err.message
            })
        }
    }

    async addTraineeRemarks(req: Request, res: Response) {
        try {
            await TraineeRemarks.findAll({
                where: {
                    IsDeleted: 0,
                    trainee_id: req.body.trainee_id,
                    curriculum_builder_id: req.body.curriculum_builder_id
                }
            }).then(async (result: any) => {
                if (result.length == 0) {
                    req.body.createdAt = responseStrings.currentTime;
                    req.body.updated_by = '';
                    await TraineeRemarks.create({...req.body}).then((addResult: any) => {
                        res.status(responseCodes.SUCCESS).json({
                            response_code: 1,
                            message: "The Trainer Remark have been submit successfully.",
                            data: addResult,
                        });
                    }).catch(function (err: any) {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        })
                    });
                } else {
                    res.status(responseCodes.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Oops! Remark Already Submitted."
                    })
                }

            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                })
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! " + err.message
            })
        }
    }

    async updateTraineeRemarks(req: Request, res: Response) {
        try {
            let updateBody = {
                remarks: req.body.remarks,
                updated_by: req.body.updated_by,
                updatedAt: responseStrings.currentTime
            }
            await TraineeRemarks.update({...updateBody}, {
                where: {
                    id: req.body.trainee_remark_id
                }
            }).then((result: any) => {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: "The Trainer Remark have been update successfully."
                });
            }).catch(function (err: any) {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                })
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! " + err.message
            })
        }
    }

}

export default new TraineeController();
