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
const sequelize_1 = require("sequelize");
const company_department_model_1 = __importDefault(require("../../model/root/company_department.model"));
const master_department_model_1 = __importDefault(require("../../model/root/master_department.model"));
const subcompany_model_1 = __importDefault(require("../../model/root/subcompany.model"));
const trainee_model_1 = __importDefault(require("../../model/root/trainee.model"));
const trainer_model_1 = __importDefault(require("../../model/root/trainer.model"));
const users_model_1 = __importDefault(require("../../model/root/users.model"));
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
class SubCompanyController {
    registerSubCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //**Check Email Exist in Sub Company table */
                const check_sub_company_exist = yield subcompany_model_1.default.findAll({
                    where: {
                        [sequelize_1.Op.or]: [{ email: req.body.email, }, { name: req.body.name }],
                        IsDeleted: 0
                    }
                });
                //** Check User exist in User table */
                const check_user_table = yield users_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0
                    }
                });
                if (check_sub_company_exist.length == 0 && check_user_table.length == 0) {
                    req.body.createdAt = response_strings_1.default.currentTime;
                    //**Add SubCompany */
                    yield subcompany_model_1.default.create(Object.assign({}, req.body)).then(subcompnaydata => {
                        var user_login_body = {
                            company_id: req.body.company_id,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 5,
                            language: 1,
                            createdAt: response_strings_1.default.currentTime,
                            updated_by: "",
                            updatedAt: '',
                            created_by: req.body.created_by
                        };
                        users_model_1.default.create(Object.assign({}, user_login_body)).then(userData => {
                            const updateId = {
                                login_table_id: userData["id"],
                            };
                            //**update the login id in Trainee Table */
                            subcompany_model_1.default.update(Object.assign({}, updateId), { where: { id: subcompnaydata['id'] } }).
                                then(success => {
                                res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Branch Register successfully..." });
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: err.message });
                            });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                // else if(check_sub_company_exist.length !=0 && check_user_table.length ==0)
                // {
                //     var user_login_body =
                //     {
                //         company_id: req.body.company_id,
                //         email: req.body.email,
                //         password: req.body.password,
                //         user_type: 5,
                //         language:1,
                //         createdAt: responseStrings.currentTime,
                //         updated_by: "",
                //         updatedAt: '',
                //         created_by: req.body.created_by
                //     };
                //     Users.create({ ...user_login_body }).then(userData => {
                //         const updateId = {
                //             login_table_id: userData["id"],
                //         };
                //         //**update the login id in Trainee Table */
                //         SubCompany.update({ ...updateId }, { where: { id: check_sub_company_exist[0]['id'] } }).
                //             then(success => {
                //                 res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Branch Exist login created successfully..." });
                //             }).catch(err => {
                //                 res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
                //             });
                //     }).catch(err => {
                //         res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                //     });
                // }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Email Id or Branch Name Already exist" });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getSubcompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield subcompany_model_1.default.findAll({
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    }
                }).then(success => {
                    if (success.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Branch fetched successfully...", data: success });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "No Branch Found please Add one to view..." });
                    }
                }).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getSubcompany_detail_info(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield subcompany_model_1.default.findAll({
                    include: [{
                            //*GET DEPARTMENT
                            required: false,
                            model: company_department_model_1.default,
                            include: [
                                {
                                    model: master_department_model_1.default
                                },
                                {
                                    model: trainer_model_1.default,
                                    required: false,
                                    where: { IsDeleted: 0 }
                                },
                                {
                                    model: trainee_model_1.default,
                                    required: false,
                                    where: { IsDeleted: 0 }
                                }
                            ],
                            where: { IsDeleted: 0 }
                        },
                        {
                            //*GET Trainer
                            required: false,
                            model: trainer_model_1.default,
                            where: { IsDeleted: 0 }
                        },
                        {
                            //*GET Trainee
                            required: false,
                            model: trainee_model_1.default,
                            where: { IsDeleted: 0 }
                        }
                    ],
                    where: { company_id: req.body.company_id, IsDeleted: 0 }
                }).then(resData => {
                    if (resData.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.GET, data: resData });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "No Branch Found Please Create One" });
                    }
                }, err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    assign_department_to_subcompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var sub_company_id = req.body.sub_company_id;
                var department_id = req.body.department_id;
                //**This Query Checking the two Paramenter email or branch and department edited by Ashish Rhatwal */
                var check_email_exist = yield company_department_model_1.default.findAll({
                    where: {
                        [sequelize_1.Op.or]: [{ [sequelize_1.Op.and]: [{ sub_company_id: sub_company_id }, { department_id: req.body.department_id }] }, { email: req.body.email }],
                        IsDeleted: 0
                    },
                });
                var check_user_exist = yield users_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0
                    },
                    logging: console.log
                });
                console.log(check_email_exist.length + " " + check_user_exist.length);
                if (check_email_exist.length == 0 && check_user_exist.length == 0) {
                    yield company_department_model_1.default.create(Object.assign({}, req.body)).then(cData => {
                        const user_login_data = {
                            company_id: req.body.company_id,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 6,
                            language: 1,
                            createdAt: response_strings_1.default.currentTime,
                            updated_by: "",
                            updatedAt: '',
                            created_by: req.body.created_by
                        };
                        users_model_1.default.create(Object.assign({}, user_login_data)).then(userdata => {
                            var updateData = {
                                login_table_id: userdata['id']
                            };
                            company_department_model_1.default.update(Object.assign({}, updateData), { where: { id: cData['id'] } }).then(succ => {
                                res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Department Assign Successfully Login Created..." });
                            }).catch(err => {
                                res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: err.message });
                            });
                        }).catch(err => {
                            res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: err.message });
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Email Id or Department Already Exist..." });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    assign_trainer_to_subcompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var sub_company_id = req.body.sub_company_id;
                var trainer_id = req.body.trainer_id;
                var company_id = req.body.company_id;
                var check_sub_company_exist = yield subcompany_model_1.default.findAll({
                    where: {
                        id: sub_company_id
                    }
                });
                if (check_sub_company_exist.length != 0) {
                    var update = {
                        sub_company_id: sub_company_id,
                        updated_by: req.body.updated_by,
                        updatedAt: response_strings_1.default.currentTime
                    };
                    yield trainer_model_1.default.update(Object.assign({}, update), { where: { id: trainer_id } }).then(success => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Trainer Assigned Successfully..." });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Invalid Sub Company" });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
}
exports.default = new SubCompanyController();