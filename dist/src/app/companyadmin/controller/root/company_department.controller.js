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
const response_strings_1 = __importDefault(require("../../../../core/strings/response-strings"));
const trainer_model_1 = __importDefault(require("../../../../core/model/root/trainer.model"));
const master_department_model_1 = __importDefault(require("../../../../core/model/root/master_department.model"));
const users_model_1 = __importDefault(require("../../../../core/model/root/users.model"));
const company_department_model_1 = __importDefault(require("../../../../core/model/root/company_department.model"));
const trainee_model_1 = __importDefault(require("../../../../core/model/root/trainee.model"));
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
                        sub_company_id: req.body.sub_company_id,
                        updated_by: req.body.updated_by,
                        updatedAt: response_strings_1.default.currentTime,
                    };
                }
                yield trainer_model_1.default.findOne({
                    where: {
                        id: req.body.trainer_id,
                        IsDeleted: 0
                    }
                }).then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data != null) {
                        yield trainer_model_1.default.update(Object.assign({}, update), {
                            where: {
                                id: req.body.trainer_id
                            }
                        }).then((data) => {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Trainer assigned successfully."
                            });
                        }).catch((err) => {
                            return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message,
                                data: "",
                            });
                        });
                    }
                    else {
                        return res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! An invalid trainer ID was entered, or this trainer was already deleted",
                            data: "",
                        });
                    }
                })).catch((err) => {
                    return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message,
                        data: "",
                    });
                });
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + e.message,
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
                    descripition: req.body.description,
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
                            name: req.body.username,
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
                                    res.status(response_codes_1.default.SUCCESS).json({
                                        response_code: 1,
                                        message: "Added department successfully, and login created"
                                    });
                                }).catch(err => {
                                    res.status(response_codes_1.default.BAD_REQUEST).json({
                                        response_code: 0,
                                        message: "Opps! " + err.message
                                    });
                                });
                            }).catch(err => {
                                res.status(response_codes_1.default.BAD_REQUEST).json({
                                    response_code: 0,
                                    message: "Opps! " + err.message
                                });
                            });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Opps! " + err.message
                            });
                        });
                    }).catch(err => {
                        return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Opps! " + err.message,
                            data: "",
                        });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Name or email of department already exists, please use another one"
                    });
                }
            }
            catch (err) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Opps! " + err.message,
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
                        },
                        {
                            model: trainee_model_1.default,
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
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "data have been fetched successfully",
                            data: data
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 0,
                            message: "No data were found, please add the department"
                        });
                    }
                }).catch(err => {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    getCompanyDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var where = {};
                if (req.body.sub_company_id) {
                    where = {
                        sub_company_id: req.body.sub_company_id,
                        IsDeleted: 0,
                        IsBlock: 0,
                        company_id: req.body.company_id
                    };
                }
                else {
                    where = {
                        IsDeleted: 0,
                        IsBlock: 0,
                        company_id: req.body.company_id
                    };
                }
                yield company_department_model_1.default.findAll({
                    include: [{
                            model: master_department_model_1.default,
                            required: true,
                            where: { IsDeleted: 0 }
                        }],
                    where: where
                }).then(data => {
                    if (data.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "data have been fetched successfully.",
                            data: data
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 0,
                            message: "No data were found, please add the department",
                            data: data
                        });
                    }
                }).catch(err => {
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
    getCompanyDepartmentList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield company_department_model_1.default.findAll({
                    include: [{
                            model: master_department_model_1.default,
                            required: true,
                            where: { IsDeleted: 0 },
                            attributes: ['id', 'company_id', 'name', 'descripition']
                        }, {
                            model: users_model_1.default,
                            required: true,
                            where: { IsDeleted: 0 },
                            attributes: ['id', 'company_id', 'email', 'password', 'password_wordpress']
                        }],
                    where: {
                        IsDeleted: 0,
                        company_id: req.body.company_id
                    }
                }).then(data => {
                    if (data.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "data have been fetched successfully.",
                            data: data
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 0,
                            message: "No data were found, please add the department",
                            data: data
                        });
                    }
                }).catch(err => {
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
    blockUnblockCompanyDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield company_department_model_1.default.findOne({
                    where: {
                        id: req.body.company_department_id,
                        IsDeleted: 0
                    }
                }).then((CompanyDepartmentData) => __awaiter(this, void 0, void 0, function* () {
                    if (CompanyDepartmentData != null) {
                        let CompanyDepartmentUpdate = {
                            IsBlock: (CompanyDepartmentData.IsBlock == 1) ? 0 : 1,
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime
                        };
                        yield company_department_model_1.default.update(Object.assign({}, CompanyDepartmentUpdate), {
                            where: {
                                id: req.body.company_department_id
                            }
                        }).then((SubCompanyResult) => __awaiter(this, void 0, void 0, function* () {
                            let SubCompanyUserUpdate = {
                                IsBlock: (CompanyDepartmentData.IsBlock == 1) ? 0 : 1,
                                updated_by: req.body.updated_by,
                                updatedAt: response_strings_1.default.currentTime
                            };
                            yield users_model_1.default.update(Object.assign({}, SubCompanyUserUpdate), {
                                where: {
                                    id: CompanyDepartmentData.login_table_id
                                }
                            }).then((UsersResult) => __awaiter(this, void 0, void 0, function* () {
                                let message = (CompanyDepartmentData.IsBlock == 1) ? "unblock" : "block";
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    message: "Department successfully " + message + "."
                                });
                            })).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err.message
                                });
                            });
                        })).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! This Department was either deleted or did not exist."
                        });
                    }
                })).catch(err => {
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
    editCompanyDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield company_department_model_1.default.findOne({
                    where: {
                        id: req.body.company_department_id,
                        IsDeleted: 0
                    }
                }).then((CompanyDepartmentData) => __awaiter(this, void 0, void 0, function* () {
                    if (CompanyDepartmentData != null) {
                        let CompanyDepartmentUpdate = {
                            name: req.body.username,
                            contactNumber: req.body.contactNumber,
                            designation: req.body.designation,
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime
                        };
                        yield company_department_model_1.default.update(Object.assign({}, CompanyDepartmentUpdate), {
                            where: {
                                id: req.body.company_department_id
                            }
                        }).then((CompanyDepartmentResult) => __awaiter(this, void 0, void 0, function* () {
                            if (req.body.departmentName) {
                                let MasterDepartmentUpdate = {
                                    name: req.body.departmentName,
                                    descripition: req.body.descripition,
                                    updated_by: req.body.updated_by,
                                    updatedAt: response_strings_1.default.currentTime
                                };
                                yield master_department_model_1.default.update(Object.assign({}, MasterDepartmentUpdate), {
                                    where: {
                                        id: CompanyDepartmentData.department_id
                                    }
                                }).then((MasterDepartmentResult) => {
                                    res.status(response_codes_1.default.SUCCESS).json({
                                        response_code: 1,
                                        message: "Department update successfully."
                                    });
                                });
                            }
                            else {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    message: "Department update successfully."
                                });
                            }
                        })).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! This Branch was deleted or not exist."
                        });
                    }
                })).catch(err => {
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
exports.default = new CompanyDepartmentController();
