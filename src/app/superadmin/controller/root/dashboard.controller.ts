import Company from "../../../../core/model/root/company.model";
import MasterPanel from "../../../../core/model/root/masterpanel.model";
import responseCodes from "../../../../core/strings/response-codes";
import {Request, Response} from "express"
import responseStrings from "../../../../core/strings/response-strings";
import moment from "moment";
import Subscription from "../../../../core/model/root/subscription.model";
import { Op } from "sequelize";

class SuperAdminDashboard
{

    async total_companies(req: Request, res: Response) {
        try {
            var company_count = await Company.count({
                include: [{
                    model: MasterPanel,
                    //required:false,
                    where: {IsDeleted: 0}
                }],
                where: {
                    IsDeleted: 0,
                    company_type: 0
                },
            })
                .then((success) => {
                    res
                        .status(responseCodes.SUCCESS)
                        .json({
                            response_code: 1,
                            message: responseStrings.GET,
                            count: success,
                        });
                })
                .catch((error: any) => {
                    res
                        .status(responseCodes.INTERNAL_SERVER_ERROR)
                        .json({response_code: 0, message: "Oops! " + error.message});
                });
        } catch (error: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({response_code: 0, message: "Oops! " + error.message});
        }
    }

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
            }).catch((err:any) => {

                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:  "Oops! "+ err.message });
            });


        } catch (e:any) {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                response_code: 0,
                message: e.message,
                data: "",
            });
        }

    }
}


export default new SuperAdminDashboard();