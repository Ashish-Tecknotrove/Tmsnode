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
const company_model_1 = __importDefault(require("../../../../core/model/root/company.model"));
const masterpanel_model_1 = __importDefault(require("../../../../core/model/root/masterpanel.model"));
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
const response_strings_1 = __importDefault(require("../../../../core/strings/response-strings"));
const moment_1 = __importDefault(require("moment"));
const subscription_model_1 = __importDefault(require("../../../../core/model/root/subscription.model"));
const sequelize_1 = require("sequelize");
class SuperAdminDashboard {
    total_companies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var company_count = yield company_model_1.default.count({
                    include: [{
                            model: masterpanel_model_1.default,
                            //required:false,
                            where: { IsDeleted: 0 }
                        }],
                    where: {
                        IsDeleted: 0,
                        company_type: 0
                    },
                })
                    .then((success) => {
                    res
                        .status(response_codes_1.default.SUCCESS)
                        .json({
                        response_code: 1,
                        message: response_strings_1.default.GET,
                        count: success,
                    });
                })
                    .catch((error) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + error.message });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
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
}
exports.default = new SuperAdminDashboard();
