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
                    return res.status(response_codes_1.default.UNAUTHORIZED).json({ response_code: 0, message: 'invalid username or password', data: '' });
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
                            message: 'user login successfully...',
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
                            var trainer_data = yield trainer_model_1.default.findOne({
                                include: [
                                    { model: users_model_1.default },
                                    { model: company_model_1.default }
                                ],
                                where: {
                                    login_table_id: userdata['id']
                                }
                            });
                            if (trainer_data != null) {
                                return res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    token: authentication_token,
                                    user_type: "Trainer",
                                    message: 'user login successfully...',
                                    data: trainer_data
                                });
                            }
                            else {
                                return res.status(response_codes_1.default.UNAUTHORIZED).json({
                                    response_code: 0,
                                    message: 'Trainer Not Found',
                                    data: ''
                                });
                            }
                        }
                        else if (user_type == '3') //Company User
                         {
                        }
                        else if (user_type == '2') //Company User
                         {
                            var company_data = yield compayuser_model_1.default.findOne({
                                include: [
                                    { model: users_model_1.default },
                                    { model: company_model_1.default }
                                ],
                                where: {
                                    canlogin: 1,
                                    login_table_id: userdata['id'],
                                    IsDeleted: 0
                                }
                            }).then(data => {
                                if (data != null) {
                                    return res.status(response_codes_1.default.SUCCESS).json({
                                        response_code: 1,
                                        token: authentication_token,
                                        user_type: 2,
                                        message: 'user login successfully...',
                                        data: data
                                    });
                                }
                                else {
                                    return res.status(response_codes_1.default.SUCCESS).json({
                                        response_code: 0,
                                        message: 'invalid username or password'
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
                                message: 'Trainee Not Found',
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
