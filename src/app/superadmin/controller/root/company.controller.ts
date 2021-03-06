import {Model} from 'sequelize';
import {Request, Response} from "express";
import Company from "../../../../core/model/root/company.model";
import CompanyUser from "../../../../core/model/root/compayuser.model";
import Curriculum from "../../../../core/model/root/curriculum.model";
import Subscription from "../../../../core/model/root/subscription.model";
import Users from "../../../../core/model/root/users.model";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import Countries from '../../../../core/model/resources/countries.model';
import States from '../../../../core/model/resources/states.model';
import Cities from '../../../../core/model/resources/cities.model';
import TraineeCustomizeFormModel from '../../../../core/model/root/traineeFormCustomize.model';
import TraineeFormMasterModel from '../../../../core/model/root/traineeFormMaster.model';
import {Op} from 'sequelize';
import moment from 'moment';
import MasterPanel from '../../../../core/model/root/masterpanel.model';
import Trainee from "../../../../core/model/root/trainee.model";
import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import where = require("sequelize");
import SubCompany from '../../../../core/model/root/subcompany.model';
import CompanyDepartment from '../../../../core/model/root/company_department.model';
import MasterDepartment from '../../../../core/model/root/master_department.model';
import Trainer from '../../../../core/model/root/trainer.model';
import CurriculumBuilder from '../../../../core/model/root/curriculumbuilder.model';
import ElearningResult from '../../../../core/model/elearning/eLearningresult.model';
import sequelize = require('sequelize');


class CompanyController {

    async registerCompany(req: Request, res: Response) {
        try {
            var company_name = req.body.company_name;
            const company_logo = req.file?.filename;

            const checkName = await Company.findOne({
                where: {
                    company_name: company_name,
                    IsDeleted: 0
                },
            });

            if (checkName == null) {

                req.body.picture=company_logo;
                req.body.updated_by = "";
                req.body.createdAt = responseStrings.currentTime

                req.body.enrollment_id = "COM_";

                await Company.create({...req.body})
                    .then(async function (response) {

                        //! UPDATE COMPANY ENROLLMENT ID
                        var updateData = {
                            enrollment_id: "COMP_" + response['id']
                        }
                        Company.update({...updateData}, {where: {id: response['id']}}).catch(err => {
                            console.log(err);
                        });
                        //! UPDATE COMPANY ENROLLMENT ID

                        //* Add trainee form field to this company/
                        var company_id = response['id'];

                        const master_form_fileds = await TraineeFormMasterModel.findAll({where: {IsDeleted: 0}});

                        for (let i = 0; i < master_form_fileds.length; i++) {
                            var formarray = {
                                company_id: company_id,
                                form_master_id: master_form_fileds[i]['id'],
                                created_by: req.body.created_by,
                                isValidate: 0
                            }
                            await TraineeCustomizeFormModel.create({...formarray}).catch(err => {
                                console.log("Oops! " + err.message);
                            });
                        }

                        //* Add trainee form field to this company ----END/
                        res
                            .status(responseCodes.SUCCESS)
                            .json({
                                response_code: 1,
                                message: "The company have been successfully registered.",
                                data: response,
                            });
                    })
                    .catch(function (err: any) {
                        res
                            .status(responseCodes.INTERNAL_SERVER_ERROR)
                            .json({response_code: 0, message: "Oops! " + err.message});
                    });
            } else {
                res
                    .status(responseCodes.CREATED)
                    .json({
                        response_code: 0,
                        message: "Another user with this company name already exists. Please use another name",
                    });
            }
        } catch (error: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async updateCompany(req: Request, res: Response) {
        try {
            let company_id = req.body.company_id;

            let check_company_is_valid = await Company.findOne({
                where: {
                    id: company_id,
                    IsDeleted: 0,
                }
            }).catch((err: any) => {
                res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({response_code: 0, message: "Oops! " + err.message});
            });

            if (check_company_is_valid != null) {

                req.body.updatedAt = responseStrings.currentTime;

                await Company.update({...req.body}, {where: {id: company_id}})
                    .then(function (data) {
                        res
                            .status(responseCodes.SUCCESS)
                            .json({response_code: 1, message: "Company updated successfully"});
                    })
                    .catch(function (err: any) {
                        res
                            .status(responseCodes.INTERNAL_SERVER_ERROR)
                            .json({response_code: 0, message: "Oops! " + err.message});
                    });
            } else {
                res
                    .status(responseCodes.BAD_REQUEST)
                    .json({
                        response_code: 0,
                        message:
                            "Oops! An invalid company ID was entered, or this company was already deleted",
                    });
            }
        } catch (error: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async deleteCompany(req: Request, res: Response) {
        try {
            let company_id = req.body.company_id;

            let check_company_is_valid = await Company.findOne({
                where: {
                    id: company_id,
                    IsDeleted: 0,
                },
                // logging: console.log,
            }).catch((err: any) => {
                res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({response_code: 0, message: "Oops! " + err.message});
            });

            if (check_company_is_valid != null) {
                let updateData = {
                    IsDeleted: 1,
                    deletedAt: responseStrings.currentTime,
                    deleted_by: req.body.deleted_by,
                };

                //Check Subscription Expired
                var currentDate = responseStrings.currentDate;
                await Subscription.findAll({
                    where: {
                        expiry_date: {[Op.gte]: currentDate},
                        IsDeleted: 0,
                        company_id: company_id
                    }
                }).then(data => {
                    if (data.length == 0) {
                        Company.update({...updateData}, {where: {id: company_id}})
                            .then(function (data) {
                                res
                                    .status(responseCodes.SUCCESS)
                                    .json({response_code: 1, message: "The Company have been deleted successfully."});
                            })
                            .catch(function (err: any) {
                                res
                                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                                    .json({response_code: 0, message: data.length});
                            });
                    } else {
                        res
                            .status(responseCodes.BAD_REQUEST)
                            .json({
                                response_code: 0,
                                message: "Oops! you cannot delete this company because it have an active Subscription please Deactivate the Subscription anf try again"
                            });
                    }
                }, err => {
                    res
                        .status(responseCodes.BAD_REQUEST)
                        .json({
                            response_code: 0,
                            message:
                                "Oops!" + err
                        });
                });


            } else {
                res
                    .status(responseCodes.BAD_REQUEST)
                    .json({
                        response_code: 0,
                        message:
                            "Oops! An invalid company ID was entered, or this company was already deleted",
                    });
            }
        } catch (error: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async getCompany(req: Request, res: Response) {
        try {
            let company_id = "";
            let where_condition = {};
            let include_condition = {};

            //TODOD Get Company By
            if (req.body.company_id) {
                company_id = req.body.company_id;
                where_condition = {id: company_id, IsDeleted: 0, company_type: 0};
                include_condition = {};
            }
            //TODO Get All Company
            else {
                where_condition = {IsDeleted: 0, company_type: 0};
            }

            const getCompany = await Company.findAll(
                {
                    include: [{
                        model: MasterPanel,
                        //required:false,
                        where: {IsDeleted: 0}
                    }],
                    where: where_condition,
                    order: [["id", "DESC"]],
                })
                .then((data: any) => {
                    if (data.length != 0) {

                        for (var i = 0; i < data.length; i++) {
                            data[i]['logo'] = new URL(req.protocol + '://' + req.get('host')) + "resources/company_logo/" + data[i]['picture'];
                        }
                        //let logo =

                        res
                            .status(responseCodes.SUCCESS)
                            .json({
                                response_code: 1,
                                //logo:logo,
                                message: responseStrings.GET,
                                data: data,
                            });
                    } else {
                        res
                            .status(responseCodes.SUCCESS)
                            .json({response_code: 0, message: "No data were found."});
                    }
                })
                .catch((err: any) => {
                    console.log(err);
                    res
                        .status(responseCodes.INTERNAL_SERVER_ERROR)
                        .json({response_code: 0, message: "Oops! " + err.message});
                });
        } catch (error: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async get_company_details_by_id(req: Request, res: Response) {

        try {

            await Company.findOne({
                include: [
                    {
                        model: CompanyUser,
                        attributes: ['id', 'name', 'designation', 'mobile_no', 'canlogin'],
                        where: {
                            IsDeleted: 0
                        },
                        required: false
                    },
                    {
                        model: Subscription,
                        include: [{
                            model: Curriculum,
                            attributes: ['id', 'name'],
                            where: {
                                IsDeleted: 0
                            },
                            required: false
                        }],
                        where: {
                            IsDeleted: 0,
                            company_id: req.body.company_id
                        },
                        required: false
                    },
                    {
                        model: MasterPanel,
                        attributes: ['panel']
                    },
                    {
                        model: Countries,
                        attributes: ['title', 'slug'],
                        required: false
                    },
                    {
                        model: States,
                        attributes: ['title', 'slug'],
                        required: false
                    },
                    {
                        model: Cities,
                        attributes: ['title', 'slug'],
                        required: false
                    }
                ],
                //logging: console.log,
                where: {
                    id: req.body.company_id,
                    IsDeleted: 0
                }
            }).then((result: any) => {

                if (result != null) {

                    let logo = new URL(req.protocol + '://' + req.get('host')) + "resources/company_logo/" + result['picture'];
                    res
                        .status(responseCodes.SUCCESS)
                        .json({
                            response_code: 1,
                            logo: logo,
                            message: responseStrings.GET,
                            data: result,
                        });
                } else {
                    res
                        .status(responseCodes.SUCCESS)
                        .json({response_code: 0, message: "No data were found."});
                }
            })
        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({response_code: 0, message: "Oops! " + err.message});
        }
    }

    //TODO Company Login Calls

    async add_company_user(req: Request, res: Response) {
        try {

            req.body.createdAt = responseStrings.currentTime;


            await CompanyUser.create({...req.body})
                .then(function (data) {
                    res
                        .status(responseCodes.SUCCESS)
                        .json({
                            response_code: 1,
                            message: "company user added successfully.",
                            data: data,
                        });
                })
                .catch(function (err: any) {
                    res
                        .status(responseCodes.INTERNAL_SERVER_ERROR)
                        .json({response_code: 0, message: "Oops! " + err.message});
                });
        } catch (error: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async add_company_login(req: Request, res: Response) {
        try {
            //Table Fields for Company Contac
            req.body.canlogin = 1;
            req.body.updated_by = "";
            req.body.createdAt = responseStrings.currentTime;

            const checkemailExist = await CompanyUser.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0
                }
            });

            const checkemailExist_in_user_table = await Users.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0
                }
            })

            if (checkemailExist.length == 0 && checkemailExist_in_user_table.length == 0) {

                await CompanyUser.create({...req.body})
                    .then((userdata) => {
                        //Add login in User table
                        const userLoginData = {
                            company_id: req.body.company_id,
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 2,
                            language: 1,
                            createdAt: responseStrings.currentTime,
                            created_by: req.body.created_by,
                            updated_by: "",
                        };

                        Users.create({...userLoginData})
                            .then((data) => {
                                const updateId = {
                                    login_table_id: data["id"],
                                };
                                CompanyUser.update(
                                    {...updateId},
                                    {where: {id: userdata["id"]}}
                                ).catch((err: any) => {
                                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({message: "Oops! " + err.message});
                                });

                                res.status(responseCodes.SUCCESS).json({
                                    response_code: 1,
                                    message: "Added company user successfully, and login created"
                                });
                                responseCodes;
                            })
                            .catch(function (err: any) {
                                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err.message
                                });
                            });
                    })
                    .catch(function (err: any) {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Oops! Another user with this email already exists"
                });
            }


        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async updated_company_user(req: Request, res: Response) {
        try {
            let user_id = req.body.user_id;

            let check_company_user_is_valid = await CompanyUser.findOne({
                where: {
                    id: user_id,
                    IsDeleted: 0,
                }
            }).catch((err: any) => {
                res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({response_code: 0, message: "Oops! " + err.message});
            });

            if (check_company_user_is_valid != null) {

                req.body.updatedAt = responseStrings.currentTime;
                const user_login_id = check_company_user_is_valid['login_table_id'];

                await CompanyUser.update({...req.body}, {where: {id: user_id}})
                    .then(function (data) {

                        const user_table_update = {
                            name: req.body.name,
                            email: req.body.email,
                            mobile_no: req.body.mobile_no,
                            password: req.body.password,
                            designation: req.body.designation,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime
                        };

                        Users.update(user_table_update, {where: {id: user_login_id}}).then(function (data) {
                            res
                                .status(responseCodes.SUCCESS)
                                .json({response_code: 1, message: "Company user updated successfully."});
                        }).catch((err: any) => {
                            res
                                .status(responseCodes.INTERNAL_SERVER_ERROR)
                                .json({response_code: 0, message: "Oops! " + err.message});
                        });

                    })
                    .catch(function (err: any) {
                        res
                            .status(responseCodes.INTERNAL_SERVER_ERROR)
                            .json({response_code: 0, message: "Oops! " + err.message});
                    });
            } else {
                res
                    .status(responseCodes.BAD_REQUEST)
                    .json({
                        response_code: 0,
                        message:
                            "Oops! An invalid company user ID was entered, or this user was already deleted",
                    });
            }
        } catch (error: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async get_company_user(req: Request, res: Response) {

        try {
            const company_id = req.body.company_id;

            const company_user_data = await CompanyUser.findAll({
                include: [
                    {
                        model: Users,
                    }
                ],
                where: {
                    company_id: company_id,
                    canlogin: 1,
                    IsDeleted: 0,
                },
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            });

            if (company_user_data) {
                res
                    .status(responseCodes.SUCCESS)
                    .json({
                        response_code: 1,
                        message: "data have been fetched successfully.",
                        data: company_user_data,
                    });
            } else {
                res.status(responseCodes.SUCCESS).json({response_code: 0, message: "No data were found."});
            }
        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + error.message});
        }

    }

    async delete_company_user(req: Request, res: Response) {
        try {
            const user_id = req.body.user_id;

            const UserData = await CompanyUser.findOne({
                where: {
                    id: user_id,
                    IsDeleted: 0
                }
            });

            if (UserData != null) {
                //* This Array has been used to update two table check before any change
                let updateData = {
                    IsDeleted: 1,
                    deleted_by: req.body.deleted_by,
                    deletedAt: responseStrings.currentTime
                };

                //! Delete the User from Company Contacts table
                await CompanyUser.update({...updateData}, {where: {id: user_id}})
                    .then(function (data) {
                        //! Delete the User from user table
                        const login_table_id = UserData['login_table_id'];

                        Users.update({...updateData}, {where: {id: login_table_id}}).then(function (data) {
                            res.status(responseCodes.SUCCESS)
                                .json({
                                    response_code: 1,
                                    message: "Company user deleted successfully.",
                                });
                        }).catch(function (err: any) {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });


                    })
                    .catch(function (err: any) {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
            } else {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 0,
                    message: "Oops! An invalid company user ID was entered, or this user was already deleted"
                });

            }


        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + error.message});
        }

    }

    async get_trainee_customize_form(req: Request, res: Response) {
        var company_id = req.body.company_id;

        await TraineeCustomizeFormModel.findAll({
            include: {
                required: true,
                model: TraineeFormMasterModel,
                attributes: ['id', 'form_label', 'form_field'],
                where: {
                    isDeleted: 0
                },
            },
            attributes: ['id', 'isValidate'],
            where: {
                company_id: company_id,
                isDeleted: 0
            },
            //logging:console.log
        }).then(result => {
            if (result.length != 0) {
                const initialValue = {};

                let fromLabel = result.reduce((obj: any, item: { [x: string]: any; }) => {

                    let ObjData = {
                        id: item['id'],
                        isValidate: item['isValidate'],
                        form_id: item['TraineeFormMasterModel']['form_field']
                    };

                    return {
                        ...obj,
                        [item['TraineeFormMasterModel']['form_label']]: ObjData,
                    };
                }, initialValue);
                res.status(responseCodes.SUCCESS).json({response_code: 0, message: "Form Loading...", form: fromLabel});
            } else {
                res.status(responseCodes.SUCCESS).json({response_code: 0, message: "No Customize form Found"});
            }
        }).catch(err => {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});
        });

    }

    async getTraineeMasterFormByCompany(req: Request, res: Response) {

        try {
            await TraineeCustomizeFormModel.findAll({
                include: [{
                    required: true,
                    model: TraineeFormMasterModel,
                    attributes: ['id', 'form_label', 'form_field'],
                    where: {
                        isDeleted: 0
                    },
                }],
                where: {
                    company_id: req.body.company_id
                },
                attributes: ['id', 'company_id', 'form_master_id', 'isValidate', 'isUsed'],
            }).then((TraineeCustomizeFormModel: any) => {


                for (let i = 0; i < TraineeCustomizeFormModel.length; i++) {
                    TraineeCustomizeFormModel[i]['isValidate'] = (TraineeCustomizeFormModel[i]['isValidate'] == '1' ? true : false);
                    TraineeCustomizeFormModel[i]['isUsed'] = (TraineeCustomizeFormModel[i]['isUsed'] == '1' ? true : false);
                }

                res.status(responseCodes.SUCCESS).json({ response_code: 1, data: TraineeCustomizeFormModel });
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            })
        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
        }
    }

    async updateTraineeMasterFormByCompany(req: Request, res: Response) {
        try {
            let form_array = JSON.parse(req.body.form_array);



            if (form_array.length != 0) {
                for (let i = 0; i < form_array.length; i++) {
                    let masterForm = {
                        isValidate: (form_array[i]['isValidate'] == true ? '1' : '0'),
                        isUsed: (form_array[i]['isUsed'] == true ? '1' : '0'),
                        updated_by: req.body.updated_by,
                        updatedAt: responseStrings.currentTime
                    }

                    await TraineeCustomizeFormModel.update({ ...masterForm }, {
                        where: {
                            id: form_array[i]['id']
                        }
                    }).then((upateRes) => {
                        if (form_array.length == (i + 1)) {
                            res.status(responseCodes.SUCCESS).json({
                                response_code: 1,
                                message: "Master Trainee Form updated successfully."
                            });
                        }
                    }).catch((err: any) => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                    })

                }
            } else {
                res.status(responseCodes.SUCCESS).json({ response_code: 0, message: "Oops! Master Form not found" });
            }



        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
        }
    }
}

export default new CompanyController();
