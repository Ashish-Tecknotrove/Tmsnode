import {Request, Response} from "express";
import auth from "../../middleware/auth";
import Languages from "../../model/language/language.model";
import Company from "../../model/root/company.model";
import Trainee from "../../model/root/trainee.model";
import Trainer from "../../model/root/trainer.model";
import Users from "../../model/root/users.model";
import UserType from "../../model/root/usertype.model";
import {sign, verify} from "jsonwebtoken";
import dotenv from 'dotenv';
import ResponseStrings from "../../strings/response-strings";
import ResponseCodes from "../../strings/response-codes";
import CompanyUser from "../../model/root/compayuser.model";

dotenv.config();

class LoginController {

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
                // logging:console.log
            });

            if (userdata === null) {
                return res.status(ResponseCodes.UNAUTHORIZED).json({response_code: 0, message: 'invalid username or password', data: ''})
            }
            else {

                var user_type = userdata['user_type'];


                //TODO Authentication Token----------
                var payload = {username: userdata['name']};

                let authentication_token = await auth.generateAuth(payload);
                //TODO Authentication  Token----------


                if (userdata['is_admin'] == 1) {


                    return res.status(ResponseCodes.SUCCESS).json(
                        {
                            response_code: 1,
                            token: authentication_token,
                            user: "Super Admin",
                            user_type:user_type,
                            message: 'user login successfully...',
                            data: userdata
                        });
                }
                else {
                    if (user_type == '5')//Trainee
                    {
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
                    else if (user_type == '4') {
                        var trainer_data = await Trainer.findOne({
                            include: [
                                {model: Users},
                                {model: Company}
                            ],
                            where: {
                                login_table_id: userdata['id']
                            }
                        });

                        if (trainer_data != null) {
                            return res.status(ResponseCodes.SUCCESS).json(
                                {
                                    response_code: 1,
                                    token: authentication_token,
                                    user_type: "Trainer",
                                    message: 'user login successfully...',
                                    data: trainer_data
                                });
                        }
                        else {
                            return res.status(ResponseCodes.UNAUTHORIZED).json(
                                {
                                    response_code: 0,
                                    message: 'Trainer Not Found',
                                    data: ''
                                });
                        }
                    }
                    else if (user_type == '3')//Company User
                    {

                    }
                    else if (user_type == '2')//Company User
                    {
                       var company_data=await CompanyUser.findOne({
                        include: [
                            {model: Users},
                            {model: Company}
                        ],
                        where:{
                            canlogin:1,
                            login_table_id: userdata['id'],
                            IsDeleted:0
                        }
                       }).then(data=>{

                        if(data != null)
                        {
                            return res.status(ResponseCodes.SUCCESS).json(
                                {
                                    response_code: 1,
                                    token: authentication_token,
                                    user_type: 2,
                                    message: 'user login successfully...',
                                    data: data
                                });
                        }
                        else
                        {
                            return res.status(ResponseCodes.SUCCESS).json(
                                {
                                    response_code: 0,
                                    message: 'invalid username or password'
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
                                message: 'Trainee Not Found',
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

    async verify_token(req: Request, res: Response) {

        return res.status(ResponseCodes.SUCCESS).json({response_code: 1, message: ResponseStrings.tokenValid});
    }
}


export default new LoginController();
