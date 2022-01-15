import { Request, Response } from "express";
import Subscription from "../../model/root/subscription.model";

class SubscriptionController
{
    async createNewSubscription(req:Request,res:Response)
    {

        var checkSubscriptionExist=await Subscription.findOne({
            where:{
                curriculum_id:req.body.curriculum_id,
                company_id:req.body.company_id,
                status:"0"
            },
            logging: console.log
        });


        if(checkSubscriptionExist == null)
        {
            await Subscription.create({...req.body}).then(function (data)
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