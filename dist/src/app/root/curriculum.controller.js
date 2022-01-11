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
const curriculum_parent_category_model_1 = __importDefault(require("../../model/root/curriculum_parent_category.model"));
const technology_model_1 = __importDefault(require("../../model/root/technology.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../model/root/curriculum_parent_category_test.model"));
class CurriculumController {
    create_curriculum_parent_category() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    add_curriculum_parent_test() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getTechnology = yield technology_model_1.default.findAll();
                if (getTechnology != null) {
                    return res.status(200).json({
                        response_code: 1,
                        message: "Fetching Technology List...",
                        data: getTechnology
                    });
                }
                else {
                    return res.status(500).json({ response_code: 0, message: "No Technology Found...", data: "" });
                }
            }
            catch (e) {
                return res.status(200).json({
                    response_code: 1,
                    message: e,
                    data: ''
                });
            }
        });
    }
    getCurriculumParent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const technology_id = req.body.technology_id;
                const getCurriculum = yield curriculum_parent_category_model_1.default.findAll({
                    where: {
                        technology_type_id: technology_id
                    }
                });
                if (getCurriculum != null) {
                    return res.status(200).json({
                        response_code: 1,
                        message: "Fetching Curriculum List...",
                        data: getCurriculum
                    });
                }
                else {
                    return res.status(500).json({ response_code: 0, message: "No Curriculum Parent Category Found...", data: "" });
                }
            }
            catch (e) {
                return res.status(200).json({
                    response_code: 1,
                    message: e,
                    data: ''
                });
            }
        });
    }
    getCurriculumParentTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parent_id = req.body.parent_id;
                const getTest = yield curriculum_parent_category_test_model_1.default.findAll({
                    where: {
                        parent_id: parent_id
                    }
                });
                if (getTest != null) {
                    return res.status(200).json({
                        response_code: 1,
                        message: "Fetching List...",
                        data: getTest
                    });
                }
                else {
                    return res.status(500).json({ response_code: 0, message: "No  Parent Category Found...", data: "" });
                }
            }
            catch (e) {
                return res.status(200).json({
                    response_code: 1,
                    message: e,
                    data: ''
                });
            }
        });
    }
    buildCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new CurriculumController();
