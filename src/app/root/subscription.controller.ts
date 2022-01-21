import { Request, Response } from "express";
import moment from "moment";
import { Op } from "sequelize";
import Subscription from "../../model/root/subscription.model";

class SubscriptionController
{

    async total_subscription(req: Request, res: Response)
    {
        const now = moment(new Date()).format("YYYY-MM-DD");

        var subscription_count=await Subscription.count({
            where:{
                IsDeleted:0,
                expiry_date:{
                    [Op.gt]:now
                }
            }
        }).catch(err=>{

            res.status(500).json({response_code:0,message:err});
        });

        res.status(200).json({response_code:1,count:subscription_count});
    }


    async createNewSubscription(req:Request,res:Response)
    {

        var checkSubscriptionExist=await Subscription.findOne({
            where:{
                curriculum_id:req.body.curriculum_id,
                company_id:req.body.company_id,
                status:"0"
            },
            logging: console.log
        }).catch(err=>{

            res.status(500).json({response_code:0,message:err});
        });


        if(checkSubscriptionExist == null)
        {
            var actication_date=req.body.activation_date;
            var day_no=req.body.day_no;
            var calender_type=req.body.calender_type;

            //Calculate Expire Date
            var current = moment(actication_date,"YYYY-MM-DD").format("YYYY-MM-DD");
            var expiredate=moment(actication_date,"YYYY-MM-DD").add(day_no,calender_type).format("YYYY-MM-DD");

            var subscriptionData={
                curriculum_id:req.body.curriculum_id,
                company_id:req.body.company_id,
                day_no:req.body.day_no,
                calender_type:req.body.calender_type,
                licence_no:req.body.licence_no,
                payment_type:req.body.payment_type,
                activation_date:req.body.activation_date,
                expiry_date:expiredate,
                created_by:req.body.created_by,
                updated_by:req.body.updated_by,
            };

            await Subscription.create({...subscriptionData}).then(function (data)
            {
                res.status(200).json({response_code:1,message:"New Subscription Created"});

            }).catch(function (err){
                res.status(500).json({response_code:0,message:err});
            });
        }
        else
        {
            res.status(500).json({response_code:0,message:"Subscription Already Exist"});
        }


    }
}

export default new SubscriptionController();