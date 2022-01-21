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
const company_model_1 = __importDefault(require("../../model/root/company.model"));
const compayuser_model_1 = __importDefault(require("../../model/root/compayuser.model"));
const users_model_1 = __importDefault(require("../../model/root/users.model"));
class CompanyController {
    registerCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var company_name = req.body.company_name;
                const checkName = yield company_model_1.default.findOne({
                    where: {
                        company_name: company_name
                    }
                });
                if (checkName == null) {
                    yield company_model_1.default.create(Object.assign({}, req.body)).then(function (response) {
                        res.status(200).json({ response_code: 1, message: "company registered successfully", data: response });
                    }).catch(function (err) {
                        res.status(500).json({ response_code: 0, message: err });
                    });
                }
                else {
                    res.status(500).json({ response_code: 0, message: "Company with same name already exits" });
                }
            }
            catch (error) {
                return res.status(500).json({ response_code: 0, message: error });
            }
        });
    }
    total_companies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var company_count = yield company_model_1.default.count({
                where: {
                    IsDeleted: 0
                }
            });
            res.status(200).json({ response_code: 1, count: company_count });
        });
    }
    add_company_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield compayuser_model_1.default.create(Object.assign({}, req.body)).then(function (data) {
                    res.status(200).json({ response_code: 1, message: "company user added", data: data });
                }).catch(function (err) {
                    res.status(500).json({ response_code: 0, message: err });
                });
            }
            catch (error) {
                return res.status(500).json({ response_code: 0, message: error });
            }
        });
    }
    add_company_login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Table Fields for Company Contact
            const company_contact = {
                company_id: req.body.company_id,
                name: req.body.name,
                department: req.body.department,
                mobile_no: req.body.mobile_no,
                canlogin: 1,
                created_by: req.body.created_by,
                updated_by: req.body.updated_by,
            };
            yield compayuser_model_1.default.create(Object.assign({}, company_contact)).then(function () {
                //Add login in User table
                const userLoginData = {
                    company_id: req.body.company_id,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    user_type: 2,
                    language: 1,
                    created_by: req.body.created_by,
                    updated_by: req.body.updated_by,
                };
                users_model_1.default.create(Object.assign({}, userLoginData)).then(function () {
                    res.status(200).json({ response_code: 1, message: "company Login Created" });
                }).catch(function (err) {
                    res.status(500).json({ response_code: 0, message: err });
                });
            }).catch(function (err) {
                res.status(500).json({ response_code: 0, message: err });
            });
        });
    }
    getCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield company_model_1.default.findAll({
                where: {
                    IsDeleted: 0
                },
                order: [
                    ['id', 'DESC']
                ]
            }).catch(err => {
                console.log(err);
                res.status(500).json({ response_code: 0, message: err });
            });
            res.status(200).json({ response_code: 1, data: data });
        });
    }
}
exports.default = new CompanyController();
