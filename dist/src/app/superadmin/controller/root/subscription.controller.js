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
const company_model_1 = __importDefault(require("../../../../core/model/root/company.model"));
const curriculum_model_1 = __importDefault(require("../../../../core/model/root/curriculum.model"));
const subscription_model_1 = __importDefault(require("../../../../core/model/root/subscription.model"));
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
const response_strings_1 = __importDefault(require("../../../../core/strings/response-strings"));
const trainee_model_1 = __importDefault(require("../../../../core/model/root/trainee.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../../../core/model/root/trainee_curriculum.model"));
class SubscriptionController {
    total_subscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = (0, moment_1.default)(new Date()).format("YYYY-MM-DD");
                yield subscription_model_1.default.count({
                    where: {
                        IsDeleted: 0,
                        expiry_date: {
                            [sequelize_1.Op.gt]: now
                        }
                    }
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, count: result });
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: e.message,
                    data: "",
                });
            }
        });
    }
    createNewSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var checkSubscriptionExist = yield subscription_model_1.default.findOne({
                    where: {
                        curriculum_id: req.body.curriculum_id,
                        company_id: req.body.company_id,
                        status: "1",
                        IsDeleted: 0
                    },
                    // logging: console.log
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
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
                        licence_no: (req.body.licenceType == "1" ? '0' : req.body.licence_no),
                        licenceType: req.body.licenceType,
                        payment_type: req.body.payment_type,
                        activation_date: req.body.activation_date,
                        expiry_date: expiredate,
                        created_by: req.body.created_by,
                        createdAt: response_strings_1.default.currentTime,
                        updated_by: "",
                    };
                    yield subscription_model_1.default.create(Object.assign({}, subscriptionData)).then(function (data) {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "New subscription have been created successfully." });
                    }).catch(function (err) {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.CREATED).json({ response_code: 0, message: "Oops! Subscription already created for this curriculum" });
                }
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 1,
                    message: e.message,
                    data: "",
                });
            }
        });
    }
    updateSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let subscription_id = req.body.subscription_id;
                let check_subscription_is_valid = yield subscription_model_1.default.findOne({
                    where: {
                        id: subscription_id,
                        IsDeleted: 0
                    },
                    // logging: console.log
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                });
                if (check_subscription_is_valid != null) {
                    var actication_date = req.body.activation_date;
                    var day_no = req.body.day_no;
                    var calender_type = req.body.calender_type;
                    //Calculate Expire Date
                    var current = (0, moment_1.default)(actication_date, "YYYY-MM-DD").format("YYYY-MM-DD");
                    var expiredate = (0, moment_1.default)(actication_date, "YYYY-MM-DD").add(day_no, calender_type).format("YYYY-MM-DD");
                    var subscriptionData = {
                        day_no: req.body.day_no,
                        calender_type: req.body.calender_type,
                        licence_no: (req.body.licenceType == "1" ? '0' : req.body.licence_no),
                        licenceType: req.body.licenceType,
                        payment_type: req.body.payment_type,
                        activation_date: req.body.activation_date,
                        expiry_date: expiredate,
                        updated_by: req.body.updated_by,
                        updatedAt: response_strings_1.default.currentTime
                    };
                    yield subscription_model_1.default.update(Object.assign({}, subscriptionData), { where: { id: subscription_id } }).
                        then(function (response) {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Subscription have been updated." });
                    }).catch((err) => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Oops! An invalid subscription ID was entered, or this subscription was already deleted" });
                }
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 1,
                    message: e.message,
                    data: "",
                });
            }
        });
    }
    getSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const subscriptionData = yield subscription_model_1.default.findAll({
                    include: [{
                            model: company_model_1.default,
                            required: true //*INNER JOIN
                        },
                        {
                            model: curriculum_model_1.default,
                            required: true
                        }
                    ],
                    where: whereCondition,
                    order: [["id", "DESC"]]
                    // logging: console.log
                }).then((result) => {
                    if (result.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "data have been fetched successfully", data: result });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "No data were found", data: [] });
                    }
                }).catch((err) => {
                    console.log(err);
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
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
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    deleteSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let subscription_id = req.body.subscription_id;
                let check_subscription_is_valid = yield subscription_model_1.default.findOne({
                    where: {
                        id: subscription_id,
                        IsDeleted: 0
                    },
                    // logging: console.log
                }).catch((err) => {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Oops! " + err.message });
                });
                if (check_subscription_is_valid != null) {
                    var subscriptionData = {
                        IsDeleted: 1,
                        deleted_by: req.body.deleted_by,
                        deletedAt: response_strings_1.default.currentTime,
                    };
                    yield subscription_model_1.default.update(Object.assign({}, subscriptionData), { where: { id: subscription_id } }).
                        then(function (response) {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Subscription deleted." });
                    }).catch((err) => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Oops! An invalid subscription ID was entered, or this subscription was already deleted" });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
}
exports.default = new SubscriptionController();
