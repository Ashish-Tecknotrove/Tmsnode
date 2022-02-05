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
const sequelize_1 = __importDefault(require("../../database/sequelize"));
const sequelize_2 = __importDefault(require("sequelize"));
class AdditionalresourcesController {
    getCountry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var country = yield sequelize_1.default.query("Select * from countries", { type: sequelize_2.default.QueryTypes.SELECT });
            res.status(200).json({ response_code: 1, data: country });
        });
    }
    getState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var country_id = req.body.country_id;
            var state = yield sequelize_1.default.query(`Select * from states where country_id=${country_id}`, { type: sequelize_2.default.QueryTypes.SELECT });
            res.status(200).json({ response_code: 1, data: state });
        });
    }
    getCities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var stateid = req.body.state_id;
            var cities = yield sequelize_1.default.query(`Select * from cities where state_id=${stateid}`, { type: sequelize_2.default.QueryTypes.SELECT });
            res.status(200).json({ response_code: 1, data: cities });
        });
    }
    getLanguages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var languages = yield sequelize_1.default.query(`Select * from languages`, { type: sequelize_2.default.QueryTypes.SELECT });
            res.status(200).json({ response_code: 1, data: languages });
        });
    }
}
exports.default = new AdditionalresourcesController();
