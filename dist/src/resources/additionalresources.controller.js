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
const sequelize_1 = __importDefault(require("../core/database/sequelize"));
const sequelize_2 = __importDefault(require("sequelize"));
const response_codes_1 = __importDefault(require("../core/strings/response-codes"));
const technology_model_1 = __importDefault(require("../core/model/root/technology.model"));
class AdditionalresourcesController {
    getCountry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var country = yield sequelize_1.default.query("Select * from countries ORDER BY title ASC", { type: sequelize_2.default.QueryTypes.SELECT });
                res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, data: country });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var country_id = req.body.country_id;
                console.log(country_id);
                var state = yield sequelize_1.default.query(`Select * from states where country_id=${country_id} ORDER BY title ASC `, { type: sequelize_2.default.QueryTypes.SELECT });
                res.status(200).json({ response_code: 1, data: state });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getCities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var stateid = req.body.state_id;
                var cities = yield sequelize_1.default.query(`Select * from cities where state_id=${stateid} ORDER BY title ASC `, { type: sequelize_2.default.QueryTypes.SELECT });
                res.status(200).json({ response_code: 1, data: cities });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getLanguages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var languages = yield sequelize_1.default.query(`Select * from languages`, { type: sequelize_2.default.QueryTypes.SELECT });
                res.status(200).json({ response_code: 1, data: languages });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getTechnology = yield technology_model_1.default.findAll();
                if (getTechnology != null) {
                    return res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "data have been fetched successfully",
                        data: getTechnology,
                    });
                }
                else {
                    return res
                        .status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: "No data were found", data: "" });
                }
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
exports.default = new AdditionalresourcesController();
