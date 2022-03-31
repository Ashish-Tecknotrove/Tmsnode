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
const master_department_model_1 = __importDefault(require("../../../../core/model/root/master_department.model"));
class MasterDepartmentController {
    addMasterDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //? CHECK MASTER DEPARTMENT
                yield master_department_model_1.default.findAll({
                    where: {
                        IsDeleted: 0,
                        name: req.body.name,
                        company_id: req.body.company_id
                    },
                    // logging: console.log
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    //?  MASTER DEPARTMENT NOT EXIST
                    if (result.length == 0) {
                        req.body.createdAt = response_strings_1.default.currentTime;
                        req.body.updated_by = '';
                        //? MASTER DEPARTMENT CREATE
                        yield master_department_model_1.default.create(Object.assign({}, req.body)).then((data) => __awaiter(this, void 0, void 0, function* () {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Department added successfully.",
                                data: data
                            });
                        })).catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    }
                    else {
                        //?  MASTER DEPARTMENT EXIST
                        return res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! Name of department already exists, please use another one"
                        });
                    }
                })).catch((err) => {
                    return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
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
    updateMasterDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //? CHECK MASTER DEPARTMENT
                yield master_department_model_1.default.findOne({
                    where: {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        name: req.body.name
                    },
                    // logging: console.log
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    //?  MASTER DEPARTMENT NOT EXIST
                    if (result == null) {
                        req.body.updatedAt = response_strings_1.default.currentTime;
                        let updateObj = {
                            name: req.body.name,
                            descripition: req.body.descripition,
                            updatedAt: response_strings_1.default.currentTime,
                            updated_by: req.body.updated_by
                        };
                        //? MASTER DEPARTMENT UPDATE
                        yield master_department_model_1.default.update(Object.assign({}, updateObj), {
                            where: {
                                id: req.body.masterdepartment_id
                            }
                        }).then((data) => __awaiter(this, void 0, void 0, function* () {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Department Updated Successfully."
                            });
                        })).catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    }
                    else {
                        //?  MASTER DEPARTMENT EXIST
                        return res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! An invalid department ID was entered, or this department was already deleted"
                        });
                    }
                })).catch((err) => {
                    return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
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
    deleteMasterDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //? CHECK MASTER DEPARTMENT
                yield master_department_model_1.default.findOne({
                    where: {
                        IsDeleted: 0,
                        id: req.body.masterdepartment_id
                    },
                    // logging: console.log
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    //?  MASTER DEPARTMENT EXIST
                    if (result) {
                        let updateObj = {
                            IsDeleted: 1,
                            deletedAt: response_strings_1.default.currentTime,
                            deleted_by: req.body.updated_by
                        };
                        //? MASTER DEPARTMENT DELETE
                        yield master_department_model_1.default.update(Object.assign({}, updateObj), {
                            where: {
                                id: req.body.masterdepartment_id
                            }
                        }).then((data) => __awaiter(this, void 0, void 0, function* () {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Department Deleted Successfully."
                            });
                        })).catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    }
                    else {
                        //?  MASTER DEPARTMENT NOT EXIST
                        return res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! An invalid department ID was entered, or this department was already deleted"
                        });
                    }
                })).catch((err) => {
                    return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
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
    getMasterDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //? CHECK MASTER DEPARTMENT
                yield master_department_model_1.default.findAll({
                    where: { company_id: req.body.company_id, IsDeleted: 0 },
                    //logging: console.log
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    //?  MASTER DEPARTMENT EXIST
                    if (result) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "data have been fetched successfully",
                            data: result
                        });
                    }
                    else {
                        //?  MASTER DEPARTMENT NOT EXIST
                        return res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 0,
                            message: "No data were found"
                        });
                    }
                })).catch((err) => {
                    return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
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
}
exports.default = new MasterDepartmentController();
