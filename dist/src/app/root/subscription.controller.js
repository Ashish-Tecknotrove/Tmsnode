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
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const subscription_model_1 = __importDefault(require("../../model/root/subscription.model"));
class SubscriptionController {
    total_subscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = (0, moment_1.default)(new Date()).format("YYYY-MM-DD");
            var subscription_count = yield subscription_model_1.default.count({
                where: {
                    IsDeleted: 0,
                    expiry_date: {
                        [sequelize_1.Op.gt]: now
                    }
                }
            }).catch(err => {
                res.status(500).json({ response_code: 0, message: err });
            });
            res.status(200).json({ response_code: 1, count: subscription_count });
        });
    }
    createNewSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var checkSubscriptionExist = yield subscription_model_1.default.findOne({
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
                var current = (0, moment_1.default)(actication_date, "YYYY-MM-DD").format("YYYY-MM-DD");
                var expiredate = (0, moment_1.default)(actication_date, "YYYY-MM-DD").add(day_no, calender_type).format("YYYY-MM-DD");
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
                    updated_by: req.body.updated_by,
                };
                yield subscription_model_1.default.create(Object.assign({}, subscriptionData)).then(function (data) {
                    res.status(200).json({ response_code: 1, message: "New Subscription Created" });
                }).catch(function (err) {
                    res.status(500).json({ response_code: 0, message: err });
                });
            }
            else {
                res.status(500).json({ response_code: 0, message: "Subscription Already Exist" });
            }
        });
    }
}
exports.default = new SubscriptionController();
