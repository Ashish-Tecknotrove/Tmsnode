import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');

import SubCompany from "../../../../core/model/root/subcompany.model";
import Users from "../../../../core/model/root/users.model";
import CompanyDepartment from "../../../../core/model/root/company_department.model";
import MasterDepartment from "../../../../core/model/root/master_department.model";
import Trainer from "../../../../core/model/root/trainer.model";
import Trainee from "../../../../core/model/root/trainee.model";
import { Op } from "sequelize";

class SubCompanyController {

    async registerSubCompany(req: Request, res: Response) {
        try {
            //**Check Email Exist in Sub Company table */
            const check_sub_company_exist = await SubCompany.findAll({
                where: {
                    [Op.or]: [{email: req.body.email}],
                    IsDeleted: 0
                }
            });

            //** Check User exist in User table */

            const check_user_table = await Users.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0
                }
            });

            if (check_sub_company_exist.length == 0 && check_user_table.length == 0) {
                req.body.createdAt = responseStrings.currentTime;
                //**Add SubCompany */
                await SubCompany.create({...req.body}).then(subcompnaydata => {
                    var user_login_body =
                        {
                            company_id: req.body.company_id,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 5,
                            language: 1,
                            createdAt: responseStrings.currentTime,
                            updated_by: "",
                            updatedAt: '',
                            created_by: req.body.created_by
                        };

                    Users.create({...user_login_body}).then(userData => {

                        const updateId = {
                            login_table_id: userData["id"],
                        };

                        //**update the login id in Trainee Table */
                        SubCompany.update({...updateId}, {where: {id: subcompnaydata['id']}}).then(success => {

                            res.status(responseCodes.SUCCESS).json({
                                response_code: 1,
                                message: "Branch registered successfully..."
                            });

                        }).catch(err => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({message: "Oops! " + err.message});
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
                })

            }
                // else if(check_sub_company_exist.length !=0 && check_user_table.length ==0)
                // {
                //     var user_login_body =
                //     {
                //         company_id: req.body.company_id,
                //         email: req.body.email,
                //         password: req.body.password,
                //         user_type: 5,
                //         language:1,
                //         createdAt: responseStrings.currentTime,
                //         updated_by: "",
                //         updatedAt: '',
                //         created_by: req.body.created_by
                //     };

                //     Users.create({ ...user_login_body }).then(userData => {

                //         const updateId = {
                //             login_table_id: userData["id"],
                //         };

                //         //**update the login id in Trainee Table */
                //         SubCompany.update({ ...updateId }, { where: { id: check_sub_company_exist[0]['id'] } }).
                //             then(success => {

                //                 res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Branch Exist login created successfully..." });

                //             }).catch(err => {
                //                 res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ message:  "Oops! "+ err.message });
                //             });


                //     }).catch(err => {

                //         res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:  "Oops! "+ err.message });

                //     });
            // }
            else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Name or email of branch already exists, please use another one"
                });

            }
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});
        }
    }

    async getSubcompany(req: Request, res: Response) {
        try {

            await SubCompany.findAll({
                where: {
                    company_id: req.body.company_id,
                    IsDeleted: 0
                }
            }).then(success => {
                if (success.length != 0) {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 0,
                        message: "Branch fetched successfully...",
                        data: success
                    });

                } else {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 0,
                        message: "No data were found, please add the Branch"
                    });
                }

            }).catch(err => {

                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:  "Oops! "+ err.message });

            });

        }
        catch(err:any)
        {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});

        }
    }

    async getSubcompany_detail_info(req: Request, res: Response) {
        try {

            await SubCompany.findAll({
                include: [{
                    //*GET DEPARTMENT
                    required: false,//!Outer Join
                    model: CompanyDepartment,
                    include: [
                        {
                            model: MasterDepartment,
                        },
                        {
                            model: Trainer,
                            required: false,
                            where: {IsDeleted: 0}
                        },
                        {
                            model: Trainee,
                            required: false,
                            where: {IsDeleted: 0}
                        }
                    ],
                    where: {IsDeleted: 0}
                },
                    {
                        //*GET Trainer
                        required: false,//!Outer Join
                        model: Trainer,
                        where: {IsDeleted: 0}
                    },
                    {
                        //*GET Trainee
                        required: false,
                        model: Trainee,
                        where: {IsDeleted: 0}
                    }

                ],
                //logging:console.log,
                where: {company_id: req.body.company_id, IsDeleted: 0},
                order: [["id", "DESC"]]
            }).then(resData => {

                if (resData.length != 0) {
                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "data have been fetched successfully",data:resData});
                }
                else
                {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 0,
                        message: "No data were found, please add the Branch"
                    });

                }


            }, err => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });

            })

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});
        }
    }

    async assign_department_to_subcompany(req: Request, res: Response) {
        try {
            var sub_company_id = req.body.sub_company_id;
            var department_id = req.body.department_id;

            //**This Query Checking the two Paramenter email or branch and department edited by Ashish Rhatwal */
            var check_email_exist = await CompanyDepartment.findAll({
                where: {
                    [Op.or]: [{[Op.and]: [{sub_company_id: sub_company_id}, {department_id: req.body.department_id}]}, {email: req.body.email}],
                    IsDeleted: 0
                },

            });

            var check_user_exist = await Users.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0
                },
                logging: console.log
            });
            console.log(check_email_exist.length + " " + check_user_exist.length);

            if (check_email_exist.length == 0 && check_user_exist.length == 0) {

                await CompanyDepartment.create({...req.body}).then(cData => {
                    const user_login_data = {
                        company_id: req.body.company_id,
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
                        CompanyDepartment.update({...updateData}, {where: {id: cData['id']}}).then(succ => {

                            res.status(responseCodes.SUCCESS).json({
                                response_code: 1,
                                message: "Department assigned successfully and Login created."
                            });

                        }).catch(err => {
                            res.status(responseCodes.BAD_REQUEST).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });

                        })

                    }).catch(err => {

                        res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Oops! " + err.message});
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
                    message: "Oops! Email already exists or department has alloted to this branch"
                });

            }

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});
        }
    }

    async assign_trainer_to_subcompany(req: Request, res: Response) {
        try {
            var sub_company_id = req.body.sub_company_id;
            var trainer_id = req.body.trainer_id;
            var company_id = req.body.company_id;

            var check_sub_company_exist = await SubCompany.findAll({
                where: {
                    id: sub_company_id
                }
            });

            if (check_sub_company_exist.length != 0) {
                var update = {
                    sub_company_id: sub_company_id,
                    updated_by: req.body.updated_by,
                    updatedAt: responseStrings.currentTime
                };

                await Trainer.update({...update}, {where: {id: trainer_id}}).then(success => {

                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0,message: "Trainer assigned successfully..."});

                }).catch(err => {

                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0,message: "Oops! " + err.message});

                });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({response_code: 0,message: "Oops! An invalid Branch ID was entered, or this Branch was already deleted"});

            }
        }
        catch (err: any)
        {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});

        }
    }

    async getSubCompanyList(req: Request, res: Response) {
        try {

            await SubCompany.findAll({
                include:[{
                   model:Users,
                   where:{
                       IsDeleted: 0
                   },
                    attributes:['id','company_id','email','password','password_wordpress']
                }],
                where: {
                    company_id: req.body.company_id,
                    IsDeleted: 0
                },
                order: [
                    ["id", "DESC"],
                ],
            }).then(success => {
                if (success.length != 0) {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: "Branch fetched successfully...",
                        data: success
                    });

                } else {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 0,
                        message: "No data were found, please add the Branch"
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

    async block_unblock_subcompany(req: Request, res: Response) {
        try {
            await SubCompany.findOne({
                where: {
                    id: req.body.sub_company_id,
                    IsDeleted: 0
                }
            }).then(async (SubCompanyData: any) => {
                if (SubCompanyData != null) {

                    let SubCompanyUpdate = {
                        IsBlock: (SubCompanyData.IsBlock == 1) ? 0 : 1,
                        updated_by: req.body.updated_by,
                        updatedAt: responseStrings.currentTime
                    }

                    await SubCompany.update({...SubCompanyUpdate}, {
                        where: {
                            id: req.body.sub_company_id
                        }
                    }).then(async (SubCompanyResult) => {
                        let SubCompanyUserUpdate = {
                            IsBlock: (SubCompanyData.IsBlock == 1) ? 0 : 1,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime
                        }

                        await Users.update({...SubCompanyUserUpdate}, {
                            where: {
                                id: SubCompanyData.login_table_id
                            }
                        }).then(async (UsersResult) => {
                            let message = (SubCompanyData.IsBlock == 1) ? "unblock" : "block";

                            res.status(responseCodes.SUCCESS).json({
                                response_code: 1,
                                message: "Branch successfully " + message + "."
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
                        message: "Oops! This Branch was either deleted or did not exist."
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

    async edit_subcompany(req: Request, res: Response) {
        try {
            await SubCompany.findOne({
                where: {
                    id: req.body.sub_company_id,
                    IsDeleted: 0
                }
            }).then(async (SubCompanyData: any) => {
                if (SubCompanyData != null) {

                    let SubCompanyUpdate = {
                        name: req.body.name,
                        description: req.body.description,
                        username: req.body.username,
                        contact_no: req.body.contact_no,
                        designation: req.body.designation,
                        updated_by: req.body.updated_by,
                        updatedAt: responseStrings.currentTime
                    }

                    await SubCompany.update({...SubCompanyUpdate}, {
                        where: {
                            id: req.body.sub_company_id
                        }
                    }).then(async (SubCompanyResult) => {


                        res.status(responseCodes.SUCCESS).json({
                            response_code: 1,
                            message: "Branch update successfully."
                        });

                        // let SubCompanyUserUpdate = {
                        //     password: req.body.password,
                        //     password_wordpress: req.body.password,
                        //     updated_by: req.body.updated_by,
                        //     updatedAt: responseStrings.currentTime
                        // }
                        //
                        // await Users.update({...SubCompanyUserUpdate}, {
                        //     where: {
                        //         id: SubCompanyData.login_table_id
                        //     }
                        // }).then(async (UsersResult) => {
                        //     res.status(responseCodes.SUCCESS).json({
                        //         response_code: 1,
                        //         message: "Branch update successfully."
                        //     });
                        // }).catch(err => {
                        //
                        //     res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        //         response_code: 0,
                        //         message: "Oops! " + err.message
                        //     });
                        //
                        // });


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

export default new SubCompanyController();