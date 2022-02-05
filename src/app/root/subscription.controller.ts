import e, { Request, Response } from "express";
import moment from "moment";
import { Op } from "sequelize";
import Company from "../../model/root/company.model";
import Subscription from "../../model/root/subscription.model";
import responseCodes from "../../strings/response-codes";
import responseStrings from "../../strings/response-strings";

class SubscriptionController {

    async total_subscription(req: Request, res: Response) {

        try {
            const now = moment(new Date()).format("YYYY-MM-DD");

            await Subscription.count({
                where: {
                    IsDeleted: 0,
                    expiry_date: {
                        [Op.gt]: now
                    }
                }
            }).then((result) => {
                res.status(responseCodes.SUCCESS).json({ response_code: 1, count: result });
            }).catch(err => {

                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            });


        } catch (e) {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 1,
                message: e,
                data: "",
            });
        }

    }

    async createNewSubscription(req: Request, res: Response) {

        try {
            var checkSubscriptionExist = await Subscription.findOne({
                where: {
                    curriculum_id: req.body.curriculum_id,
                    company_id: req.body.company_id,
                    status: "0"
                },
                logging: console.log
            }).catch(err => {

                res.status(responseCodes.SUCCESS).json({ response_code: 0, message: responseStrings.EXISTS });
            });


            if (checkSubscriptionExist == null) {
                var actication_date = req.body.activation_date;
                var day_no = req.body.day_no;
                var calender_type = req.body.calender_type;

                //Calculate Expire Date
                var current = moment(actication_date, "YYYY-MM-DD").format("YYYY-MM-DD");
                var expiredate = moment(actication_date, "YYYY-MM-DD").add(day_no, calender_type).format("YYYY-MM-DD");

                var subscriptionData = {
                    curriculum_id: req.body.curriculum_id,
                    company_id: req.body.company_id,
                    day_no: req.body.day_no,
                    calender_type: req.body.calender_type,
                    licence_no: req.body.licence_no,
                    payment_type: req.body.payment_type,
                    activation_date: req.body.activation_date,
                    expiry_date: expiredate,
                    created_by: req.body.created_by,
                    createdAt: req.body.createdAt,
                };

                await Subscription.create({ ...subscriptionData }).then(function (data) {
                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.ADD });

                }).catch(function (err) {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                });
            }
            else {
                res.status(responseCodes.SUCCESS).json({ response_code: 0, message: responseStrings.EXISTS });
            }
        } catch (e) {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 1,
                message: e,
                data: "",
            });

        }


    }

    async updateSubscription(req: Request, res: Response) {

        try {
            let subscription_id = req.body.subscription_id;

            let check_subscription_is_valid = await Subscription.findOne({
                where: {
                    id: subscription_id,
                    IsDeleted: 0
                },
                logging: console.log
            }).catch(err => {
                res.status(responseCodes.SUCCESS).json({ response_code: 0, message: responseStrings.EXISTS });
            });

            if (check_subscription_is_valid != null) {
                var actication_date = req.body.activation_date;
                var day_no = req.body.day_no;
                var calender_type = req.body.calender_type;

                //Calculate Expire Date
                var current = moment(actication_date, "YYYY-MM-DD").format("YYYY-MM-DD");
                var expiredate = moment(actication_date, "YYYY-MM-DD").add(day_no, calender_type).format("YYYY-MM-DD");

                var subscriptionData = {
                    day_no: req.body.day_no,
                    calender_type: req.body.calender_type,
                    licence_no: req.body.licence_no,
                    payment_type: req.body.payment_type,
                    activation_date: req.body.activation_date,
                    expiry_date: expiredate,
                    updated_by: req.body.updated_by,
                    updatedAt: req.body.updatedAt
                };

                await Subscription.update({ ...subscriptionData }, { where: { id: subscription_id } }).
                    then(function (response) {
                        res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.UPDATED });

                    }).catch(err => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                    });
            }
            else {
                res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: "Invalid Subscription please check subscription id or subscription is deleted" });
            }
        } catch (e) {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 1,
                message: e,
                data: "",
            });

        }


    }

    async getSubscription(req: Request, res: Response) {
        try {

            let company_id = '';
            let whereCondition = {};
            console.log(company_id);

            if (req.body.company_id) {
                company_id = req.body.company_id;
                whereCondition = { company_id: company_id, IsDeleted: 0 };

            }
            else {
                whereCondition = { IsDeleted: 0 };
            }

            const subscriptionData = await Subscription.findAll({
                include: [{
                    model: Company,
                    required: true //Inner JOIN
                }],
                where: whereCondition,
                logging: console.log

            }).then((result) => {
                res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.GET, data: subscriptionData });
            }).catch(err => {
                res.status(responseCodes.SUCCESS).json({ response_code: 0, message: responseStrings.NOT });
            });

        }
        catch (err) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
        }

    }

    async deleteSubscription(req: Request, res: Response) {

        try {
            let subscription_id = req.body.subscription_id;

            let check_subscription_is_valid = await Subscription.findOne({
                where: {
                    id: subscription_id,
                    IsDeleted: 0
                },
                logging: console.log
            }).catch(err => {
                res.status(responseCodes.SUCCESS).json({ response_code: 0, message: responseStrings.NOT });
            });

            if (check_subscription_is_valid != null) {
                var subscriptionData = {
                    IsDeleted: 1,
                    updated_by: req.body.updated_by,
                    deletedAt: req.body.deletedAt,
                };

                await Subscription.update({ ...subscriptionData }, { where: { id: subscription_id } }).
                    then(function (response) {
                        res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.DELETE });

                    }).catch(err => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                    });
            }
            else {
                res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, message: "Invalid Subscription please check subscription id or subscription already deleted" });
            }
        } catch (err) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
        }



    }
}

export default new SubscriptionController();