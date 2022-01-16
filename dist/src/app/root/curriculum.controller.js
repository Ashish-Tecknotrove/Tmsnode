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
const curriculumbuilder_model_1 = __importDefault(require("../../model/root/curriculumbuilder.model"));
const curriculum_model_1 = __importDefault(require("../../model/root/curriculum.model"));
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
                    include: [{
                            model: curriculum_parent_category_test_model_1.default
                        }],
                    where: {
                        technology_type_id: technology_id
                    },
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
            //Create Curriculum
            const curriculum = {
                company_id: req.body.company_id,
                name: req.body.name,
                created_by: req.body.created_by,
                updated_by: req.body.updated_by,
            };
            //Check Curriculum Already Exist
            var check_curriculum_exist = yield curriculum_model_1.default.findOne({
                where: {
                    name: req.body.name
                }
            });
            if (check_curriculum_exist == null) {
                //Parse JSON String into JSON Object
                var curriculumBody = req.body.curriculum;
                var curriculumBodyData = JSON.parse(curriculumBody);
                //Parse JSON String into JSON Object
                //Step 1 Create Curriculum Data
                yield curriculum_model_1.default.create(Object.assign({}, curriculum)).then(function (data) {
                    //Get Curriculum Id
                    var curriculum_id = data['id'];
                    //Add This id and Created Curriculum Builder with parent id
                    for (var i = 0; i < curriculumBodyData.length; i++) {
                        var curriculum_data = {
                            curriculum_id: curriculum_id,
                            curriculum_parent_category_id: curriculumBodyData[i]["cp_id"],
                            curriculum_parent_category_test_id: curriculumBodyData[i]["cptest_id"],
                            created_by: curriculumBodyData[i]["created_by"],
                            updated_by: curriculumBodyData[i]["updated_by"]
                        };
                        curriculumbuilder_model_1.default.create(Object.assign({}, curriculum_data)).then(function () {
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                    res.status(200).json({ response_code: 1, curriculum_id: data['id'], message: "Curriculum Created Successfully..." });
                }).catch(function (err) {
                    res.status(500).json({ response_code: 0, message: err });
                });
            }
            else {
                res.status(500).json({ response_code: 0, message: "Curriculum Already Exist" });
            }
        });
    }
}
exports.default = new CurriculumController();
