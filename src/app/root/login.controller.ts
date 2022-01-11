import { Request, Response } from "express";
import auth from "../../middleware/auth";
import Languages from "../../model/language/language.model";
import Company from "../../model/root/company.model";
import Trainee from "../../model/root/trainee.model";
import Trainer from "../../model/root/trainer.model";
import Users from "../../model/root/users.model";
import UserType from "../../model/root/usertype.model";




class LoginController {

    //UserLogin
    async login(req: Request, res: Response) {
        try {

            //TODO Parameters
            const username = req.body.username;
            const password = req.body.password;

            const userdata = await Users.findOne({
                include: [
                    { model: Languages },
                    { model: Company }
                ],
                where:
                {
                    email: username,
                    password: password
                }
            });


            if (userdata === null) {
                return res.status(401).json({ response_code: 0, message: 'Invalid username or password', data: '' })
            }
            else {

                var user_type = userdata['user_type'];


                 //TODO Authentication Token----------
                 var payload = { username: userdata['name'] };
                 let authentication_token = await auth.generateAuth(payload);
                 //TODO Authentication  Token----------



                if (userdata['is_admin'] == 1) {


                    return res.status(200).json(
                        {
                            response_code: 1,
                            token: authentication_token,
                            user_type: "Super Admin",
                            message: 'user login successfully...',
                            data: userdata
                        });
                }
                else {
                    if (user_type == '5')//Trainee
                    {
                        var trainee_data = await Trainee.findOne({
                            include: [
                                { model: Users },
                                { model: Company }
                            ],
                            where: {
                                login_table_id: userdata['id']
                            }
                        });

                        if (trainee_data != null) {
                            return res.status(200).json(
                                {
                                    response_code: 1,
                                    token: authentication_token,
                                    user_type: "Trainee",
                                    message: 'user login successfully...',
                                    data: trainee_data
                                });
                        }
                        else {
                            return res.status(401).json(
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
                                { model: Users },
                                { model: Company }
                            ],
                            where: {
                                login_table_id: userdata['id']
                            }
                        });

                        if (trainer_data != null) {
                            return res.status(200).json(
                                {
                                    response_code: 1,
                                    token: authentication_token,
                                    user_type: "Trainer",
                                    message: 'user login successfully...',
                                    data: trainer_data
                                });
                        }
                        else {
                            return res.status(401).json(
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
                    else {
                        return res.status(401).json(
                            {
                                response_code: 0,
                                message: 'Trainee Not Found',
                                data: ''
                            });
                    }
                }

            }

        }
        catch (e) {
            return res.status(500).json({ message: e });
        }
    }
}


export default new LoginController();
