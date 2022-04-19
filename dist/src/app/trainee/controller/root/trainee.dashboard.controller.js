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
const sequelize_1 = require("sequelize");
const clinicalperformance_model_1 = __importDefault(require("../../../../core/model/driving/stimulator/clinical/clinicalperformance.model"));
const eLearningresult_model_1 = __importDefault(require("../../../../core/model/elearning/eLearningresult.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../../../core/model/root/curriculumbuilder.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../../../core/model/root/curriculum_parent_category_test.model"));
const technology_model_1 = __importDefault(require("../../../../core/model/root/technology.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../../../core/model/root/trainee_curriculum.model"));
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
//TODO THIS FILE CREATED TOTALLY FOR TRAINEE DASHBOARD API FOR ELEARNING 
class TraineeDashboard {
    getCompleteRatioOfCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_curriculum_model_1.default.findAll({
                    where: {
                        IsDeleted: 0,
                        IsBlock: 0,
                        trainee_id: req.body.trainee_id
                    }
                }).then((TraineeCurriculumData) => __awaiter(this, void 0, void 0, function* () {
                    if (TraineeCurriculumData.length != 0) {
                        let ModuleTest = Array();
                        for (let i = 0; i < TraineeCurriculumData.length; i++) {
                            yield curriculumbuilder_model_1.default.findAll({
                                include: [{
                                        required: true,
                                        model: curriculum_parent_category_test_model_1.default,
                                        where: {
                                            IsDeleted: 0,
                                            language_id: TraineeCurriculumData[i]['language_id'],
                                            technology_type_id: TraineeCurriculumData[i]['technology_id'],
                                        }
                                    }],
                                where: {
                                    IsDeleted: 0,
                                    curriculum_id: TraineeCurriculumData[i]['curriculum_id']
                                }
                            }).then((CurriculumBuilderData) => __awaiter(this, void 0, void 0, function* () {
                                for (let j = 0; j < CurriculumBuilderData.length; j++) {
                                    ModuleTest.push(CurriculumBuilderData[j]['CurriculumParentCategoryTest']);
                                }
                            })).catch((err) => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                    .json({ response_code: 0, message: "Oops! " + err.message });
                            });
                        }
                        let ResultTestPassed = 0;
                        let technologysData = Array();
                        yield trainee_curriculum_model_1.default.findAll({
                            include: [{
                                    model: technology_model_1.default,
                                    attributes: ['id', 'name'],
                                    where: { IsDeleted: 0 }
                                }],
                            where: {
                                trainee_id: req.body.trainee_id,
                                IsBlock: 0,
                                IsDeleted: 0
                            },
                            attributes: ['TechnologyCategory.name'],
                            group: ['TraineeCurriculum.technology_id']
                        }).then((techData) => {
                            if (techData.length != 0) {
                                for (let t = 0; t < techData.length; t++) {
                                    technologysData.push(techData[t]['TechnologyCategory']);
                                }
                            }
                            else {
                                res
                                    .status(response_codes_1.default.SUCCESS)
                                    .json({ response_code: 0, message: "Oops! no curriculum has been alloted to you." });
                            }
                        }, err => {
                            res
                                .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: "Oops! " + err.message });
                        });
                        let ElearningTestComplete = 0;
                        let SimulatorTestComplete = 0;
                        let ArTestComplete = 0;
                        let VrTestComplete = 0;
                        let InstructorLedTestComplete = 0;
                        for (let k = 0; k < ModuleTest.length; k++) {
                            if (ModuleTest[k]['technology_type_id'] == 1) { //E-Learning
                                yield eLearningresult_model_1.default.findAll({
                                    where: {
                                        trainee_id: req.body.trainee_id,
                                        curriculum_test_id: ModuleTest[k]['id'],
                                        IsDeleted: 0,
                                        IsBlock: 0,
                                        test_start: 1
                                    },
                                    order: [['attempt_no', 'DESC']]
                                }).then((ElearningResultData) => {
                                    if (ElearningResultData.length != 0) {
                                        if (ElearningResultData[0]['status'] == '3') {
                                            ResultTestPassed += 1;
                                            ElearningTestComplete += 1;
                                        }
                                    }
                                }).catch((err) => {
                                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                        .json({ response_code: 0, message: "Oops! " + err.message });
                                });
                            }
                            else if (ModuleTest[k]['technology_type_id'] == 2) { //Simulator
                                yield clinicalperformance_model_1.default.findOne({
                                    where: {
                                        trainee_enrollmentId: req.body.enrollment_Id,
                                        IsDeleted: 0,
                                        ModuleCT: ModuleTest[k]['title'],
                                        ResultCT: {
                                            [sequelize_1.Op.or]: ['Good', 'Average', 'Normal', 'Optimal']
                                        }
                                    },
                                    // logging:console.log
                                }).then((ClinicalPerformanceData) => {
                                    if (ClinicalPerformanceData != null) {
                                        ResultTestPassed += 1;
                                        SimulatorTestComplete += 1;
                                    }
                                }).catch((err) => {
                                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                        .json({ response_code: 0, message: "Oops! " + err.message });
                                });
                            }
                        }
                        //E-Learning Test Data
                        let ElearningTestData = ModuleTest.filter((element) => {
                            if (element['technology_type_id'] == 1) {
                                return element;
                            }
                        });
                        //Simulator Test Data
                        let SimulatorTestData = ModuleTest.filter((element) => {
                            if (element['technology_type_id'] == 2) {
                                return element;
                            }
                        });
                        let CourseData = Array();
                        for (let t = 0; t < technologysData.length; t++) {
                            if (technologysData[t]['id'] == 1) {
                                CourseData.push({
                                    technologys_id: technologysData[t]['id'],
                                    technologys_name: technologysData[t]['name'],
                                    total_test: ElearningTestData.length,
                                    completed_test: ElearningTestComplete
                                });
                            }
                            else if (technologysData[t]['id'] == 2) {
                                CourseData.push({
                                    technologys_id: technologysData[t]['id'],
                                    technologys_name: technologysData[t]['name'],
                                    total_test: SimulatorTestData.length,
                                    completed_test: SimulatorTestComplete
                                });
                            }
                        }
                        let ProgressRatio = (ResultTestPassed / ModuleTest.length) * 100;
                        res.status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, ProgressRatio: Math.round(ProgressRatio), courseData: CourseData });
                    }
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
}
exports.default = new TraineeDashboard();
