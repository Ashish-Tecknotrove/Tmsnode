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
const uuid_1 = require("uuid");
const app_label_value_1 = __importDefault(require("../../model/language/app.label.value"));
const language_model_1 = __importDefault(require("../../model/language/language.model"));
class AppLabelValueController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            try {
                const record = yield app_label_value_1.default.create(Object.assign({}, req.body));
                return res.json({ msg: "Successfully Added value" });
            }
            catch (e) {
                return res.json({ msg: e });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const joinData = yield app_label_value_1.default.findAll({
                    include: language_model_1.default
                });
                return res.status(200).json({ "response_code": 1, "message": "Data Fetched Successfully...", data: joinData });
            }
            catch (e) {
                return res.status(500).json({ "response_code": 0, "message": e.message, data: [] });
            }
        });
    }
    addValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new AppLabelValueController();
