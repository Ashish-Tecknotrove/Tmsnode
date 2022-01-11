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
                        res.status(200).json({ response_code: 1, message: "company registered successfully", response: response });
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
    add_company_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield compayuser_model_1.default.create(Object.assign({}, req.body)).then(function (response) {
                    res.status(200).json({ response_code: 1, message: "company user added" });
                }).catch(function (err) {
                    res.status(500).json({ response_code: 0, message: err });
                });
            }
            catch (error) {
                return res.status(500).json({ response_code: 0, message: error });
            }
        });
    }
}
exports.default = new CompanyController();
