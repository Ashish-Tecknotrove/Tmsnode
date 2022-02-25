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
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
const master_department_model_1 = __importDefault(require("../../model/root/master_department.model"));
const trainer_model_1 = __importDefault(require("../../model/root/trainer.model"));
const users_model_1 = __importDefault(require("../../model/root/users.model"));
const company_department_model_1 = __importDefault(require("../../model/root/company_department.model"));
class CompanyDepartmentController {
    assignTrainersToDepartment_SubCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let update = {};
                if (req.body.sub_company_id && req.body.department_id) {
                    update = {
                        sub_company_id: req.body.sub_company_id,
                        department_id: req.body.department_id,
                        updated_by: req.body.updated_by,
                        updatedAt: response_strings_1.default.currentTime,
                    };
                }
                else if (req.body.department_id) {
                    update = {
                        department_id: req.body.department_id,
                        updated_by: req.body.updated_by,
                        updatedAt: response_strings_1.default.currentTime,
                    };
                }
                else if (req.body.sub_company_id) {
                    update = {
                        department_id: req.body.sub_company_id,
                        updated_by: req.body.updated_by,
                        updatedAt: response_strings_1.default.currentTime,
                    };
                }
                yield trainer_model_1.default.update(Object.assign({}, update), {
                    where: {
                        id: req.body.trainer_id
                    }
                }).then((data) => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.SUBMIT
                    });
                }).catch((err) => {
                    return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: err.message,
                        data: "",
                    });
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
    addDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var company_id = req.body.company_id;
                var master_data = {
                    company_id: req.body.company_id,
                    name: req.body.department_name,
                    description: req.body.description,
                    created_by: req.body.created_by,
                    createdAt: response_strings_1.default.currentTime
                };
                var check_master_department_exist = yield master_department_model_1.default.findAll({
                    where: {
                        company_id: company_id,
                        name: req.body.department_name,
                        IsDeleted: 0
                    }
                });
                var check_email_exist_in_user_table = yield users_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0
                    }
                });
                if (check_master_department_exist.length == 0 && check_email_exist_in_user_table.length == 0) {
                    yield master_department_model_1.default.create(Object.assign({}, master_data)).then(msdata => {
                        var companyData = {
                            company_id: req.body.company_id,
                            department_id: msdata['id'],
                            username: req.body.username,
                            designation: req.body.designation,
                            contactNumber: req.body.contactNumber,
                            email: req.body.email,
                            created_by: req.body.created_by,
                            createdAt: response_strings_1.default.currentTime
                        };
                        company_department_model_1.default.create(Object.assign({}, companyData)).then(cdData => {
                            const user_login_data = {
                                company_id: req.body.company_id,
                                name: req.body.username,
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
                                company_department_model_1.default.update(Object.assign({}, updateData), { where: { id: cdData['id'] } }).then(succ => {
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
                    }).catch(err => {
                        return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: err.message,
                            data: "",
                        });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Department Name or Email Already Exist" });
                }
            }
            catch (err) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err.message,
                    data: "",
                });
            }
        });
    }
    departmentDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield company_department_model_1.default.findAll({
                    include: [
                        {
                            model: master_department_model_1.default
                        },
                        {
                            model: trainer_model_1.default,
                            required: false,
                            where: { IsDeleted: 0 }
                        }
                    ],
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    }
                }).then(data => {
                    if (data.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.GET, data: data });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "No Data Found" });
                    }
                }).catch(err => {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: err.message });
            }
        });
    }
}
exports.default = new CompanyDepartmentController();
