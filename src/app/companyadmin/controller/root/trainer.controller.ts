import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');

import Trainer from "../../../../core/model/root/trainer.model";
import Users from "../../../../core/model/root/users.model";
import MasterDepartment from "../../../../core/model/root/master_department.model";
import CompanyDepartment from "../../../../core/model/root/company_department.model";
import SubCompany from "../../../../core/model/root/subcompany.model";
import Assign_trainee_to_trainer from "../../../../core/model/root/assign_trainee_to_trainer.model";
import Trainee from "../../../../core/model/root/trainee.model";
import CurriculumBuilder from "../../../../core/model/root/curriculumbuilder.model";
import TraineeRemarks from "../../../../core/model/root/trainee_remark.model";
import CurriculumParentCategoryTest from "../../../../core/model/root/curriculum_parent_category_test.model";

class TrainerController {

    async getTrainerCount(req: Request, res: Response) {
        try {
            await Trainer.count({
                where: {
                    company_id: req.body.company_id,
                    IsDeleted: 0,
                    IsBlock:0
                },

            }).then(data => {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: "Trainer count fetched successfully.",
                    count: data
                });

            }).catch(err => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            });
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});
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
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    })
                })
            }

            //?get duplicate email in User but can't get trainer 
            else if (trainer.length == 0 && user.length != 0) {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Email of user already exists, please use another one"
                });
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
                                message: "Oops! " + err.message
                            });
                        })
                    })
                }).catch(function (err: any) {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
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
                    } else {
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
                                message: "Oops! " + err.message
                            });
                        })

                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    })

                }
                //? TRAINER NOT EXIST
                else {
                    res.status(responseCodes.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Oops! An invalid trainer ID was entered, or this trainer was already deleted"
                    });
                }
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: "",
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! " + err.message,
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
                        required: false
                    },
                    {
                        model: CompanyDepartment,
                        include: [{
                            model: MasterDepartment
                        }],
                        where: {
                            IsDeleted: 0,
                            IsBlock: 0
                        },
                        required: false
                    },


                ],
                where: where,
                order: [['id', 'DESC']]
            }).then((result) => {
                res.status(responseCodes.SUCCESS).json({response_code: 1, message: responseStrings.GET, data: result});
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: "",
                });
            })

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! " + err.message,
                data: "",
            });
        }
    }

    async getActiveTrainers(req: Request, res: Response) {
        try {

            let where = {};

            //? CHECK PANAL PLANS
            if (req.body.department_id && req.body.sub_company_id) {
                where = {
                    IsDeleted: 0,
                    IsBlock: 0,
                    company_id: req.body.company_id,
                    department_id: req.body.department_id,
                    sub_company_id: req.body.sub_company_id
                }
            } else if (req.body.sub_company_id) {
                where = {
                    IsDeleted: 0,
                    IsBlock: 0,
                    company_id: req.body.company_id,
                    sub_company_id: req.body.sub_company_id
                }
            } else if (req.body.department_id) {
                where = {
                    IsDeleted: 0,
                    IsBlock: 0,
                    company_id: req.body.company_id,
                    department_id: req.body.department_id,
                }
            } else {
                where = {
                    IsDeleted: 0,
                    IsBlock: 0,
                    company_id: req.body.company_id,
                }
            }


            //? GET ALL TRAINER BY PANELS
            await Trainer.findAll({
                where: where,
                order: [['id', 'DESC']]
            }).then((result) => {
                res.status(responseCodes.SUCCESS).json({response_code: 1, message: responseStrings.GET, data: result});
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: "",
                });
            })

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! " + err.message,
                data: "",
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
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });

                    });

                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });

                });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Oops! An invalid trainee ID was entered, or this trainee was already deleted"
                });
            }
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});
        }
        ;
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
                        }).then(async (updateRes) => {

                            //Un Assigned All Trainees

                            let unassign_all_trainee =
                                {
                                    trainer_id: null
                                };

                            await Trainee.update({...unassign_all_trainee}, {where: {trainer_id: req.body.trainer_id}}).then(async (unassign) => {

                                let unassign_all_trainee2 =
                                    {
                                        IsDeleted: 1
                                    };
                                await Assign_trainee_to_trainer.update({...unassign_all_trainee2}, {where: {trainer_id: req.body.trainer_id}}).then(d => {

                                    res.status(responseCodes.SUCCESS).json({
                                        response_code: 1,
                                        message: "The Trainer have been deleted."
                                    });


                                }).catch(err => {
                                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                        response_code: 0,
                                        message: "Oops! " + err.message
                                    });
                                })


                            }).catch(err => {
                                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err.message
                                });
                            });

                        }).catch((err: any) => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        })

                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    })

                }
                //? TRAINER NOT EXIST
                else {
                    res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: responseStrings.NOT});
                }
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: "",
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! " + err.message
            });
        }
    }

    async assign_trainee_to_trainer(req: Request, res: Response) {
        try {

            if (req.body.trainees_id.length > 0) {
                let traineeData = JSON.parse(req.body.trainees_id);
                for (let i = 0; i < traineeData.length; i++) {

                    let trainer_id = traineeData[i]['trainer_id'];

                    await Trainer.findOne({ where: { id: trainer_id } }).then(async (data: any) => {
                        let updateData = {
                            trainer_id: trainer_id,
                            sub_company_id: (trainer_id == 0 ? 0 : data["sub_company_id"]),
                            department_id: (trainer_id == 0 ? 0 : data["department_id"]),
                            updated_by: req.body.created_by,
                            updatedAt: responseStrings.currentTime
                        }

                        await Trainee.update({ ...updateData }, {
                            where: {
                                id: traineeData[i]['trainee_id']
                            }
                        }).then(async (updateResult: any) => {

                            if (trainer_id != 0) {
                    let insertData = {
                        trainer_id: req.body.trainer_id,
                        trainee_id: traineeData[i]['trainee_id'],
                        created_by: req.body.created_by,
                        createdAt: responseStrings.currentTime
                    };


                    await Assign_trainee_to_trainer.create(insertData)
                        .then(async (result: any) => {
                                    if ((traineeData.length - 1) == i) {
                                        res.status(responseCodes.SUCCESS).json({
                                            response_code: 1,
                                            message: "The Trainee have been assign successfully.",
                                        })
                                    }
                                }).catch((err: any) => {
                                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                        response_code: 0,
                                        message: "Oops! " + err.message
                                    })
                                })
                            } else {
                                if ((traineeData.length - 1) == i) {
                                    res.status(responseCodes.SUCCESS).json({
                                        response_code: 1,
                                        message: "The Trainee have been assign successfully.",
                                    })
                                }
                            }




                        }).catch((err: any) => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            })
                        })

                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        })
                    });



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
                message: "Oops! " + err.message
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
                        message: "Oops! " + err.message
                    })
                })
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


    async getTrainersForAssignDepartment(req: Request, res: Response) {
        try {

            //? GET ALL TRAINER BY PANELS
            await Trainer.findAll({
                include: [
                    {
                        model: CompanyDepartment,
                        attributes: ['id', 'name', 'designation', 'email'],
                        include: [{
                            model: MasterDepartment,
                            attributes: ['id', 'name', 'descripition'],
                        }],
                        where: {
                            IsDeleted: 0,
                            IsBlock: 0
                        },
                        required: false
                    },
                ],
                where: {
                    IsDeleted: 0,
                    company_id: req.body.company_id,
                },
                order: [['id', 'DESC']]
            }).then((result) => {
                res.status(responseCodes.SUCCESS).json({response_code: 1, message: responseStrings.GET, data: result});
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: "",
                });
            })

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! " + err.message,
                data: "",
            });
        }
    }

    //* This for GOLD Panel
    async checkAssignTrainersTrainee(req: Request, res: Response) {
        try {
            await Trainee.findAll({
                where: {
                    trainer_id: req.body.trainer_id,
                    IsDeleted: 0
                }
            }).then(async (TraineeData) => {
                if (TraineeData.length != 0) {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: "This trainer is responsible for some trainees. Would you like to change their department as well?",
                        bit: 1
                    });
                } else {
                    let updateTrainer = {
                        department_id: req.body.company_department_id,
                        updatedAt: responseStrings.currentTime,
                        updated_by: req.body.updated_by,
                    }
                    await Trainer.update({...updateTrainer}, {
                        where: {
                            id: req.body.trainer_id
                        }
                    }).then(async (result) => {
                        res.status(responseCodes.SUCCESS).json({
                            response_code: 1,
                            message: "Successfully assign department to trainer.",
                            bit: 0
                        });
                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message,
                        });
                    });
                }
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                });
            });
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! " + err.message,
            });
        }
    }

    //* This for GOLD Panel
    async assign_department_to_trainer(req: Request, res: Response) {
        try {
            let updateTrainer = {
                department_id: req.body.company_department_id,
                updatedAt: responseStrings.currentTime,
                updated_by: req.body.updated_by,
            }


            await Trainer.update({...updateTrainer}, {
                where: {
                    id: req.body.trainer_id
                }
            }).then(async (result) => {

                let updateTrainee;
                let message = "";

                if (req.body.bit == 1) {
                    updateTrainee = {
                        department_id: req.body.company_department_id,
                        updatedAt: responseStrings.currentTime,
                        updated_by: req.body.updated_by,
                    }
                    message = "Successfully assign department to trainer with assigned trainee";
                } else {
                    updateTrainee = {
                        department_id: 0,
                        trainer_id: 0,
                        updatedAt: responseStrings.currentTime,
                        updated_by: req.body.updated_by,
                    }
                    message = "Successfully assign department to trainer only.";
                }
                await Trainee.update({...updateTrainee}, {
                    where: {
                        trainer_id: req.body.trainer_id,
                        IsDeleted: 0
                    }
                }).then(async (TraineeResult) => {

                    if (req.body.bit == 1) {
                        let updateTraineeAssign = {
                            IsBlock: 0,
                            updatedAt: responseStrings.currentTime,
                            updated_by: req.body.updated_by
                        }
                        await Assign_trainee_to_trainer.update({...updateTraineeAssign}, {
                            where: {
                                trainer_id: req.body.trainer_id,
                                IsDeleted: 0
                            }
                        }).then((TraineeResult) => {
                            res.status(responseCodes.SUCCESS).json({
                                response_code: 1,
                                message: message,
                            });
                        }).catch((err: any) => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message,
                            });
                        })
                    } else {
                        res.status(responseCodes.SUCCESS).json({
                            response_code: 1,
                            message: message,
                        });
                    }


                }).catch((err: any) => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message,
                    });
                })


            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
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