import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');

import Trainer from "../../../../core/model/root/trainer.model";
import MasterDepartment from "../../../../core/model/root/master_department.model";
import Users from "../../../../core/model/root/users.model";
import CompanyDepartment from "../../../../core/model/root/company_department.model";
import Trainee from "../../../../core/model/root/trainee.model";


class CompanyDepartmentController {

    async assignTrainersToDepartment_SubCompany(req: Request, res: Response) {
        try {

            let update = {};
            if (req.body.sub_company_id && req.body.department_id) {
                update = {
                    sub_company_id: req.body.sub_company_id,
                    department_id: req.body.department_id,
                    updated_by: req.body.updated_by,
                    updatedAt: responseStrings.currentTime,
                }
            } else if (req.body.department_id) {
                update = {
                    department_id: req.body.department_id,
                    updated_by: req.body.updated_by,
                    updatedAt: responseStrings.currentTime,
                }
            } else if (req.body.sub_company_id) {
                update = {
                    sub_company_id: req.body.sub_company_id,
                    updated_by: req.body.updated_by,
                    updatedAt: responseStrings.currentTime,
                }
            }

            await Trainer.findOne({
                where: {
                    id: req.body.trainer_id,
                    IsDeleted: 0
                }
            }).then(async (data: any) => {
                if (data != null) {

                    await Trainer.update({...update}, {
                        where: {
                            id: req.body.trainer_id
                        }
                    }).then((data) => {
                        res.status(responseCodes.SUCCESS).json({
                            response_code: 1,
                            message: "Trainer assigned successfully."
                        });
                    }).catch((err: any) => {
                        return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message,
                            data: "",
                        });
                    })
                } else {
                    return res.status(responseCodes.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Oops! An invalid trainer ID was entered, or this trainer was already deleted",
                        data: "",
                    });
                }
            }).catch((err: any) => {
                return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: "",
                });
            })


        } catch (e: any) {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Oops! " + e.message,
                data: "",
            });
        }
    }

    async addDepartment(req: Request, res: Response) {
        try {
            var company_id = req.body.company_id;
            var master_data = {
                company_id: req.body.company_id,
                name: req.body.department_name,
                descripition: req.body.description,
                created_by: req.body.created_by,
                createdAt: responseStrings.currentTime
            }

            var check_master_department_exist = await MasterDepartment.findAll({
                where: {
                    company_id: company_id,
                    name: req.body.department_name,
                    IsDeleted: 0
                }
            });

            var check_email_exist_in_user_table = await Users.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0
                }
            });

            if (check_master_department_exist.length == 0 && check_email_exist_in_user_table.length == 0) {
                await MasterDepartment.create({...master_data}).then(msdata => {
                    var companyData = {
                        company_id: req.body.company_id,
                        department_id: msdata['id'],
                        name: req.body.username,
                        designation: req.body.designation,
                        contactNumber: req.body.contactNumber,
                        email: req.body.email,
                        created_by: req.body.created_by,
                        createdAt: responseStrings.currentTime
                    }
                    CompanyDepartment.create({...companyData}).then(cdData => {
                        const user_login_data = {
                            company_id: req.body.company_id,
                            name: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 6,
                            language: 1,
                            createdAt: responseStrings.currentTime,
                            updated_by: "",
                            updatedAt: '',
                            created_by: req.body.created_by
                        };
                        Users.create({...user_login_data}).then(userdata => {
                            var updateData = {
                                login_table_id: userdata['id']
                            }
                            CompanyDepartment.update({...updateData}, {where: {id: cdData['id']}}).then(succ => {

                                res.status(responseCodes.SUCCESS).json({
                                    response_code: 1,
                                    message: "Added department successfully, and login created"
                                });

                            }).catch(err => {
                                res.status(responseCodes.BAD_REQUEST).json({
                                    response_code: 0,
                                    message: "Opps! " + err.message
                                });

                            })


                        }).catch(err => {

                            res.status(responseCodes.BAD_REQUEST).json({
                                response_code: 0,
                                message: "Opps! " + err.message
                            });
                        })


                    }).catch(err => {

                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Opps! " + err.message
                        });

                    });

                }).catch(err => {

                    return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Opps! " + err.message,
                        data: "",
                    });
                })
            } else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Name or email of department already exists, please use another one"
                });

            }

        } catch (err: any) {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: "Opps! " + err.message,
                data: "",
            });
        }
    }

    async departmentDetails(req: Request, res: Response) {
        try {
            await CompanyDepartment.findAll({
                include: [
                    {
                        model: MasterDepartment
                    },
                    {
                        model: Trainer,
                        required: false,
                        where: {IsDeleted: 0}
                    },
                    {
                        model:Trainee,
                        required:false,
                        where:{IsDeleted:0}
                    }
                ],
                where: {
                    company_id: req.body.company_id,
                    IsDeleted: 0
                }

            }).then(data => {

                if (data.length != 0) {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: "data have been fetched successfully",
                        data: data
                    });
                } else {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 0,
                        message: "No data were found, please add the department"
                    });
                }

            }).catch(err => {
                res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Oops! " + err.message});

            });
        } catch (err: any) {
            res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Oops! " + err.message});

        }
    }

    async getCompanyDepartment(req: Request, res: Response) {
        try {
            var where = {};
            if (req.body.sub_company_id) {
                where = {
                    sub_company_id: req.body.sub_company_id,
                    IsDeleted: 0,
                    IsBlock: 0,
                    company_id: req.body.company_id
                };
            } else {
                where = {
                    IsDeleted: 0,
                    IsBlock: 0,
                    company_id: req.body.company_id
                };
            }

            await CompanyDepartment.findAll({
                include: [{
                    model: MasterDepartment,
                    required: true,
                    where: {IsDeleted: 0}
                }],
                where: where
            }).then(data => {

                if (data.length != 0) {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 0,
                        message: "data have been fetched successfully.",
                        data: data
                    });

                } else {
                    res.status(responseCodes.BAD_REQUEST).json({
                        response_code: 0,
                        message: "No data were found, please add the department",
                        data: data
                    });

                }

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

    async getCompanyDepartmentList(req: Request, res: Response) {
        try {
            await CompanyDepartment.findAll({
                include: [{
                    model: MasterDepartment,
                    required: true,
                    where: {IsDeleted: 0},
                    attributes: ['id', 'company_id', 'name', 'descripition']
                }, {
                    model: Users,
                    required: true,
                    where: {IsDeleted: 0},
                    attributes: ['id', 'company_id', 'email', 'password', 'password_wordpress']
                }],
                where: {
                    IsDeleted: 0,
                    company_id: req.body.company_id
                }
            }).then(data => {

                if (data.length != 0) {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: "data have been fetched successfully.",
                        data: data
                    });
                } else {
                    res.status(responseCodes.BAD_REQUEST).json({
                        response_code: 0,
                        message: "No data were found, please add the department",
                        data: data
                    });
                }
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

    async blockUnblockCompanyDepartment(req: Request, res: Response) {
        try {
            await CompanyDepartment.findOne({
                where: {
                    id: req.body.company_department_id,
                    IsDeleted: 0
                }
            }).then(async (CompanyDepartmentData: any) => {
                if (CompanyDepartmentData != null) {

                    let CompanyDepartmentUpdate = {
                        IsBlock: (CompanyDepartmentData.IsBlock == 1) ? 0 : 1,
                        updated_by: req.body.updated_by,
                        updatedAt: responseStrings.currentTime
                    }

                    await CompanyDepartment.update({...CompanyDepartmentUpdate}, {
                        where: {
                            id: req.body.company_department_id
                        }
                    }).then(async (SubCompanyResult) => {
                        let SubCompanyUserUpdate = {
                            IsBlock: (CompanyDepartmentData.IsBlock == 1) ? 0 : 1,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime
                        }

                        await Users.update({...SubCompanyUserUpdate}, {
                            where: {
                                id: CompanyDepartmentData.login_table_id
                            }
                        }).then(async (UsersResult) => {
                            let message = (CompanyDepartmentData.IsBlock == 1) ? "unblock" : "block";

                            res.status(responseCodes.SUCCESS).json({
                                response_code: 1,
                                message: "Department successfully " + message + "."
                            });
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
                        message: "Oops! This Department was either deleted or did not exist."
                    });
                }
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

    async editCompanyDepartment(req: Request, res: Response) {
        try {
            await CompanyDepartment.findOne({
                where: {
                    id: req.body.company_department_id,
                    IsDeleted: 0
                }
            }).then(async (CompanyDepartmentData: any) => {
                if (CompanyDepartmentData != null) {

                    let CompanyDepartmentUpdate = {
                        name: req.body.username,
                        contactNumber: req.body.contactNumber,
                        designation: req.body.designation,
                        updated_by: req.body.updated_by,
                        updatedAt: responseStrings.currentTime
                    }

                    await CompanyDepartment.update({...CompanyDepartmentUpdate}, {
                        where: {
                            id: req.body.company_department_id
                        }
                    }).then(async (CompanyDepartmentResult) => {

                        let MasterDepartmentUpdate = {
                            name: req.body.name,
                            descripition: req.body.descripition,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime
                        }

                        await MasterDepartment.update({...MasterDepartmentUpdate}, {
                            where: {
                                id: CompanyDepartmentData.department_id
                            }
                        }).then((MasterDepartmentResult) => {
                            res.status(responseCodes.SUCCESS).json({
                                response_code: 1,
                                message: "Department update successfully."
                            });
                        })
                    }).catch(err => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
                } else {
                    res.status(responseCodes.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Oops! This Branch was deleted or not exist."
                    });
                }
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

}

export default new CompanyDepartmentController();