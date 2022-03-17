import {check} from 'express-validator';
import e, {Request, Response} from "express";
import Company from "../../model/root/company.model";
import Curriculum from "../../model/root/curriculum.model";
import CurriculumBuilder from "../../model/root/curriculumbuilder.model";
import CurriculumParentCategory from "../../model/root/curriculum_parent_category.model";
import CurriculumParentCategoryTest from "../../model/root/curriculum_parent_category_test.model";
import SubCompany from "../../model/root/subcompany.model";
import Trainer from "../../model/root/trainer.model";
import Users from "../../model/root/users.model";
import responseCodes from "../../strings/response-codes";
import responseStrings from "../../strings/response-strings";
import TechnologyCategory from "../../model/root/technology.model";
import Subscription from "../../model/root/subscription.model";
import sequelize_1 from "sequelize";
import ResponseStrings from "../../strings/response-strings";
import Assign_trainee_to_trainer from "../../model/root/assign_trainee_to_trainer.model";
import Trainee from "../../model/root/trainee.model";
import TraineeCurriculum from "../../model/root/trainee_curriculum.model";
import TraineeRemarks from "../../model/root/trainee_remark.model";
import CompanyDepartment from '../../model/root/company_department.model';
import MasterDepartment from '../../model/root/master_department.model';

class TrainerController {

    async getTrainerCount(req: Request, res: Response)
    {
        try {
            await Trainer.count({
                where: {
                    company_id: req.body.company_id,
                    IsDeleted: 0
                },

            }).then(data => {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: "Trainer count fetched successfully.",
                    count: data
                });

            }).catch(err => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
            });
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
        }

    }

    async registerTrainer(req: Request, res: Response) {

        try {

            //? check Trainer 
            let trainer = await Trainer.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0,
                }
            })

            //? check User
            let user = await Users.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0,
                }
            })

            //?get Trainer and User both of exists
            if (trainer.length != 0 && user.length != 0) {
                res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: responseStrings.EXISTS});
            }

            //?get Trainer exist and User not exist
            else if (trainer.length != 0 && user.length == 0) {

                //? Create User
                const login = {
                    company_id: trainer[0].company_id,
                    email: trainer[0].email,
                    password: req.body.password,
                    user_type: responseStrings.UserTypeTrainer,
                    language: 1,
                    created_by: req.body.created_by,
                    createdAt: responseStrings.currentTime,
                    updated_by: ''
                }
                await Users.create({...login}).then(async (UserData) => {
                    const updateTrainer = {
                        login_table_id: UserData.id
                    }

                    //? update Trainer Loginid in trainer
                    await Trainer.update({...updateTrainer}, {
                        where: {
                            id: trainer[0].id
                        }
                    }).then((updateData) => {
                        res.status(responseCodes.SUCCESS).json({
                            response_code: 1,
                            message: "The Trainer have been registered successfully.",
                            trainer: trainer,
                            UserData: UserData
                        });
                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
                    })
                })
            }

            //?get duplicate email in User but can't get trainer 
            else if (trainer.length == 0 && user.length != 0) {
                res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Email of user already exists, please use another one"});
            }

            //?  Trainer and User both of not exists
            else {
                req.body.createdAt = responseStrings.currentTime;
                req.body.updated_by = '';

                //? Trainer Create
                await Trainer.create({...req.body}).then(async (data) => {
                    const login = {
                        company_id: data.company_id,
                        email: data.email,
                        password: req.body.password,
                        user_type: responseStrings.UserTypeTrainer,
                        language: 1,
                        created_by: req.body.created_by,
                        createdAt: responseStrings.currentTime,
                        updated_by: ''
                    }

                    //? User Create
                    await Users.create({...login}).then(async (UserData) => {
                        const updateTrainer = {
                            login_table_id: UserData.id
                        }
                        //? update Trainer Loginid in trainer
                        await Trainer.update({...updateTrainer}, {
                            where: {
                                id: data.id
                            }
                        }).then((updateData) => {
                            res.status(responseCodes.SUCCESS).json({
                                response_code: 1,
                                message: "The Trainer have been registered successfully.",
                                trainer: data,
                                UserData: UserData
                            });
                        }).catch((err: any) => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! "+err.message
                            });
                        })
                    })
                }).catch(function (err: any) {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
                });
            }

        } catch (e: any) {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: e.message,
                data: "",
            });
        }
    }

    async updateTrainer(req: Request, res: Response) {
        try {

            //? CHECK TRAINER 
            await Trainer.findOne({
                where: {
                    id: req.body.trainer_id,
                    IsDeleted: 0
                },
            }).then(async (result) => {
                //? GET TRAINER
                if (result != null) {
                    let updateTrainer = {}

                    if (req.body.sub_company_id && req.body.department_id) {
                        updateTrainer = {
                            name: req.body.name,
                            password: req.body.password,
                            trainer_expertise: req.body.trainer_expertise,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime,
                            department_id: req.body.department_id,
                            sub_company_id: req.body.sub_company_id
                        }

                    } else if (req.body.department_id) {
                        updateTrainer = {
                            name: req.body.name,
                            password: req.body.password,
                            trainer_expertise: req.body.trainer_expertise,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime,
                            department_id: req.body.department_id
                        }
                    } else if (req.body.sub_company_id) {
                        updateTrainer = {
                            name: req.body.name,
                            password: req.body.password,
                            trainer_expertise: req.body.trainer_expertise,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime,
                            sub_company_id: req.body.sub_company_id
                        }
                    }
                    else {
                        updateTrainer = {
                            name: req.body.name,
                            password: req.body.password,
                            trainer_expertise: req.body.trainer_expertise,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime
                        }
                    }


                    //? UPDATE TRAINER
                    await Trainer.update({...updateTrainer}, {
                        where: {
                            id: req.body.trainer_id
                        }
                    }).then(async (update) => {
                        let updateUser = {
                            password: req.body.password,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime
                        };
                        //? UPDATE USER
                        await Users.update({...updateUser}, {
                            where: {
                                id: result.login_table_id
                            }
                        }).then((updateRes) => {
                            res.status(responseCodes.SUCCESS).json({
                                response_code: 1,
                                message: "The Trainer have been updated successfully."
                            });
                        }).catch((err: any) => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! "+err.message
                            });
                        })

                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
                    })

                }
                //? TRAINER NOT EXIST
                else {
                    res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Oops! An invalid trainer ID was entered, or this trainer was already deleted"});
                }
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! "+err.message,
                    data: "",
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! "+err.message,
                data: "",
            });

        }
    }

    async getTrainers(req: Request, res: Response) {
        try {

            let where = {};

            //? CHECK PANAL PLANS
            if (req.body.department_id && req.body.sub_company_id) {
                where = {
                    IsDeleted: 0,
                    company_id: req.body.company_id,
                    department_id: req.body.department_id,
                    sub_company_id: req.body.sub_company_id
                }
            } else if (req.body.sub_company_id) {
                where = {
                    IsDeleted: 0,
                    company_id: req.body.company_id,
                    sub_company_id: req.body.sub_company_id
                }
            } else if (req.body.department_id) {
                where = {
                    IsDeleted: 0,
                    company_id: req.body.company_id,
                    department_id: req.body.department_id,
                }
            } else {
                where = {
                    IsDeleted: 0,
                    company_id: req.body.company_id,
                }
            }


            //? GET ALL TRAINER BY PANELS
            await Trainer.findAll({
                include: [
                {
                    model: Users,
                    where: {
                        IsDeleted: 0,
                        company_id: req.body.company_id
                    },
                    required: false
                },
                {
                    model: SubCompany,
                    where: {
                        IsDeleted: 0,
                        IsBlock: 0
                    },
                    required:false
                },
                {
                    model: CompanyDepartment,
                    include:[{
                        model:MasterDepartment
                    }],
                    where: {
                        IsDeleted: 0,
                        IsBlock: 0
                    },
                    required:false
                },

            
            ],
                where: where,
                order:[['id','DESC']]
            }).then((result) => {
                res.status(responseCodes.SUCCESS).json({response_code: 1, message: responseStrings.GET, data: result});
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! "+err.message,
                    data: "",
                });
            })

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! "+err.message,
                data: "",
            });
        }
    }

    async deleteTrainer(req: Request, res: Response) {
        try {

            //? GET TRAINER
            await Trainer.findOne({
                where: {
                    IsDeleted: 0,
                    id: req.body.trainer_id
                },
            }).then(async (result) => {
                //? GET TRAINER
                if (result != null) {
                    let updateTrainer = {
                        IsDeleted: 1,
                        deleted_by: req.body.deleted_by,
                        deletedAt: responseStrings.currentTime
                    }

                    //? DELETE TRAINER
                    await Trainer.update({...updateTrainer}, {
                        where: {
                            id: req.body.trainer_id
                        }
                    }).then(async (update) => {
                        let updateUser = {
                            IsDeleted: 1,
                            deleted_by: req.body.deleted_by,
                            deletedAt: responseStrings.currentTime
                        };
                        //? DELETE USER ALSO
                        await Users.update({...updateUser}, {
                            where: {
                                id: result.login_table_id
                            }
                        }).then((updateRes) => {
                            res.status(responseCodes.SUCCESS).json({response_code: 1, message: "The Trainer have been deleted."});
                        }).catch((err: any) => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! "+err.message
                            });
                        })

                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
                    })

                }
                //? TRAINER NOT EXIST
                else {
                    res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: responseStrings.NOT});
                }
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! "+err.message,
                    data: "",
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! "+err.message
            });
        }
    }

    async blockTrainer(req: Request, res: Response) {
        try {
            //** Check Trainee Id Exist */
            const trainer_id = req.body.trainer_id;

            const trainer_exist = await Trainer.findAll({
                where: {
                    id: trainer_id,
                    IsDeleted: 0
                }
            });

            //** If trainee Exist */
            if (trainer_exist.length != 0) {
                let block_trainer_data = {}
                let message = '';
                if (trainer_exist[0]['IsBlock'] == 1) {
                    
                    block_trainer_data = {
                        updated_by: req.body.updated_by,
                        updatedAt: responseStrings.currentTime,
                        IsBlock: 0
                    };
                    message = "Trainer Unblocked Successfully.";
                }

                if (trainer_exist[0]['IsBlock'] == 0) {
                    block_trainer_data = {
                        updated_by: req.body.updated_by,
                        updatedAt: responseStrings.currentTime,
                        IsBlock: 1
                    };
                    message = "The Trainer have been blocked.";
                }

                //* Updated Trainee Table
                await Trainer.update({...block_trainer_data}, {where: {id: trainer_id}}).then(success => {
                    const block_user_data = {
                        deleted_by: req.body.deleted_by,
                        deletedAt: responseStrings.currentTime,
                        IsBlock: 1
                    };

                    //** update User Table*/
                    Users.update({...block_user_data}, {where: {id: trainer_exist[0]['login_table_id']}}).then(succ => {

                        res.status(responseCodes.SUCCESS).json({response_code: 1, message: message});

                    }).catch(err => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

                    });

                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

                });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Oops! An invalid trainee ID was entered, or this trainee was already deleted"
                });
            }
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
        };
    }

    async assign_trainee_to_trainer(req: Request, res: Response) {
        try {

            if (req.body.trainees_id.length > 0) {
                let traineeData = JSON.parse(req.body.trainees_id);
                for (let i = 0; i < traineeData.length; i++) 
                {
                    let insertData = {
                        trainer_id: req.body.trainer_id,
                        trainee_id: traineeData[i]['trainee_id'],
                        created_by: req.body.created_by,
                        createdAt: responseStrings.currentTime
                    };

                    
                    await Assign_trainee_to_trainer.create(insertData)
                        .then(async (result: any) => {

                            await Trainer.findOne({where:{id:req.body.trainer_id}}).then(async(data:any)=>
                            {
                                let updateData = {
                                    trainer_id: req.body.trainer_id,
                                    sub_company_id:data["sub_company_id"],
                                    department_id:data["department_id"],
                                    updated_by: req.body.created_by,
                                    updatedAt: responseStrings.currentTime
                                }

                                await Trainee.update({...updateData}, {
                                    where: {
                                        id: traineeData[i]['trainee_id']
                                    }
                                }).then((updateResult: any) => {
                                    if ((traineeData.length - 1) == i) {
                                        res.status(responseCodes.SUCCESS).json({
                                            response_code: 1,
                                            message: "The Trainee have been assign successfully.",
                                        })
                                    }
                                }).catch((err: any) => {
                                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                        response_code: 0,
                                        message: "Oops! "+err.message
                                    })
                                })

                            }).catch(err=>{

                            });
                            
                        }).catch((err: any) => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! "+err.message
                            })
                        })

                }

            } else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Oops! please select atleast one trainee to assign"
                })
            }


        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! "+err.message
            })
        }
    }

    async unassignTrainer(req: Request, res: Response) {
        try {
            let updateAssign = {
                IsDeleted: 1,
                updatedAt: responseStrings.currentTime,
                updated_by: req.body.updated_by
            }
            await Assign_trainee_to_trainer.update({...updateAssign}, {
                where: {
                    id: req.body.assignTrainer_id,
                    IsDeleted: 0
                }
            }).then(async (result: any) => {
                let updateTrainee = {
                    trainer_id: null,
                    updatedAt: responseStrings.currentTime,
                    updated_by: req.body.updated_by
                }
                await Trainee.update({...updateTrainee}, {
                    where: {
                        id: req.body.trainee_id,
                        IsDeleted: 0
                    }
                }).then((result: any) => {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: "The Trainee have been unassigned successfully.",
                    })
                }).catch((err: any) => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! "+err.message
                    })
                })
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! "+err.message
                })
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! "+err.message
            })
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
                        technology_type_id:req.body.technology_id
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
                where:{
                    IsDeleted:0,
                    trainee_id:req.body.trainee_id,
                    curriculum_builder_id:req.body.curriculum_builder_id
                }
            }).then(async (result:any)=>{
                if(result.length==0){
                    req.body.createdAt=responseStrings.currentTime;
                    req.body.updated_by = '';
                    await TraineeRemarks.create({...req.body}).then((addResult:any)=>{
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
                }else {
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
            }).catch((err:any)=>{
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

export default new TrainerController();