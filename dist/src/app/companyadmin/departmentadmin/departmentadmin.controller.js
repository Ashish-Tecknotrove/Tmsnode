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
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const clinicalperformance_model_1 = __importDefault(require("../../../core/model/driving/stimulator/clinical/clinicalperformance.model"));
const eLearningresult_model_1 = __importDefault(require("../../../core/model/elearning/eLearningresult.model"));
const elearning_status_model_1 = __importDefault(require("../../../core/model/elearning/elearning_status.model"));
const company_department_model_1 = __importDefault(require("../../../core/model/root/company_department.model"));
const curriculum_model_1 = __importDefault(require("../../../core/model/root/curriculum.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../../core/model/root/curriculumbuilder.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../../core/model/root/curriculum_parent_category_test.model"));
const trainee_model_1 = __importDefault(require("../../../core/model/root/trainee.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../../core/model/root/trainee_curriculum.model"));
const trainer_model_1 = __importDefault(require("../../../core/model/root/trainer.model"));
const response_codes_1 = __importDefault(require("../../../core/strings/response-codes"));
const response_strings_1 = __importDefault(require("../../../core/strings/response-strings"));
class BranchAdminController {
    //TODO Trainer Management
    get_assigned_trainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var where = {};
                if (req.body.sub_company_id) {
                    where = {
                        company_id: req.body.company_id,
                        sub_company_id: req.body.sub_company_id,
                        department_id: req.body.department_id,
                        IsBlock: 0,
                        IsDeleted: 0,
                    };
                }
                else {
                    where = {
                        company_id: req.body.company_id,
                        department_id: req.body.department_id,
                        IsBlock: 0,
                        IsDeleted: 0,
                    };
                }
                yield trainer_model_1.default.findAll({
                    attributes: {
                        exclude: [
                            "password",
                            "updated_by",
                            "created_by",
                            "deleted_by",
                            "createdAt",
                            "updatedAt",
                            "deletedAt",
                            "IsDeleted",
                            "IsBlock",
                        ],
                    },
                    where: where,
                    order: [["id", "DESC"]]
                })
                    .then((trainerData) => {
                    if (trainerData.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "data have been fetched successfully.",
                            data: trainerData,
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 0,
                            message: "No data were found, Trainer have not been assigned to this branch",
                            data: trainerData,
                        });
                    }
                })
                    .catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    //this Function will get All Assigned and Not Assigned Trainee OF Trainer
    get_trainee_assigned_to_trainer_and_not_assigned(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                try {
                    var trainer_id = req.body.trainer_id;
                    var company_id = req.body.company_id;
                    var department_id = req.body.department_id;
                    var where = {};
                    if (req.body.sub_company_id) {
                        where = {
                            [sequelize_1.Op.or]: [{ trainer_id: trainer_id }, { trainer_id: 0 }],
                            company_id: company_id,
                            sub_company_id: req.body.sub_company_id,
                            department_id: department_id,
                            IsBlock: 0,
                            IsDeleted: 0
                        };
                    }
                    else {
                        where = {
                            [sequelize_1.Op.or]: [{ trainer_id: trainer_id }, { trainer_id: 0 }],
                            company_id: company_id,
                            department_id: department_id,
                            IsBlock: 0,
                            IsDeleted: 0
                        };
                    }
                    yield trainee_model_1.default.findAll({
                        attributes: ["id", "first_name", "last_name", "trainer_id"],
                        where: where,
                        order: [["id", "DESC"]]
                    }).then((result) => {
                        if (result.length != 0) {
                            for (let i = 0; i < result.length; i++) {
                                if (result[i]["trainer_id"] == 0 || result[i]["trainer_id"] == null) {
                                    result[i]["dataValues"]["assign"] = false;
                                }
                                else {
                                    result[i]["dataValues"]["assign"] = true;
                                }
                            }
                            res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 1, message: "trainee fetched successfully.", data: result });
                        }
                        else {
                            res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 0, message: "Oops! No Trainee Found.", data: result });
                        }
                    }).catch(err => {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                catch (err) {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                }
            }
            catch (err) {
                res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    assign_trainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var updateJSON = JSON.parse(req.body.updateData);
                for (let i = 0; i < updateJSON.length; i++) {
                    var update = {
                        trainer_id: updateJSON[i]["trainer_id"]
                    };
                    var trainee_id = updateJSON[i]["id"];
                    yield trainee_model_1.default.update(Object.assign({}, update), { where: { id: trainee_id } }).then(res => {
                    }).catch(err => {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Operation updated successfully" });
            }
            catch (err) {
                res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    //TODO Trainee Management
    get_department_assign_trainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var where = {};
                if (req.body.sub_company_id) {
                    where = {
                        company_id: req.body.company_id,
                        sub_company_id: req.body.sub_company_id,
                        department_id: req.body.department_id,
                        IsBlock: 0,
                        IsDeleted: 0,
                    };
                }
                else {
                    where = {
                        company_id: req.body.company_id,
                        department_id: req.body.department_id,
                        IsBlock: 0,
                        IsDeleted: 0,
                    };
                }
                yield trainee_model_1.default.findAll({
                    attributes: [
                        "id", "enrollmentId", "first_name", "last_name", "email", "contact"
                    ],
                    include: [{
                            model: trainer_model_1.default,
                            attributes: ["id", "name"],
                            required: false,
                            where: {
                                IsBlock: 0,
                                IsDeleted: 0
                            }
                        }],
                    where: where,
                    order: [["id", "DESC"]]
                })
                    .then((trainerData) => {
                    if (trainerData.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "data have been fetched successfully.",
                            data: trainerData,
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 0,
                            message: "No data were found, Trainer have not been assigned to this branch",
                            data: trainerData,
                        });
                    }
                })
                    .catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    getTraineeSimulatorConsolidatedReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let test_array = ["Reaction Time Test", "Driving Aptitude Test", "Anticipation Test", "Judgement Test", "Color Blindness Test", "Vision Test"];
                let AllReport = Array();
                for (let t = 0; t < test_array.length; t++) {
                    yield clinicalperformance_model_1.default.findAll({
                        include: [{
                                model: trainer_model_1.default,
                                attributes: ['name', 'email']
                            }],
                        where: {
                            IsDeleted: 0,
                            trainee_enrollmentId: req.body.enrollmentId,
                            ModuleCT: test_array[t]
                        },
                        order: [['id', 'DESC'],],
                    }).then((ClinicalPerformanceData) => __awaiter(this, void 0, void 0, function* () {
                        if (ClinicalPerformanceData.length != 0) {
                            ClinicalPerformanceData = ClinicalPerformanceData[0];
                            let ResponseAccuracy = {
                                "C": "Correct",
                                "I": "In Correct",
                                "NA": "Not Attempted",
                                "H": "Crashed"
                            };
                            if (ClinicalPerformanceData['ModuleCT'] == "Reaction Time Test") {
                                let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                                var FaultsCTArray = FaultsCT.split(",");
                                let FaultsCTData = Array();
                                for (let i = 0; i < FaultsCTArray.length; i++) {
                                    let tempFaultsCT = FaultsCTArray[i].split("-");
                                    FaultsCTData.push({
                                        Attempts: i + 1,
                                        ResponseTime: tempFaultsCT[0],
                                        ResponseAccuracy: tempFaultsCT[1],
                                        Status: ResponseAccuracy[tempFaultsCT[1]],
                                    });
                                }
                                AllReport.push({
                                    ModuleCT: ClinicalPerformanceData['ModuleCT'],
                                    data: ClinicalPerformanceData,
                                    FaultsCTData: FaultsCTData
                                });
                            }
                            else if (ClinicalPerformanceData['ModuleCT'] == "Driving Aptitude Test") {
                                let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                                var FaultsCTArray = FaultsCT.split(",");
                                let FaultsCTData = Array();
                                for (let i = 0; i < FaultsCTArray.length; i++) {
                                    let tempFaultsCT = FaultsCTArray[i].split("-");
                                    FaultsCTData.push({
                                        Attempts: i + 1,
                                        ResponseTime: tempFaultsCT[0],
                                        ResponseAccuracy: tempFaultsCT[1],
                                        Status: ResponseAccuracy[tempFaultsCT[1]],
                                    });
                                }
                                AllReport.push({
                                    ModuleCT: ClinicalPerformanceData['ModuleCT'],
                                    data: ClinicalPerformanceData,
                                    FaultsCTData: FaultsCTData
                                });
                            }
                            else if (ClinicalPerformanceData['ModuleCT'] == "Color Blindness Test") {
                                let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                                var FaultsCTArray = FaultsCT.split("-");
                                let outof = ['1', '3', '3', '3'];
                                let name = ['General', 'Red-Green', 'Blue-Yellow', 'Total Colour Blindness'];
                                let FaultsCTData = Array();
                                for (let i = 0; i < FaultsCTArray.length; i++) {
                                    FaultsCTData.push({
                                        name: name[i],
                                        value: FaultsCTArray[i],
                                        outof: outof[i],
                                    });
                                }
                                AllReport.push({
                                    ModuleCT: ClinicalPerformanceData['ModuleCT'],
                                    data: ClinicalPerformanceData,
                                    FaultsCTData: FaultsCTData
                                });
                            }
                            else if (ClinicalPerformanceData['ModuleCT'] == "Judgement Test") {
                                let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                                var FaultsCTArray = FaultsCT.split("-");
                                let FaultsCTData = {};
                                FaultsCTData = {
                                    Total_hits: FaultsCTArray[0],
                                    LS: FaultsCTArray[0],
                                    RS: FaultsCTArray[0],
                                };
                                AllReport.push({
                                    ModuleCT: ClinicalPerformanceData['ModuleCT'],
                                    data: ClinicalPerformanceData,
                                    FaultsCTData: FaultsCTData
                                });
                            }
                            else if (ClinicalPerformanceData['ModuleCT'] == "Vision Test") {
                                let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                                let FaultsCTData = {};
                                FaultsCTData = {
                                    score: FaultsCT.substr(2) + '/' + '7',
                                    RemarksCT: ClinicalPerformanceData['RemarksCT']
                                };
                                AllReport.push({
                                    ModuleCT: ClinicalPerformanceData['ModuleCT'],
                                    data: ClinicalPerformanceData,
                                    FaultsCTData: FaultsCTData
                                });
                            }
                            else if (ClinicalPerformanceData['ModuleCT'] == "Anticipation Test") {
                                let FaultsCT = ClinicalPerformanceData['FaultsCT'];
                                var FaultsCTArray = FaultsCT.split(",");
                                let FaultsCTData = Array();
                                for (let i = 0; i < FaultsCTArray.length; i++) {
                                    let tempFaultsCT = FaultsCTArray[i];
                                    if (tempFaultsCT == 'NA') {
                                        FaultsCTData.push({
                                            attempts: i + 1,
                                            value: tempFaultsCT,
                                            accurracy: '-'
                                        });
                                    }
                                    else if (tempFaultsCT >= 0 && tempFaultsCT <= 2) {
                                        FaultsCTData.push({
                                            attempts: i + 1,
                                            value: tempFaultsCT,
                                            accurracy: 'Ideal Zone'
                                        });
                                    }
                                    else if (tempFaultsCT > 2) {
                                        FaultsCTData.push({
                                            attempts: i + 1,
                                            value: tempFaultsCT,
                                            accurracy: 'Underrun'
                                        });
                                    }
                                    else if (tempFaultsCT < 0) {
                                        FaultsCTData.push({
                                            attempts: i + 1,
                                            value: tempFaultsCT,
                                            accurracy: 'Overrun'
                                        });
                                    }
                                }
                                AllReport.push({
                                    ModuleCT: ClinicalPerformanceData['ModuleCT'],
                                    data: ClinicalPerformanceData,
                                    FaultsCTData: FaultsCTData
                                });
                            }
                        }
                    })).catch((err) => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                if (AllReport.length != 0) {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        Report: AllReport
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 0,
                        message: "Does not generate any test Report!"
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    getTraineeElearingConsolidatedReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_curriculum_model_1.default.findAll({
                    include: [{
                            model: curriculum_model_1.default,
                            where: {
                                IsDeleted: 0
                            },
                            attributes: ['id', 'company_id', 'name']
                        }],
                    where: {
                        IsDeleted: 0,
                        trainee_id: req.body.trainee_id,
                        technology_id: 1
                    },
                    attributes: ['id', 'trainee_id', 'language_id', 'curriculum_id', 'technology_id']
                }).then((TraineeCurriculumData) => __awaiter(this, void 0, void 0, function* () {
                    // console.log("TraineeCurriculumData->",TraineeCurriculumData[0]['dataValues']);
                    for (let i = 0; i < TraineeCurriculumData.length; i++) {
                        yield curriculumbuilder_model_1.default.findAll({
                            include: [{
                                    model: curriculum_parent_category_test_model_1.default,
                                    include: [
                                        {
                                            model: eLearningresult_model_1.default,
                                            include: [{
                                                    model: elearning_status_model_1.default,
                                                    attributes: ['id', 'status']
                                                }],
                                            required: false,
                                            limit: 1,
                                            order: [['id', 'DESC']],
                                            where: { trainee_id: req.body.trainee_id, test_start: 1 },
                                            attributes: { exclude: ['created_by', 'updated_by', 'deleted_by', 'updatedAt', 'deletedAt', 'IsBlock', 'IsDeleted'] }
                                        }
                                    ],
                                    where: {
                                        technology_type_id: TraineeCurriculumData[i]['technology_id'],
                                        language_id: TraineeCurriculumData[i]['language_id'],
                                    },
                                    attributes: ['id', 'prefix', 'title', 'description', 'parent_id', 'technology_type_id', 'language_id']
                                }],
                            where: {
                                curriculum_id: TraineeCurriculumData[i]['curriculum_id'],
                                IsDeleted: 0
                            },
                            attributes: ['id', 'curriculum_id', 'curriculum_parent_category_id', 'curriculum_parent_category_test_id', 'passing_marks', 'total_marks', 'attempts']
                        }).then((CurriculumBuilderData) => __awaiter(this, void 0, void 0, function* () {
                            let TestObj = Array();
                            for (let j = 0; j < CurriculumBuilderData.length; j++) {
                                let ElearningResult = CurriculumBuilderData[j]['dataValues']['CurriculumParentCategoryTest']['ElearningResults'];
                                if (ElearningResult.length != 0) {
                                    let score = ElearningResult[0]['score'];
                                    let total_marks = CurriculumBuilderData[j]['dataValues']['total_marks'];
                                    TestObj.push({
                                        prefix: CurriculumBuilderData[j]['dataValues']['CurriculumParentCategoryTest']['prefix'],
                                        title: CurriculumBuilderData[j]['dataValues']['CurriculumParentCategoryTest']['title'],
                                        passing_marks: CurriculumBuilderData[j]['dataValues']['passing_marks'],
                                        total_marks: CurriculumBuilderData[j]['dataValues']['total_marks'],
                                        attempts: CurriculumBuilderData[j]['dataValues']['attempts'],
                                        percentage: Math.round((score / total_marks) * 100),
                                        score: score,
                                        trainee_attempt: ElearningResult[0]['attempt_no'],
                                        trainee_test_status: ElearningResult[0]['ElearningStatus']['status'],
                                    });
                                }
                                else {
                                    TestObj.push({
                                        prefix: CurriculumBuilderData[j]['dataValues']['CurriculumParentCategoryTest']['prefix'],
                                        title: CurriculumBuilderData[j]['dataValues']['CurriculumParentCategoryTest']['title'],
                                        passing_marks: CurriculumBuilderData[j]['dataValues']['passing_marks'],
                                        total_marks: CurriculumBuilderData[j]['dataValues']['total_marks'],
                                        attempts: CurriculumBuilderData[j]['dataValues']['attempts'],
                                        percentage: 'NA',
                                        score: 'NA',
                                        trainee_attempt: 'NA',
                                        trainee_test_status: 'Yet to Start',
                                    });
                                }
                            }
                            TraineeCurriculumData[i]['dataValues']['CurriculumBuilderData'] = TestObj;
                        })).catch((err) => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }
                    if (TraineeCurriculumData.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            Report: TraineeCurriculumData
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 0,
                            Report: TraineeCurriculumData
                        });
                    }
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    //TODO DASHBOARD
    getTrainerPerfomance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TraineesData = yield trainee_model_1.default.findAll({
                    include: [
                        {
                            model: trainee_curriculum_model_1.default,
                            where: {
                                IsDeleted: 0,
                                IsBlock: 0
                            }
                        }
                    ],
                    where: {
                        IsDeleted: 0,
                        trainer_id: req.body.trainer_id
                    }
                });
                if (TraineesData.length != 0) {
                    let Completed = 0;
                    let InProgress = 0;
                    let LastDay0TraineeCount = 0;
                    let LastDay1TraineeCount = 0;
                    let LastDay2TraineeCount = 0;
                    let LastDay3TraineeCount = 0;
                    let lastDay0 = (0, moment_1.default)().subtract(0, 'day').format('YYYY-MM-DD');
                    let lastDay1 = (0, moment_1.default)().subtract(1, 'day').format('YYYY-MM-DD');
                    let lastDay2 = (0, moment_1.default)().subtract(2, 'day').format('YYYY-MM-DD');
                    let lastDay3 = (0, moment_1.default)().subtract(3, 'day').format('YYYY-MM-DD');
                    //Get TraineesId by Filter
                    let TraineesId = Array();
                    TraineesData.filter((element) => {
                        TraineesId.push(element['id']);
                    });
                    //* Get Curriculums By Trainees
                    let getTraineeCurriculum = yield trainee_curriculum_model_1.default.findAll({
                        where: {
                            trainee_id: TraineesId,
                            IsDeleted: 0
                        },
                        group: ['curriculum_id']
                    });
                    //* Get Curriculums Ids for IN Query
                    let TraineeCurriculumId = Array();
                    getTraineeCurriculum.filter((element) => {
                        TraineeCurriculumId.push(element['curriculum_id']);
                    });
                    //Get Curriculum Builder by Curriculums Ids
                    let CurriculumBuilderData1 = yield curriculumbuilder_model_1.default.findAll({
                        where: {
                            curriculum_id: TraineeCurriculumId,
                            IsDeleted: 0
                        }
                    });
                    let ElearningResultData1 = yield eLearningresult_model_1.default.findAll({
                        where: {
                            IsDeleted: 0,
                            trainee_id: TraineesId
                        },
                        order: [['attempt_no', 'DESC']]
                    });
                    for (let i = 0; i < TraineesData.length; i++) {
                        let TraineeCurriculums = TraineesData[i]['dataValues']['TraineeCurriculums'];
                        let TotalCurriculum = TraineeCurriculums.length;
                        let CurriculumNotAttempt = 0;
                        let CurriculumAttempt = 0;
                        let CurriculumPass = 0;
                        let LastDay0CurriculumCount = 0;
                        let LastDay1CurriculumCount = 0;
                        let LastDay2CurriculumCount = 0;
                        let LastDay3CurriculumCount = 0;
                        for (let j = 0; j < TraineeCurriculums.length; j++) {
                            // Curriculum Builder Filter to get Particulur Trainees Curriculum Test Module 
                            let CurriculumBuilderData = CurriculumBuilderData1.filter((element) => {
                                if (element['curriculum_id'] == TraineeCurriculums[j]['dataValues']['curriculum_id']) {
                                    return element;
                                }
                            });
                            let TotalTest = CurriculumBuilderData.length;
                            let ElearningResultTestNotAttempt = 0;
                            let ElearningResultTestAttempt = 0;
                            let ElearningResultTestPassed = 0;
                            let ElearningResultTestFailed = 0;
                            let LastDay0TestCount = 0;
                            let LastDay1TestCount = 0;
                            let LastDay2TestCount = 0;
                            let LastDay3TestCount = 0;
                            for (let k = 0; k < TotalTest; k++) {
                                // Get Elearning Results
                                let ElearningResults = ElearningResultData1.filter((element) => {
                                    if (element['dataValues']['curriculum_test_id'] == CurriculumBuilderData[k]['dataValues']['curriculum_parent_category_test_id'] &&
                                        element['dataValues']['trainee_id'] == TraineesData[i]['dataValues']['id']) {
                                        return element;
                                    }
                                });
                                let ElearningResultData = ElearningResults[0];
                                if (ElearningResults.length != 0) {
                                    if (ElearningResultData['status'] == '3') { //check Passed 
                                        ElearningResultTestPassed += 1;
                                        // lastDay0
                                        if ((0, moment_1.default)(ElearningResultData['dataValues']['createdAt']).format('YYYY-MM-DD') == lastDay0) {
                                            LastDay0TestCount += 1;
                                        }
                                        // lastDay1
                                        if ((0, moment_1.default)(ElearningResultData['dataValues']['createdAt']).format('YYYY-MM-DD') == lastDay1) {
                                            LastDay1TestCount += 1;
                                        }
                                        // lastDay2
                                        if ((0, moment_1.default)(ElearningResultData['dataValues']['createdAt']).format('YYYY-MM-DD') == lastDay2) {
                                            LastDay2TestCount += 1;
                                        }
                                        // lastDay3
                                        if ((0, moment_1.default)(ElearningResultData['dataValues']['createdAt']).format('YYYY-MM-DD') == lastDay3) {
                                            LastDay3TestCount += 1;
                                        }
                                    }
                                    else if (ElearningResultData['status'] == '2') { // check failed
                                        ElearningResultTestFailed += 1;
                                    }
                                    ElearningResultTestAttempt += 1;
                                }
                                else {
                                    ElearningResultTestNotAttempt += 1;
                                }
                                CurriculumBuilderData[k]['dataValues']['ElearningResult'] = ElearningResultData;
                                TraineeCurriculums[j]['dataValues']['CurriculumBuilder'] = CurriculumBuilderData;
                                TraineeCurriculums[j]['dataValues']['TotalTest'] = TotalTest;
                            } //TotalTest for loop end
                            if (ElearningResultTestPassed == TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestPassed'] = true;
                                CurriculumPass += 1;
                                let LastDayAttempt = false;
                                let LastAttemptBit = 0;
                                if (LastDay3TestCount >= 1) {
                                    LastDayAttempt = true;
                                    LastAttemptBit = 3;
                                }
                                if (LastDay2TestCount >= 1) {
                                    LastDayAttempt = true;
                                    LastAttemptBit = 2;
                                }
                                if (LastDay1TestCount >= 1) {
                                    LastDayAttempt = true;
                                    LastAttemptBit = 1;
                                }
                                if (LastDay0TestCount >= 1) {
                                    LastDayAttempt = true;
                                    LastAttemptBit = 0;
                                }
                                if (LastDayAttempt == true && LastAttemptBit == 1) {
                                    LastDay1CurriculumCount += 1;
                                }
                                if (LastDayAttempt == true && LastAttemptBit == 2) {
                                    LastDay2CurriculumCount += 1;
                                }
                                if (LastDayAttempt == true && LastAttemptBit == 3) {
                                    LastDay3CurriculumCount += 1;
                                }
                            }
                            if (ElearningResultTestAttempt > 0 && ElearningResultTestAttempt <= TotalTest && ElearningResultTestPassed != TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestAttempt'] = true;
                                CurriculumAttempt += 1;
                            }
                        } //TraineeCurriculums for loop end
                        TraineesData[i]['dataValues']['TotalCurriculum'] = TotalCurriculum;
                        if (CurriculumPass == TotalCurriculum) {
                            TraineesData[i]['dataValues']['AllCurriculumsPassed'] = true;
                            Completed += 1;
                            if (CurriculumPass == LastDay1CurriculumCount) {
                                LastDay1TraineeCount += 1;
                            }
                            if (CurriculumPass == LastDay2CurriculumCount) {
                                LastDay2TraineeCount += 1;
                            }
                            if (CurriculumPass == LastDay3CurriculumCount) {
                                LastDay3TraineeCount += 1;
                            }
                        }
                        if (CurriculumAttempt == TotalCurriculum) {
                            TraineesData[i]['dataValues']['AllCurriculumAttempt'] = true;
                            InProgress += 1;
                        }
                    } // TraineesData for loop end
                    let SuccessRatio = (Completed / TraineesData.length) * 100;
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "Trainer progress fetched successfully.",
                        AssignTrainees: TraineesData.length,
                        InProgress: InProgress,
                        Completed: Completed,
                        SuccessRatio: Math.round(SuccessRatio),
                        Last3DaysPerfomance: {
                            Last1DayDate: lastDay1,
                            Last1DayCount: LastDay1TraineeCount,
                            Last2DayDate: lastDay2,
                            Last2DayCount: LastDay2TraineeCount,
                            Last3DayDate: lastDay3,
                            Last3DayCount: LastDay3TraineeCount,
                        }
                        // TraineesData: TraineesData
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 0,
                        message: "Oops! Trainees not assign yet.",
                        assignTrainees: 0,
                        InProgress: 0,
                        Completed: 0,
                        SuccessRatio: 0
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    //* Trainee Trainning Progress Dashboard Card1 Report
    getTraineeTrainingReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let where = {};
                if (req.body.trainer_id && req.body.department_id && req.body.sub_company_id) {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        sub_company_id: req.body.sub_company_id,
                        department_id: req.body.department_id,
                        trainer_id: req.body.trainer_id
                    };
                }
                else if (req.body.department_id && req.body.sub_company_id) {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        sub_company_id: req.body.sub_company_id,
                        department_id: req.body.department_id
                    };
                }
                else if (req.body.sub_company_id) {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        sub_company_id: req.body.sub_company_id
                    };
                }
                else if (req.body.trainer_id && req.body.department_id) {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        department_id: req.body.department_id,
                        trainer_id: req.body.trainer_id
                    };
                }
                else if (req.body.department_id) {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        department_id: req.body.department_id
                    };
                }
                else if (req.body.trainer_id) {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        trainer_id: req.body.trainer_id
                    };
                }
                else {
                    where = {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    };
                }
                const TraineesData = yield trainee_model_1.default.findAll({
                    include: [
                        {
                            // required:false,
                            model: trainee_curriculum_model_1.default,
                            where: {
                                IsDeleted: 0
                            }
                        }
                    ],
                    where: where
                });
                if (TraineesData.length != 0) {
                    //Get Block Trainees Filter
                    let BlockTrainees = TraineesData.filter((element) => {
                        if (element['IsBlock'] == "1") {
                            return element;
                        }
                    });
                    let UnBlockTraineesId = Array();
                    //Get Unblock Trainees Filter
                    let UnBlockTrainees = TraineesData.filter((element) => {
                        if (element['IsBlock'] == "0") {
                            UnBlockTraineesId.push(element['id']);
                            return element;
                        }
                    });
                    // console.log("UnBlockTraineesId->", UnBlockTraineesId);
                    let YetToStart = 0;
                    let Completed = 0;
                    let InProgress = 0;
                    //* Get Curriculums By Trainees
                    let TraineeCurriculumId = Array();
                    let getTraineeCurriculum = yield trainee_curriculum_model_1.default.findAll({
                        where: {
                            trainee_id: UnBlockTraineesId,
                            IsDeleted: 0
                        },
                        group: ['curriculum_id']
                    });
                    //* Get Curriculums Ids for IN Query
                    getTraineeCurriculum.filter((element) => {
                        TraineeCurriculumId.push(element['curriculum_id']);
                    });
                    // console.log("TraineeCurriculumId->", TraineeCurriculumId);
                    //Get Curriculum Builder by Curriculums Ids
                    let CurriculumBuilderData1 = yield curriculumbuilder_model_1.default.findAll({
                        where: {
                            curriculum_id: TraineeCurriculumId,
                            IsDeleted: 0
                        }
                    });
                    let ElearningResultData1 = yield eLearningresult_model_1.default.findAll({
                        where: {
                            IsDeleted: 0,
                            trainee_id: UnBlockTraineesId
                        },
                        order: [['attempt_no', 'DESC']]
                    });
                    for (let i = 0; i < UnBlockTrainees.length; i++) {
                        let TraineeCurriculums = UnBlockTrainees[i]['dataValues']['TraineeCurriculums'];
                        let TotalCurriculum = TraineeCurriculums.length;
                        let CurriculumNotAttempt = 0;
                        let CurriculumAttempt = 0;
                        let CurriculumPass = 0;
                        //                if(TraineeCurriculums.length==0){
                        // console.log(UnBlockTrainees[i]['dataValues']['id']);
                        //                }
                        for (let j = 0; j < TraineeCurriculums.length; j++) {
                            let CurriculumBuilderData = CurriculumBuilderData1.filter((element) => {
                                if (element['curriculum_id'] == TraineeCurriculums[j]['dataValues']['curriculum_id']) {
                                    return element;
                                }
                            });
                            let TotalTest = CurriculumBuilderData.length;
                            let ElearningResultTestNotAttempt = 0;
                            let ElearningResultTestAttempt = 0;
                            let ElearningResultTestPassed = 0;
                            let ElearningResultTestFailed = 0;
                            for (let k = 0; k < TotalTest; k++) {
                                let ElearningResults = ElearningResultData1.filter((element) => {
                                    if (element['dataValues']['curriculum_test_id'] == CurriculumBuilderData[k]['dataValues']['curriculum_parent_category_test_id'] &&
                                        element['dataValues']['trainee_id'] == UnBlockTrainees[i]['dataValues']['id']) {
                                        return element;
                                    }
                                });
                                let ElearningResultData = ElearningResults[0];
                                if (ElearningResults.length != 0) {
                                    if (ElearningResultData['status'] == '3') {
                                        ElearningResultTestPassed += 1;
                                    }
                                    else if (ElearningResultData['status'] == '2') {
                                        ElearningResultTestFailed += 1;
                                    }
                                    ElearningResultTestAttempt += 1;
                                }
                                else {
                                    ElearningResultTestNotAttempt += 1;
                                }
                                CurriculumBuilderData[k]['dataValues']['ElearningResult'] = ElearningResultData;
                                TraineeCurriculums[j]['dataValues']['CurriculumBuilder'] = CurriculumBuilderData;
                                TraineeCurriculums[j]['dataValues']['TotalTest'] = TotalTest;
                            } //TotalTest for loop end
                            if (ElearningResultTestNotAttempt == TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestNotAttempt'] = true;
                                CurriculumNotAttempt += 1;
                            }
                            if (ElearningResultTestPassed == TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestPassed'] = true;
                                CurriculumPass += 1;
                            }
                            if (ElearningResultTestAttempt > 0 && ElearningResultTestAttempt <= TotalTest && ElearningResultTestPassed != TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestAttempt'] = true;
                                CurriculumAttempt += 1;
                            }
                        } // TraineeCurriculums for loop end
                        UnBlockTrainees[i]['dataValues']['TotalCurriculum'] = TotalCurriculum;
                        if (CurriculumNotAttempt == TotalCurriculum) {
                            UnBlockTrainees[i]['dataValues']['AllCurriculumNotAttempt'] = true;
                            YetToStart += 1;
                        }
                        if (CurriculumPass == TotalCurriculum) {
                            UnBlockTrainees[i]['dataValues']['AllCurriculumsPassed'] = true;
                            Completed += 1;
                        }
                        if (CurriculumAttempt == TotalCurriculum) {
                            UnBlockTrainees[i]['dataValues']['AllCurriculumAttempt'] = true;
                            InProgress += 1;
                        }
                    } // TraineeCurriculums unblock trainee for loop end
                    // console.log("UnBlockTrainees->",UnBlockTrainees)
                    let SuccessRatio = (Completed / UnBlockTrainees.length) * 100;
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.GET,
                        TotalTraineesRegister: UnBlockTrainees.length,
                        TotalBlockTrainees: BlockTrainees.length,
                        YetToStart: YetToStart,
                        Completed: Completed,
                        InProgress: InProgress,
                        SuccessRatio: Math.round(SuccessRatio),
                        // Curriculum: getTraineeCurriculum,
                        // CurriculumBuilderData: CurriculumBuilderData,
                        // TotalTraineesData: UnBlockTrainees,
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 0,
                        message: "Oops! Trainees not register or assign yet.",
                        TotalTraineesRegister: 0,
                        TotalBlockTrainees: 0,
                        YetToStart: 0,
                        Completed: 0,
                        InProgress: 0,
                        SuccessRatio: 0
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    getDashboardCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var company_id = req.body.company_id;
                var department_id = req.body.department_id;
                var trainee_count = 0;
                var trainer_count = 0;
                var department_count = 0;
                var where = {};
                if (req.body.sub_company_id) {
                    where = {
                        company_id: company_id,
                        sub_company_id: req.body.sub_company_id,
                        department_id: department_id,
                        IsBlock: 0,
                        IsDeleted: 0
                    };
                }
                else {
                    where = {
                        company_id: company_id,
                        department_id: department_id,
                        IsBlock: 0,
                        IsDeleted: 0
                    };
                }
                yield trainee_model_1.default.count({
                    where: where
                }).then(count => {
                    trainee_count = count;
                }).catch(error => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
                });
                yield trainer_model_1.default.count({
                    where: where
                }).then(count => {
                    trainer_count = count;
                }).catch(error => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
                });
                yield company_department_model_1.default.count({
                    where: where
                }).then(count => {
                    department_count = count;
                }).catch(error => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
                });
                res.status(response_codes_1.default.SUCCESS).json({
                    response_code: 1,
                    message: "Data fetched successfully",
                    trainee_count: trainee_count,
                    trainer_count: trainer_count,
                    department_count: department_count
                });
            }
            catch (err) {
            }
        });
    }
}
exports.default = new BranchAdminController();
