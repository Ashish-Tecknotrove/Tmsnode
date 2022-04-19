import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');

import Subscription from "../../../../core/model/root/subscription.model";
import Curriculum from "../../../../core/model/root/curriculum.model";
import Trainee from "../../../../core/model/root/trainee.model";
import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import { Op } from "sequelize";
import moment from "moment";

class SubscriptionController {

    async getSubscriptionByCompany(req: Request, res: Response) {
        try {

            const subscriptionData = await Subscription.findAll({
                include: [
                    {
                        model: Curriculum,
                        required: false,
                        attributes: ['id', 'company_id', 'name']
                    }
                ],
                where: {
                    company_id: req.body.company_id,
                    IsDeleted: 0,
                    expiry_date: {
                        [Op.gt]: moment(new Date()).format("YYYY-MM-DD")
                    }
                },
                attributes: ['id', 'curriculum_id', 'company_id', 'technology_type', 'day_no', 'calender_type', 'licence_no', 'licenceType', 'payment_type', 'activation_date', 'expiry_date']
                // logging: console.log

            }).then(async (result: any) => {
                if (result.length != 0) {
                    for (let i = 0; i < result.length; i++) {
                        await Trainee.findAll({
                            include: [
                                {
                                    model: TraineeCurriculum,
                                    where: {
                                        IsDeleted: 0,
                                        curriculum_id: result[i]['curriculum_id']
                                    },
                                    // group: ['trainee_id']
                                },

                            ],
                            where: {
                                IsDeleted: 0
                            },
                            // group: ['trainees.id','trainee_curriculum.trainee_id'],
                            // logging:console.log
                        }).then((count:any) => {
                            // console.log(data);
                            result[i]['dataValues']['userSubscription'] = count.length;
                            result[i]['dataValues']['pendingSubscription'] = result[i]['licence_no'] - count.length;

                        }).catch(err => {
                            console.log(err.message);
                        });

                    }


                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: "data have been fetched successfully",
                        data: result
                    });

                } else {
                    res.status(responseCodes.SUCCESS).json({response_code: 0, message: "No data were found", data: []});

                }
            }).catch((err: any) => {
                console.log(err);
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

export default new SubscriptionController();