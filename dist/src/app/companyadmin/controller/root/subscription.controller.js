"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
const subscription_model_1 = __importDefault(require("../../../../core/model/root/subscription.model"));
const curriculum_model_1 = __importDefault(require("../../../../core/model/root/curriculum.model"));
const trainee_model_1 = __importDefault(require("../../../../core/model/root/trainee.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../../../core/model/root/trainee_curriculum.model"));
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
class SubscriptionController {
    getSubscriptionByCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionData = yield subscription_model_1.default.findAll({
                    include: [
                        {
                            model: curriculum_model_1.default,
                            required: false,
                            attributes: ['id', 'company_id', 'name']
                        }
                    ],
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0,
                        expiry_date: {
                            [sequelize_1.Op.gt]: (0, moment_1.default)(new Date()).format("YYYY-MM-DD")
                        }
                    },
                    attributes: ['id', 'curriculum_id', 'company_id', 'technology_type', 'day_no', 'calender_type', 'licence_no', 'licenceType', 'payment_type', 'activation_date', 'expiry_date']
                    // logging: console.log
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result.length != 0) {
                        for (let i = 0; i < result.length; i++) {
                            yield trainee_model_1.default.count({
                                include: [
                                    {
                                        model: trainee_curriculum_model_1.default,
                                        where: {
                                            IsDeleted: 0,
                                            curriculum_id: result[i]['curriculum_id']
                                        }
                                    },
                                ],
                                where: {
                                    IsDeleted: 0
                                }
                            }).then(count => {
                                // console.log(data);
                                result[i]['dataValues']['userSubscription'] = count;
                                result[i]['dataValues']['pendingSubscription'] = result[i]['licence_no'] - count;
                            }).catch(err => {
                                console.log(err.message);
                            });
                        }
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "data have been fetched successfully",
                            data: result
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "No data were found", data: [] });
                    }
                })).catch((err) => {
                    console.log(err);
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
}
exports.default = new SubscriptionController();
