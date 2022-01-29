import e, { Request, Response } from "express";
import { body } from "express-validator";
import moment from "moment";
import { Op } from "sequelize";
import Company from "../../model/root/company.model";
import Subscription from "../../model/root/subscription.model";

class SubscriptionController {

    async total_subscription(req: Request, res: Response) {
        const now = moment(new Date()).format("YYYY-MM-DD");

        var subscription_count = await Subscription.count({
            where: {
                IsDeleted: 0,
                expiry_date: {
                    [Op.gt]: now
                }
            }
        }).catch(err => {

            res.status(500).json({ response_code: 0, message: err });
        });

        res.status(200).json({ response_code: 1, count: subscription_count });
    }

    async createNewSubscription(req: Request, res: Response) {

        var checkSubscriptionExist = await Subscription.findOne({
            where: {
                curriculum_id: req.body.curriculum_id,
                company_id: req.body.company_id,
                status: "0"
            },
            logging: console.log
        }).catch(err => {

            res.status(500).json({ response_code: 0, message: err });
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
                res.status(200).json({ response_code: 1, message: "New Subscription Created" });

            }).catch(function (err) {
                res.status(500).json({ response_code: 0, message: err });
            });
        }
        else {
            res.status(500).json({ response_code: 0, message: "Subscription Already Exist" });
        }


    }

    async updateSubscription(req:Request,res:Response)
    {
        let subscription_id=req.body.subscription_id;

        let check_subscription_is_valid=await Subscription.findOne({
            where:{
                id:subscription_id,
                IsDeleted:0
            },
            logging:console.log
        }).catch(err=>{
            res.status(500).json({response_code:0,message:err});
        });

        if(check_subscription_is_valid != null)
        {
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
                updatedAt:req.body.updatedAt
            };

            await Subscription.update({...subscriptionData},{where:{id:subscription_id}}).
            then(function(response)
            {
                res.status(200).json({ response_code: 1, message: "Subscription Update Successfully"});

            }).catch(err=>{
                res.status(500).json({ response_code: 0, message: err });
            });
        }
        else
        {
            res.status(400).json({response_code:0,message:"Invalid Subscription please check subscription id or subscription is deleted"});
        }

    }

    async getSubscription(req: Request, res: Response) {
        try {

            let company_id = '';
            let whereCondition = {};
            console.log(company_id);

            if (req.body.company_id) 
            {
                company_id=req.body.company_id;
                whereCondition = { company_id: company_id, IsDeleted: 0 };
                
            }
            else
            {
                whereCondition = { IsDeleted: 0 };
            }

            const subscriptionData = await Subscription.findAll({
                include:[{
                    model:Company,
                    required:true //Inner JOIN
                }],
                where: whereCondition,
                logging: console.log

            }).catch(err => {
                res.status(500).json({ response_code: 0, message: err });
            });

            if (subscriptionData != null) 
            {
                res.status(200).json({ response_code: 1, message: "subscription fetched successfully...", data: subscriptionData });
            }
            else 
            {
                res.status(200).json({ response_code: 0, message: "no subscription found" });
            }

        }
        catch(err)
        {
            res.status(500).json({ response_code: 0, message: err });
        }
        
    }

    async deleteSubscription(req:Request,res:Response)
    {
        let subscription_id=req.body.subscription_id;

        let check_subscription_is_valid=await Subscription.findOne({
            where:{
                id:subscription_id,
                IsDeleted:0
            },
            logging:console.log
        }).catch(err=>{
            res.status(500).json({response_code:0,message:err});
        });

        if(check_subscription_is_valid != null)
        {
            var subscriptionData = {
                IsDeleted: 1,
                updated_by: req.body.updated_by,
                deletedAt: req.body.deletedAt,
            };

            await Subscription.update({...subscriptionData},{where:{id:subscription_id}}).
            then(function(response)
            {
                res.status(200).json({ response_code: 1, message: "Subscription Deleted Successfully" });

            }).catch(err=>{
                res.status(500).json({ response_code: 0, message: err });
            });
        }
        else
        {
            res.status(400).json({response_code:0,message:"Invalid Subscription please check subscription id or subscription already deleted"});
        }

    }
}

export default new SubscriptionController();