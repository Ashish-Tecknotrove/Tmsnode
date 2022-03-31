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
import { Op } from "sequelize";
import Subscription from "../core/model/root/subscription.model";
import responseStrings from "../core/strings/response-strings";
import { verify } from "jsonwebtoken";

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

            if (userdata === null) 
            {
                return res.status(ResponseCodes.UNAUTHORIZED).json({response_code: 0, message: "Oops! We didn't recognize you . please enter valid username and password", data: ''})
            }
            else 
            {

                var user_type = userdata['user_type'];


                //TODO Authentication Token----------
                var payload = {username: userdata['email']};
                //TODO Authentication  Token----------


                if (userdata['is_admin'] == 1) 
                {
                    let authentication_token = await auth.generateAuth(payload,1);

                    return res.status(ResponseCodes.SUCCESS).json(
                        {
                            response_code: 1,
                            token: authentication_token,
                            user: "Super Admin",
                            user_type:user_type,
                            message: "Welcome! user logged in successfully.",
                            data: userdata
                        });
                }
                else {
                    if (user_type == '5')
                    {
                        let authentication_token = await auth.generateAuth(payload,5);
                        var trainee_data = await Trainee.findOne({
                            include: [
                                {model: Users},
                                {model: Company}
                            ],
                            where: {
                                login_table_id: userdata['id']
                            }
                        });

                        if (trainee_data != null) {
                            return res.status(ResponseCodes.SUCCESS).json(
                                {
                                    response_code: 1,
                                    token: authentication_token,
                                    user_type: "Trainee",
                                    message: 'user login successfully...',
                                    data: trainee_data
                                });
                        }
                        else {
                            return res.status(ResponseCodes.UNAUTHORIZED).json(
                                {
                                    response_code: 0,
                                    message: 'Trainee Not Found',
                                    data: ''
                                });
                        }
                    }
                    else if (user_type == '4') 
                    {
                        let authentication_token = await auth.generateAuth(payload,4);
                        await Trainee.findOne({
                            include:[
                                {model:Users},
                                {model:Company}
                            ],
                            where:{
                                login_table_id: userdata['id'],
                                IsDeleted:0,
                                IsBlock:0
                            }
                        }).then((traineeData:any)=>
                        {
                            if(traineeData.length != 0)
                                {
                                    const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/"+traineeData['Company']['picture']);
                                    return res.status(ResponseCodes.SUCCESS).json(
                                        {
                                            response_code: 1,
                                            token: authentication_token,
                                            logo:filePath,
                                            user_type: 4,
                                            message: 'Welcome! user logged in successfully.',
                                            data: traineeData
                                        });
                                }
                                else
                                {
                                    return res.status(ResponseCodes.BAD_REQUEST).json(
                                        {
                                            response_code: 0,
                                            message: "Oops! sorry you cannot login please contact with your administrator."
                                        });
                                }
                        }).catch(err=>{

                        });
                    }
                    else if (user_type == '3')//Company Trainer
                    {
                        let authentication_token = await auth.generateAuth(payload,3);
                        var trainerData=await Trainer.findOne({
                            include:[
                                {model:Users},
                                {model:Company}
                            ],
                            where:{
                                login_table_id: userdata['id'],
                                IsDeleted:0,
                                IsBlock:0
                            }
                        }).then((trainerData:any)=>
                        {
                            //!Check SUBSCRIPTION IS ACTIVE OR NOT
                            Subscription.findAll({
                                where: {
                                  expiry_date: { [Op.gte]: responseStrings.currentDate },
                                  activation_date: { [Op.lte]: responseStrings.currentDate },
                                  IsDeleted: 0,
                                  company_id: trainerData['company_id'],
                                },
                              }).then(subData=>{

                                if(subData.length != 0)
                                {
                                    const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/"+trainerData['Company']['picture']);
                                    return res.status(ResponseCodes.SUCCESS).json(
                                        {
                                            response_code: 1,
                                            token: authentication_token,
                                            logo:filePath,
                                            user_type: 3,
                                            message: 'Welcome! user logged in successfully.',
                                            data: trainerData
                                        });
                                }
                                else
                                {
                                    return res.status(ResponseCodes.BAD_REQUEST).json(
                                        {
                                            response_code: 0,
                                            message: "Oops! sorry you cannot login please contact with your administrator."
                                        });
                                }

                              }).catch(err=>
                            {
                                return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                    {
                                        response_code: 0,
                                        message: err.message
                                    });
                              })

                        }).catch(err=>{

                            return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json(
                                {
                                    response_code: 0,
                                    message: err.message
                                });
                        });
                    }
                    else if (user_type == '2')//Company User
                    {
                        let authentication_token = await auth.generateAuth(payload,2);
                       var company_data=await CompanyUser.findOne({
                        include: [
                            {model: Users},
                            {model: Company,
                                include:[
                                    {
                                        model:MasterPanel,
                                        required:false,
                                        include:[
                                            {
                                                model:Mastermenu,
                                                separate: true,
                                                order:[['sequence','ASC']]
                                                //:{IsDeleted:0}
                                            }
                                        ]
                                    }
                                ]                      
                            },
                        ],
                        where:{
                            canlogin:1,
                            login_table_id: userdata['id'],
                            IsDeleted:0
                        },
                        //logging:console.log
                       }).then((data:any)=>{

                        if(data != null)
                        {
                            const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/"+data['Company']['picture']);
                            return res.status(ResponseCodes.SUCCESS).json(
                                {
                                    response_code: 1,
                                    token: authentication_token,
                                    logo:filePath,
                                    user_type: 2,
                                    message: 'Welcome! user logged in successfully.',
                                    data: data
                                });
                        }
                        else
                        {
                            return res.status(ResponseCodes.SUCCESS).json(
                                {
                                    response_code: 0,
                                    message: "Oops! We didn't recognize you . please enter valid username and password"
                                });
                        }
                        

                       }).catch(err=>{

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

        }
        catch (e:any) {
            return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({message: e.message});
        }
    }


    async verify_token(req:Request , res:Response)
    {
        try
        {
            const token = req.body.access_token;
            const userType=req.body.user_type;

            let secreate="";

            if(userType == 1)
            {
                secreate = process.env.jwt_superadminsecreate as string;
            }
            else if(userType == 2)
            {
                secreate = process.env.jwt_companyadminsecreate as string;
            }
            else if(userType == 3)
            {
                secreate = process.env.jwt_trainersecreate as string;
            }
            else if(userType == 4)
            {
                secreate = process.env.jwt_traineesecreate as string;
            }
            else{
                return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:"Invalid User Type"});

            }

            if(token == null) return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:"Oops! we cannot process the request without authentication token"});

            await verify(token,secreate as string, (err:any , user:any)=>
            {
                
                if (err)
                {
                    return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:err.message});
                }
                else
                {
                    return res.status(ResponseCodes.SUCCESS).json({response_code:1,message:"Authorized User"});
                }  
            });
            
            
        }
        catch(error:any)
        {
            res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({response_code:1,message:error.message});
        }
    }
}


export default new AuthController();



