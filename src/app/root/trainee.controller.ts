import { Request, Response } from "express";
import Trainee from "../../model/root/trainee.model";
import Users from "../../model/root/users.model";
import responseCodes from "../../strings/response-codes";
import responseStrings from "../../strings/response-strings";
import * as fs from "fs";
import { parse } from "csv-parse";

class TraineeController {

    async getTraineeCount(req: Request, res: Response) {
        try {
            await Trainee.count({
                where: {
                    company_id: req.body.company_id,
                    IsDeleted: 0
                },

            }).then(data => {
                res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Trainee count fetched successfully...", count: data });

            }).catch(err => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            });
        }
        catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
        }



    }

    async registerNewTrainee(req: Request, res: Response) {
        try {
            let check_trainee_exits = await Trainee.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0
                }
            });

            let check_trainee_login_exist = await Users.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0
                }
            });

            if (check_trainee_exits.length != 0 && check_trainee_login_exist.length != 0) {
                await Trainee.create({ ...req.body }).then(data => {
                    var user_login_body =
                    {
                        email: req.body.email,
                        password: req.body.password,
                        user_type: 3,
                        language: req.body.language,
                        createdAt: responseStrings.currentTime,
                        updatedAt: '',
                        created_by: req.body.created_by
                    };

                    Users.create({ ...req.body }).then(data => {

                        res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Trainee added successfully..." });

                    }).catch(err => {

                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });

                    });


                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            else if (check_trainee_exits.length != 0 && check_trainee_login_exist.length == 0) {
                var user_login_body =
                {
                    email: req.body.email,
                    password: req.body.password,
                    user_type: 3,
                    language: req.body.language,
                    createdAt: responseStrings.currentTime,
                    updatedAt: '',
                    created_by: req.body.created_by
                };

                Users.create({ ...req.body }).then(data => {

                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Trainee Already Exits \n But Login Crediantial Not Found \n Login Crediantial Created" });

                }).catch(err => {

                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });

                });
            }
            else {
                res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: "Trainee With Same Email Already Exist" });
            }


        }
        catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
        }
    }

    async bulkInsertTrainee(req: Request, res: Response) {
        //var course_id = req.body.course_id;

        // console.log(req.file?.filename);
        try {
            const csv_file = req.file?.buffer;

            const header = ['first_name', 'last_name'];

            parse(csv_file!, {
                delimiter: ',',
                columns: header,
              }, (error, result) => {
                if (error) {
                  console.error(error);
                }
            
                console.log("Result", result);
              });

        }
        catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
        }
    }


}

export default new TraineeController();
