import { check } from 'express-validator';
import e, { Request, Response } from "express";
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

class TrainerController {

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
                res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: responseStrings.EXISTS });
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
                await Users.create({ ...login }).then(async (UserData) => {
                    const updateTrainer = {
                        login_table_id: UserData.id
                    }

                    //? update Trainer Loginid in trainer
                    await Trainer.update({ ...updateTrainer }, {
                        where: {
                            id: trainer[0].id
                        }
                    }).then((updateData) => {
                        res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.ADD, trainer: trainer, UserData: UserData });
                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    })
                })
            }

            //?get duplicate email in User but can't get trainer 
            else if (trainer.length == 0 && user.length != 0) {
                res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: responseStrings.EXISTS });
            }

            //?  Trainer and User both of not exists
            else {
                req.body.createdAt = responseStrings.currentTime;
                req.body.updated_by = '';

                //? Trainer Create
                await Trainer.create({ ...req.body }).then(async (data) => {
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
                    await Users.create({ ...login }).then(async (UserData) => {
                        const updateTrainer = {
                            login_table_id: UserData.id
                        }
                        //? update Trainer Loginid in trainer
                        await Trainer.update({ ...updateTrainer }, {
                            where: {
                                id: data.id
                            }
                        }).then((updateData) => {
                            res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.ADD, trainer: data, UserData: UserData });
                        }).catch((err: any) => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        })
                    })
                }).catch(function (err: any) {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
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
                    else
                    {
                        updateTrainer = {
                            name: req.body.name,
                            password: req.body.password,
                            trainer_expertise: req.body.trainer_expertise,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime
                        }
                    }


                    //? UPDATE TRAINER
                    await Trainer.update({ ...updateTrainer }, {
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
                        await Users.update({ ...updateUser }, {
                            where: {
                                id: result.login_table_id
                            }
                        }).then((updateRes) => {
                            res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.UPDATED });
                        }).catch((err: any) => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        })

                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    })

                }
                //? TRAINER NOT EXIST
                else {
                    res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: responseStrings.NOT });
                }
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err.message,
                    data: "",
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: err.message,
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
                include: [{
                    model: Users,
                    where: {
                        IsDeleted: 0,
                        company_id: req.body.company_id
                    },
                    required: false
                }],
                where: where,
            }).then((result) => {
                res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.GET, data: result });
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err.message,
                    data: "",
                });
            })

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: err.message,
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
                    await Trainer.update({ ...updateTrainer }, {
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
                        await Users.update({ ...updateUser }, {
                            where: {
                                id: result.login_table_id
                            }
                        }).then((updateRes) => {
                            res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.DELETE });
                        }).catch((err: any) => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        })

                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    })

                }
                //? TRAINER NOT EXIST
                else {
                    res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: responseStrings.NOT });
                }
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err.message,
                    data: "",
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: err.message
            });
        }
    }

    async getTestMarksAttemptByTechnology(req: Request, res: Response) {
        try {
            console.log(req.body.company_id);
            await CurriculumBuilder.findAll({
                include: [{
                    model: Curriculum,
                    where: {
                        IsDeleted: 0,
                        company_id: req.body.company_id
                    },
                    attributes: ['id', 'company_id', 'name'],
                    required: true
                }, {
                    //     model: CurriculumParentCategory,
                    //     where: {
                    //         IsDeleted: 0,
                    //         technology_type_id: req.body.technology_type_id
                    //     },
                    //     attributes: ['id', 'title', 'technology_type_id'],
                    //     required:false
                    // },{
                    model: CurriculumParentCategoryTest,
                    where: {
                        IsDeleted: 0,
                        technology_type_id: req.body.technology_type_id
                    },
                    attributes: ['id', 'prefix', 'title'],
                    required: true
                }],
                where: {
                    IsDeleted: 0,
                    curriculum_id: req.body.curriculum_id
                },
                attributes: ['id', 'curriculum_id', 'curriculum_parent_category_id', 'curriculum_parent_category_test_id', 'passing_marks', 'total_marks', 'attempts']
            }).then((result) => {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 0,
                    data: result
                })
            })
                .catch((err: any) => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: err.message
                    })
                })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: err.message
            })
        }
    }

    

    async submitTestMarksAttemptByTechnology(req: Request, res: Response) {
        try {

            let data = req.body.data;
            let datalength = data.length;

            for (let i = 0; i < datalength; i++) {


                let updateMarksAttempt = {
                    passing_marks: data[i]['passing_marks'],
                    total_marks: data[i]['total_marks'],
                    attempts: data[i]['attempts'],
                    updated_by: req.body.updated_by,
                    updatedAt: responseStrings.currentTime
                }

                await CurriculumBuilder.update({ ...updateMarksAttempt }, {
                    where: {
                        id: data[i]['id']
                    }
                }).then((result) => {
                    if (datalength - 1 == i) {
                        res.status(responseCodes.SUCCESS).json({
                            response_code: 0,
                            message: responseStrings.UPDATED
                        })
                    }
                }).catch((err: any) => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: err.message
                    })
                })
            }

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: err.message
            })
        }
    }
}

export default new TrainerController();