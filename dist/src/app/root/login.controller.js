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
const auth_1 = __importDefault(require("../../middleware/auth"));
const language_model_1 = __importDefault(require("../../model/language/language.model"));
const company_model_1 = __importDefault(require("../../model/root/company.model"));
const trainee_model_1 = __importDefault(require("../../model/root/trainee.model"));
const trainer_model_1 = __importDefault(require("../../model/root/trainer.model"));
const users_model_1 = __importDefault(require("../../model/root/users.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const compayuser_model_1 = __importDefault(require("../../model/root/compayuser.model"));
const masterpanel_model_1 = __importDefault(require("../../model/root/masterpanel.model"));
const mastermenu_model_1 = __importDefault(require("../../model/root/mastermenu.model"));
const sequelize_1 = require("sequelize");
const subscription_model_1 = __importDefault(require("../../model/root/subscription.model"));
const response_strings_2 = __importDefault(require("../../strings/response-strings"));
dotenv_1.default.config();
class LoginController {
    //UserLogin
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //TODO Parameters
                const username = req.body.username;
                const password = req.body.password;
                const userdata = yield users_model_1.default.findOne({
                    include: [
                        { model: language_model_1.default },
                        { model: company_model_1.default }
                    ],
                    where: {
                        email: username,
                        password: password,
                        IsDeleted: 0
                    },
                    // logging:console.log
                });
                if (userdata === null) {
                    return res.status(response_codes_1.default.UNAUTHORIZED).json({ response_code: 0, message: "Oops! We didn't recognize you . please enter valid username and password", data: '' });
                }
                else {
                    var user_type = userdata['user_type'];
                    //TODO Authentication Token----------
                    var payload = { username: userdata['email'] };
                    let authentication_token = yield auth_1.default.generateAuth(payload);
                    //TODO Authentication  Token----------
                    if (userdata['is_admin'] == 1) {
                        return res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            token: authentication_token,
                            user: "Super Admin",
                            user_type: user_type,
                            message: "Welcome! user logged in successfully.",
                            data: userdata
                        });
                    }
                    else {
                        if (user_type == '5') //Trainee
                         {
                            var trainee_data = yield trainee_model_1.default.findOne({
                                include: [
                                    { model: users_model_1.default },
                                    { model: company_model_1.default }
                                ],
                                where: {
                                    login_table_id: userdata['id']
                                }
                            });
                            if (trainee_data != null) {
                                return res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    token: authentication_token,
                                    user_type: "Trainee",
                                    message: 'user login successfully...',
                                    data: trainee_data
                                });
                            }
                            else {
                                return res.status(response_codes_1.default.UNAUTHORIZED).json({
                                    response_code: 0,
                                    message: 'Trainee Not Found',
                                    data: ''
                                });
                            }
                        }
                        else if (user_type == '4') {
                            yield trainee_model_1.default.findOne({
                                include: [
                                    { model: users_model_1.default },
                                    { model: company_model_1.default }
                                ],
                                where: {
                                    login_table_id: userdata['id'],
                                    IsDeleted: 0,
                                    IsBlock: 0
                                }
                            }).then((traineeData) => {
                                if (traineeData.length != 0) {
                                    const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/" + traineeData['Company']['picture']);
                                    return res.status(response_codes_1.default.SUCCESS).json({
                                        response_code: 1,
                                        token: authentication_token,
                                        logo: filePath,
                                        user_type: 4,
                                        message: 'Welcome! user logged in successfully.',
                                        data: traineeData
                                    });
                                }
                                else {
                                    return res.status(response_codes_1.default.BAD_REQUEST).json({
                                        response_code: 0,
                                        message: "Oops! sorry you cannot login please contact with your administrator."
                                    });
                                }
                            }).catch(err => {
                            });
                        }
                        else if (user_type == '3') //Company Trainer
                         {
                            var trainerData = yield trainer_model_1.default.findOne({
                                include: [
                                    { model: users_model_1.default },
                                    { model: company_model_1.default }
                                ],
                                where: {
                                    login_table_id: userdata['id'],
                                    IsDeleted: 0,
                                    IsBlock: 0
                                }
                            }).then((trainerData) => {
                                //!Check SUBSCRIPTION IS ACTIVE OR NOT
                                subscription_model_1.default.findAll({
                                    where: {
                                        expiry_date: { [sequelize_1.Op.gte]: response_strings_2.default.currentDate },
                                        activation_date: { [sequelize_1.Op.lte]: response_strings_2.default.currentDate },
                                        IsDeleted: 0,
                                        company_id: trainerData['company_id'],
                                    },
                                }).then(subData => {
                                    if (subData.length != 0) {
                                        const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/" + trainerData['Company']['picture']);
                                        return res.status(response_codes_1.default.SUCCESS).json({
                                            response_code: 1,
                                            token: authentication_token,
                                            logo: filePath,
                                            user_type: 3,
                                            message: 'Welcome! user logged in successfully.',
                                            data: trainerData
                                        });
                                    }
                                    else {
                                        return res.status(response_codes_1.default.BAD_REQUEST).json({
                                            response_code: 0,
                                            message: "Oops! sorry you cannot login please contact with your administrator."
                                        });
                                    }
                                }).catch(err => {
                                    return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                        response_code: 0,
                                        message: err.message
                                    });
                                });
                            }).catch(err => {
                                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: err.message
                                });
                            });
                        }
                        else if (user_type == '2') //Company User
                         {
                            var company_data = yield compayuser_model_1.default.findOne({
                                include: [
                                    { model: users_model_1.default },
                                    { model: company_model_1.default,
                                        include: [
                                            {
                                                model: masterpanel_model_1.default,
                                                required: false,
                                                include: [
                                                    {
                                                        model: mastermenu_model_1.default,
                                                        separate: true,
                                                        order: [['sequence', 'ASC']]
                                                        //:{IsDeleted:0}
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                ],
                                where: {
                                    canlogin: 1,
                                    login_table_id: userdata['id'],
                                    IsDeleted: 0
                                },
                                //logging:console.log
                            }).then((data) => {
                                if (data != null) {
                                    const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/company_logo/" + data['Company']['picture']);
                                    return res.status(response_codes_1.default.SUCCESS).json({
                                        response_code: 1,
                                        token: authentication_token,
                                        logo: filePath,
                                        user_type: 2,
                                        message: 'Welcome! user logged in successfully.',
                                        data: data
                                    });
                                }
                                else {
                                    return res.status(response_codes_1.default.SUCCESS).json({
                                        response_code: 0,
                                        message: "Oops! We didn't recognize you . please enter valid username and password"
                                    });
                                }
                            }).catch(err => {
                                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: err.message
                                });
                            });
                        }
                        else {
                            return res.status(response_codes_1.default.UNAUTHORIZED).json({
                                response_code: 0,
                                message: "Oops! no data found please enter valid username and password",
                                data: ''
                            });
                        }
                    }
                }
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: e.message });
            }
        });
    }
    verify_token(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.tokenValid });
        });
    }
}
exports.default = new LoginController();
