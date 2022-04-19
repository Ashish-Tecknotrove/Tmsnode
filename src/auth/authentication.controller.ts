import {Request, Response} from "express";
import auth from "../core/middleware/auth";
import Languages from "../core/model/language/language.model";
import Company from "../core/model/root/company.model";
import Trainee from "../core/model/root/trainee.model";
import Trainer from "../core/model/root/trainer.model";
import Users from "../core/model/root/users.model";
import dotenv from 'dotenv';
import ResponseStrings from "../core/strings/response-strings";
import ResponseCodes from "../core/strings/response-codes";
import CompanyUser from "../core/model/root/compayuser.model";
import MasterPanel from "../core/model/root/masterpanel.model";
import Mastermenu from "../core/model/root/mastermenu.model";
import {Op} from "sequelize";
import Subscription from "../core/model/root/subscription.model";
import responseStrings from "../core/strings/response-strings";
import {verify} from "jsonwebtoken";
import SubCompany from "../core/model/root/subcompany.model";
import CompanyDepartment from "../core/model/root/company_department.model";
import MasterDepartment from "../core/model/root/master_department.model";

dotenv.config();

class AuthController {

    //UserLogin
    async login(req: Request, res: Response) {
        try {

            //TODO Parameters
            const username = req.body.username;
            const password = req.body.password;

            const userdata = await Users.findOne({
                include: [
                    {model: Languages},
                    {model: Company}
                ],
                where: {
                    email: username,
                    password: password,
                    IsDeleted: 0
                },
            });

            if (userdata === null) {
                return res.status(ResponseCodes.UNAUTHORIZED).json({
                    response_code: 0,
                    message: "Oops! We didn't recognize you . please enter valid username and password",
                    data: ''
                })
            }
            else {

                var user_type = userdata['user_type'];
                var check_user_is_blocked = userdata['IsBlock'];

                //TODO IF User Is Blocked 
                if (check_user_is_blocked == 0) {
                    //TODO Authentication Token----------
                    var payload = {username: userdata['email']};
                    //TODO Authentication  Token----------


                    if (userdata['is_admin'] == 1) {
                        let authentication_token = await auth.generateAuth(payload, 1);

                        return res.status(ResponseCodes.SUCCESS).json(
                            {
                                response_code: 1,
                                token: authentication_token,
                                user: "Super Admin",
                                user_type: user_type,
                                message: "Welcome! user logged in successfully.",
                                data: userdata
                            });
                    }
                    else {
                        if (user_type == '6') {
                            let authentication_token = await auth.generateAuth(payload, 6);

                            await Company.findOne({
                                where: {
                                    id: userdata["company_id"],
                                    IsDeleted: 0
                                }
                            }).then(async (companyPlan:any) => {

                                if(companyPlan != null)
                                {
                                    //?? GOLD
                                    if(companyPlan["panel_id"] == 2)
                                    {
                                        await CompanyDepartment.findOne({
                                            attributes: {exclude: ["created_by", "updated_by", "deleted_by", "createdAt", "updatedAt", "deletedAt", "IsDeleted", "IsBlock"]},
                                            include:[
                                            {
                                                model: Users,
                                                attributes: ["id", "company_id", "email", "aadhar_no", "mobile_no", "language", "portal_language"]
                                            },
                                            {
                                                model:Company,
                                                attributes: ["id", "company_name", "picture", "panel_id", "address"],
                                                required:true,
                                                where:{
                                                    
                                                    IsDeleted:0
                                                }
                                            },{model:MasterDepartment,attributes:["id","name"]}
                                        ],
                                            where:{
                                                login_table_id:userdata['id'],
                                                IsBlock:0,
                                                IsDeleted:0
                                            }
                                        }).then((department_data: any) => {
                                            if (department_data != null) {
            
                                                const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/" + department_data['Company']['picture']);
                                                return res.status(ResponseCodes.SUCCESS).json(
                                                    {
                                                        response_code: 1,
                                                        token: authentication_token,
                                                        user_type: 6,
                                                        logo: filePath,
                                                        message: 'user login successfully...',
                                                        data: department_data
                                                    });
                                            }
                                            else {
                                                return res.status(ResponseCodes.UNAUTHORIZED).json(
                                                    {
                                                        response_code: 0,
                                                        message: 'Branch User Not Found.',
                                                        data: ''
                                                    });
                                            }
                                        }).catch(err => {
                                            return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                                {
                                                    response_code: 0,
                                                    message: err.message
                                                });
                                        });
                                    }
                                    
                                    //?? PLATINUM
                                    if(companyPlan["panel_id"] == 3)
                                    {
                                        await CompanyDepartment.findOne({
                                            attributes: {exclude: ["created_by", "updated_by", "deleted_by", "createdAt", "updatedAt", "deletedAt", "IsDeleted", "IsBlock"]},
                                            include:[
                                                {
                                                    model:Company,
                                                    attributes: ["id", "company_name", "picture", "address","panel_id"],
                                                    required:true,
                                                    where:{
                                                        IsDeleted:0
                                                    }
                                                },
                                            {
                                                model:SubCompany,
                                                attributes: ["id", "name","description","username","contact_no"]

                                            },
                                            {
                                                model: Users,
                                                attributes: ["id", "company_id", "email", "aadhar_no", "mobile_no", "language", "portal_language"]
                                            },
                                            {model:MasterDepartment,attributes:["id","name"]}
                                            ],
                                            where:{
                                                login_table_id:userdata['id'],
                                                IsBlock:0,
                                                IsDeleted:0
                                            }
                                        }).then((department_data: any) => {
                                            if (department_data != null) {
            
                                                const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/" + department_data['Company']['picture']);
                                                return res.status(ResponseCodes.SUCCESS).json(
                                                    {
                                                        response_code: 1,
                                                        token: authentication_token,
                                                        user_type: 6,
                                                        logo: filePath,
                                                        message: 'user login successfully...',
                                                        data: department_data
                                                    });
                                            }
                                            else {
                                                return res.status(ResponseCodes.UNAUTHORIZED).json(
                                                    {
                                                        response_code: 0,
                                                        message: 'Branch User Not Found.',
                                                        data: ''
                                                    });
                                            }
                                        }).catch(err => {
                                            return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                                {
                                                    response_code: 0,
                                                    message: err.message
                                                });
                                        });
                                    }

                                }
                                else
                                {
                                    return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                        {
                                            response_code: 0,
                                            message: "Oops ! company is blocked or deleted"
                                        });
                                }

                            }).catch(err => {

                                return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                    {
                                        response_code: 0,
                                        message: err.message
                                    });
                            })
                        }
                        else if (user_type == '5') {
                            let authentication_token = await auth.generateAuth(payload, 5);
                            var sub_company_data = await SubCompany.findOne({
                                attributes: {exclude: ["created_by", "updated_by", "deleted_by", "createdAt", "updatedAt", "deletedAt", "IsDeleted", "IsBlock"]},
                                include: [
                                    {
                                        model: Users,
                                        attributes: ["id", "company_id", "email", "aadhar_no", "mobile_no", "language", "portal_language"]
                                    },
                                    {model: Company,
                                         attributes: ["id", "company_name", "picture", "address"],
                                         where:{IsDeleted: 0}}
                                ],
                                where: {
                                    login_table_id: userdata['id'],
                                    IsBlock: 0,
                                    IsDeleted: 0
                                }
                            }).then((sub_company_data: any) => {
                                if (sub_company_data != null) {

                                    const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/" + sub_company_data['Company']['picture']);
                                    return res.status(ResponseCodes.SUCCESS).json(
                                        {
                                            response_code: 1,
                                            token: authentication_token,
                                            user_type: 5,
                                            logo: filePath,
                                            message: 'user login successfully...',
                                            data: sub_company_data
                                        });
                                }
                                else {
                                    return res.status(ResponseCodes.UNAUTHORIZED).json(
                                        {
                                            response_code: 0,
                                            message: 'Branch User Not Found.',
                                            data: ''
                                        });
                                }
                            }).catch(err => {
                                return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                    {
                                        response_code: 0,
                                        message: err.message
                                    });
                            });


                        }
                        else if (user_type == '4') {
                            let authentication_token = await auth.generateAuth(payload, 4);
                            await Trainee.findOne({
                                include: [
                                    {model: Users},
                                    {model: Company}
                                ],
                                where: {
                                    login_table_id: userdata['id'],
                                    IsDeleted: 0,
                                    IsBlock: 0
                                }
                            }).then((traineeData: any) => {
                                if (traineeData.length != 0) {
                                    const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/" + traineeData['Company']['picture']);
                                    return res.status(ResponseCodes.SUCCESS).json(
                                        {
                                            response_code: 1,
                                            token: authentication_token,
                                            logo: filePath,
                                            user_type: 4,
                                            message: 'Welcome! user logged in successfully.',
                                            data: traineeData
                                        });
                                }
                                else {
                                    return res.status(ResponseCodes.BAD_REQUEST).json(
                                        {
                                            response_code: 0,
                                            message: "Oops! sorry you cannot login please contact with your administrator."
                                        });
                                }
                            }).catch(err => {
                                return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                    {
                                        response_code: 0,
                                        message: err.message
                                    });
                            });
                        }
                        else if (user_type == '3')//Company Trainer
                        {
                            let authentication_token = await auth.generateAuth(payload, 3);
                            var trainerData = await Trainer.findOne({
                                include: [
                                    {model: Users},
                                    {model: Company}
                                ],
                                where: {
                                    login_table_id: userdata['id'],
                                    IsDeleted: 0,
                                    IsBlock: 0
                                }
                            }).then((trainerData: any) => {
                                //!Check SUBSCRIPTION IS ACTIVE OR NOT
                                Subscription.findAll({
                                    where: {
                                        expiry_date: {[Op.gte]: responseStrings.currentDate},
                                        activation_date: {[Op.lte]: responseStrings.currentDate},
                                        IsDeleted: 0,
                                        company_id: trainerData['company_id'],
                                    },
                                }).then(subData => {

                                    if (subData.length != 0) {
                                        const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/" + trainerData['Company']['picture']);
                                        return res.status(ResponseCodes.SUCCESS).json(
                                            {
                                                response_code: 1,
                                                token: authentication_token,
                                                logo: filePath,
                                                user_type: 3,
                                                message: 'Welcome! user logged in successfully.',
                                                data: trainerData
                                            });
                                    }
                                    else {
                                        return res.status(ResponseCodes.BAD_REQUEST).json(
                                            {
                                                response_code: 0,
                                                message: "Oops! sorry you cannot login please contact with your administrator."
                                            });
                                    }

                                }).catch(err => {
                                    return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                        {
                                            response_code: 0,
                                            message: err.message
                                        });
                                })

                            }).catch(err => {

                                return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                    {
                                        response_code: 0,
                                        message: err.message
                                    });
                            });
                        }
                        else if (user_type == '2')//Company User
                        {
                            let authentication_token = await auth.generateAuth(payload, 2);
                            var company_data = await CompanyUser.findOne({
                                include: [
                                    {model: Users},
                                    {
                                        model: Company,
                                        include: [
                                            {
                                                model: MasterPanel,
                                                required: false,
                                                include: [
                                                    {
                                                        model: Mastermenu,
                                                        separate: true,
                                                        order: [['sequence', 'ASC']]
                                                        //:{IsDeleted:0}
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                ],
                                where: {
                                    canlogin: 1,
                                    login_table_id: userdata['id'],
                                    IsDeleted: 0
                                },
                                //logging:console.log
                            }).then((data: any) => {

                                if (data != null) {
                                    const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/" + data['Company']['picture']);
                                    return res.status(ResponseCodes.SUCCESS).json(
                                        {
                                            response_code: 1,
                                            token: authentication_token,
                                            logo: filePath,
                                            user_type: 2,
                                            message: 'Welcome! user logged in successfully.',
                                            data: data
                                        });
                                }
                                else {
                                    return res.status(ResponseCodes.SUCCESS).json(
                                        {
                                            response_code: 0,
                                            message: "Oops! We didn't recognize you . please enter valid username and password"
                                        });
                                }


                            }).catch(err => {

                                return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                    {
                                        response_code: 0,
                                        message: err.message
                                    });
                            });
                        }
                        else {
                            return res.status(ResponseCodes.UNAUTHORIZED).json(
                                {
                                    response_code: 0,
                                    message: "Oops! no data found please enter valid username and password",
                                    data: ''
                                });
                        }
                    }
                }
                else {
                    res.status(ResponseCodes.BAD_REQUEST).json({message: "Oops ! please contact your company administrator you cannot access to this portal"});
                }


            }

        }
        catch (e: any) {
            return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({message: e.message});
        }
    }


    async verify_token(req: Request, res: Response) {
        try {
            const token = req.body.access_token;
            const userType = req.body.user_type;

            let secreate = "";

            if (userType == 1) {
                secreate = process.env.jwt_superadminsecreate as string;
            }
            else if (userType == 2) {
                secreate = process.env.jwt_companyadminsecreate as string;
            }
            else if (userType == 3) {
                secreate = process.env.jwt_trainersecreate as string;
            }
            else if (userType == 4) {
                secreate = process.env.jwt_traineesecreate as string;
            }
            else if (userType == 5) {
                secreate = process.env.jwt_branch_secreate as string;
            }
            else if (userType == 6) {
                secreate = process.env.jwt_department_secreate as string;
            }
            else {
                return res.status(ResponseCodes.UNAUTHORIZED).json({response_code: 0, message: "Invalid User Type"});
            }

            if (token == null) return res.status(ResponseCodes.UNAUTHORIZED).json({
                response_code: 0,
                message: "Oops! we cannot process the request without authentication token"
            });

            await verify(token, secreate as string, (err: any, user: any) => {

                if (err) {
                    return res.status(ResponseCodes.UNAUTHORIZED).json({response_code: 0, message: err.message});
                }
                else {
                    return res.status(ResponseCodes.SUCCESS).json({response_code: 1, message: "Authorized User"});
                }
            });


        }
        catch (error: any) {
            res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({response_code: 1, message: error.message});
        }
    }
}


export default new AuthController();



