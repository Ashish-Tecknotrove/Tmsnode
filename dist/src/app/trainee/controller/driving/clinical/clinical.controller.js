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
const clinicalperformance_model_1 = __importDefault(require("../../../../../core/model/driving/stimulator/clinical/clinicalperformance.model"));
const assign_trainee_to_trainer_model_1 = __importDefault(require("../../../../../core/model/root/assign_trainee_to_trainer.model"));
const curriculum_model_1 = __importDefault(require("../../../../../core/model/root/curriculum.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../../../../core/model/root/curriculumbuilder.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../../../../core/model/root/curriculum_parent_category_test.model"));
const trainee_model_1 = __importDefault(require("../../../../../core/model/root/trainee.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../../../../core/model/root/trainee_curriculum.model"));
const trainer_model_1 = __importDefault(require("../../../../../core/model/root/trainer.model"));
const response_codes_1 = __importDefault(require("../../../../../core/strings/response-codes"));
class ClinicalController {
    get_clinical_dashboard_report(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var enrollment_id = req.body.enrollment_id;
                trainee_model_1.default.findOne({ where: { enrollmentId: enrollment_id } }).then((getTrainee) => __awaiter(this, void 0, void 0, function* () {
                    if (getTrainee != null) {
                        var trainee_id = getTrainee["id"];
                        var clinical_report;
                        yield clinicalperformance_model_1.default.findAll({
                            where: {
                                trainee_enrollmentId: enrollment_id
                            }
                        }).then(res => {
                            clinical_report = res;
                        }).catch(err => {
                        });
                        yield trainee_curriculum_model_1.default.findAll({
                            include: [
                                {
                                    model: curriculum_model_1.default,
                                    include: [{
                                            model: curriculumbuilder_model_1.default,
                                            include: [{
                                                    model: curriculum_parent_category_test_model_1.default,
                                                    required: true,
                                                    where: {
                                                        technology_type_id: 2
                                                    }
                                                }],
                                            where: {
                                                [sequelize_1.Op.or]: [
                                                    { attempts: { [sequelize_1.Op.not]: 'null' } },
                                                    { attempts: { [sequelize_1.Op.not]: '' } },
                                                    { attempts: { [sequelize_1.Op.not]: '0' } }
                                                ]
                                            }
                                        }],
                                    where: {
                                        IsDeleted: 0
                                    }
                                }
                            ],
                            where: {
                                IsDeleted: 0,
                                IsBlock: 0,
                                technology_id: 2,
                                trainee_id: trainee_id
                            },
                        }).then((fetchedData) => __awaiter(this, void 0, void 0, function* () {
                            var attempt = 0;
                            var result = "notattempt";
                            for (let i = 0; i < fetchedData.length; i++) {
                                var j_array = fetchedData[i]["Curriculum"]["CurriculumBuilders"];
                                for (let j = 0; j < j_array.length; j++) {
                                    var test_name = fetchedData[i]["Curriculum"]["CurriculumBuilders"][j]["CurriculumParentCategoryTest"]["title"];
                                    yield clinicalperformance_model_1.default.findAll({
                                        where: {
                                            trainee_enrollmentId: enrollment_id,
                                            ModuleCT: test_name
                                        },
                                        order: [["id", "DESC"]]
                                    }).then((ctexam) => {
                                        if (ctexam.length != 0) {
                                            // console.log(ctexam);
                                            var remaining = j_array[j]["attempts"] - ctexam.length;
                                            j_array[j]['dataValues']['remaining_attempt'] = remaining;
                                            //console.log(ctexam[0]["ResultCT"]);
                                            if (ctexam[0]["ResultCT"] == "Good" || ctexam[0]["ResultCT"] == "Average" || ctexam[0]["ResultCT"] == "Normal" || ctexam[0]["ResultCT"] == "Optimal") {
                                                j_array[j]['dataValues']['progress_percentage'] = 100;
                                                j_array[j]['dataValues']['lastscore'] = 'true';
                                                j_array[j]['dataValues']['lastexamMessage'] = 'passed';
                                                j_array[j]['dataValues']['lastExamStatus'] = "passed";
                                                j_array[j]['dataValues']['lastExamStatusbit'] = 3;
                                                j_array[j]['dataValues']['lastExamPercentage'] = '100';
                                                j_array[j]['dataValues']['remaining_attempt'] = 0;
                                                j_array[j]['dataValues']['used_max_attempt'] = "false";
                                            }
                                            else {
                                                var progressPercentage = Math.round(ctexam.length / j_array[j]["attempts"] * 100);
                                                if (j_array[j]["attempts"] <= ctexam.length) {
                                                    j_array[j]['dataValues']['progress_percentage'] = 100;
                                                    j_array[j]['dataValues']['lastscore'] = 'true';
                                                    j_array[j]['dataValues']['lastexamMessage'] = 'failed';
                                                    j_array[j]['dataValues']['lastExamStatus'] = "failed";
                                                    j_array[j]['dataValues']['lastExamStatusbit'] = 2;
                                                    j_array[j]['dataValues']['lastExamPercentage'] = 100;
                                                    j_array[j]['dataValues']['remaining_attempt'] = 0;
                                                    j_array[j]['dataValues']['used_max_attempt'] = "true";
                                                }
                                                else {
                                                    j_array[j]['dataValues']['progress_percentage'] = progressPercentage;
                                                    j_array[j]['dataValues']['lastscore'] = 'true';
                                                    j_array[j]['dataValues']['lastexamMessage'] = 'failed';
                                                    j_array[j]['dataValues']['lastExamStatus'] = "failed";
                                                    j_array[j]['dataValues']['lastExamStatusbit'] = 2;
                                                    j_array[j]['dataValues']['lastExamPercentage'] = progressPercentage;
                                                    j_array[j]['dataValues']['remaining_attempt'] = remaining;
                                                    j_array[j]['dataValues']['used_max_attempt'] = "false";
                                                }
                                            }
                                        }
                                        else {
                                            j_array[j]['dataValues']['progress_percentage'] = 0;
                                            j_array[j]['dataValues']['lastscore'] = 'false';
                                            j_array[j]['dataValues']['lastexamMessage'] = 'You have not attempt the test yet';
                                            j_array[j]['dataValues']['lastExamStatus'] = "pending";
                                            j_array[j]['dataValues']['lastExamStatusbit'] = 5;
                                            j_array[j]['dataValues']['lastExamPercentage'] = 'false';
                                            j_array[j]['dataValues']['remaining_attempt'] = j_array[j]["attempts"];
                                            j_array[j]['dataValues']['used_max_attempt'] = "false";
                                        }
                                    }).catch(err => {
                                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                                    });
                                }
                            }
                            res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Data fetched successfully.", data: fetchedData });
                        })).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Oops! Trainee not found please check enrollment id" });
                    }
                }));
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getClinical_AssignedTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield assign_trainee_to_trainer_model_1.default.findAll({
                    include: [{
                            model: trainee_model_1.default,
                            required: false,
                            where: {
                                IsDeleted: 0,
                            },
                            attributes: ['id', 'enrollmentId', 'first_name', 'middle_name', 'last_name', 'email', 'contact', 'address', 'city', 'trainer_id']
                        }],
                    where: {
                        IsDeleted: 0,
                        trainer_id: req.body.trainer_id
                    }
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: 'Get Assign Trainee', data: result });
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    storeClinicalData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var traineeData = req.body.trainee_data;
                var praseData = JSON.parse(traineeData);
                var trainee_enrollment = praseData["trainee_enrollmentId"];
                var DateTimeCT = praseData["DateTimeCT"];
                yield clinicalperformance_model_1.default.findAll({
                    where: {
                        trainee_enrollmentId: trainee_enrollment,
                        DateTimeCT: DateTimeCT
                    }
                }).then((checkData) => __awaiter(this, void 0, void 0, function* () {
                    if (checkData.length == 0) {
                        yield trainee_model_1.default.findOne({
                            where: {
                                enrollmentId: trainee_enrollment,
                                IsDeleted: 0,
                                IsBlock: 0
                            }
                        }).then((traineeCheck) => __awaiter(this, void 0, void 0, function* () {
                            if (traineeCheck != null) {
                                yield clinicalperformance_model_1.default.create(Object.assign({}, praseData)).then(success => {
                                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Data Inserted Successfully..." });
                                }).catch(err => {
                                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                                });
                            }
                            else {
                                res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Oops! Trainee with this enrollment id does not exist" });
                            }
                        })).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Data Already exist." });
                    }
                })).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getClinicalCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var companyId = req.body.company_id;
                var enrollmentId = req.body.enrollmentId;
                // await Trainee.findOne({
                //     include:[{
                //         model:TraineeCurriculum,
                //     }]
                // })
                yield curriculum_model_1.default.findAll({
                    include: [{
                            model: curriculumbuilder_model_1.default,
                            include: [{
                                    model: curriculum_parent_category_test_model_1.default,
                                    where: {
                                        technology_type_id: 2,
                                        IsDeleted: 0
                                    }
                                }]
                        }],
                    where: {
                        company_id: companyId,
                        IsDeleted: 0
                    }
                }).then((curriculumList) => __awaiter(this, void 0, void 0, function* () {
                    var curriculum = curriculumList[0]["CurriculumBuilders"];
                    var finalResponse = Array();
                    for (let i = 0; i < curriculum.length; i++) {
                        var data = curriculum[i]["CurriculumParentCategoryTest"];
                        let dataObj = {
                            curriculum_id: curriculum[i]["curriculum_id"],
                            test_id: curriculum[i]["curriculum_parent_category_test_id"],
                            attempts: curriculum[i]["attempts"],
                            test_name: data["title"],
                            AllottedBit: 1
                        };
                        finalResponse.push(dataObj);
                    }
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1,
                        message: "Successfully data fetched", data: finalResponse });
                })).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getCTgraphicalReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // var 
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getClinicalTestReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield clinicalperformance_model_1.default.findAll({
                    include: [{
                            model: trainer_model_1.default,
                            attributes: ['name', 'email']
                        }],
                    where: {
                        IsDeleted: 0,
                        trainee_enrollmentId: req.body.enrollmentId,
                        ModuleCT: req.body.ModuleCT
                    },
                    order: [['id', 'DESC'],],
                }).then((ClinicalPerformanceData) => __awaiter(this, void 0, void 0, function* () {
                    //console.log("ClinicalPerformanceData.length->", ClinicalPerformanceData.length);
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
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
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
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
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
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
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
                                LS: FaultsCTArray[1],
                                RS: FaultsCTArray[2],
                            };
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
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
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
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
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                data: ClinicalPerformanceData,
                                FaultsCTData: FaultsCTData
                            });
                        }
                        else {
                            res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Does not generate Report of " + ClinicalPerformanceData['ModuleCT'] });
                        }
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Does not generate Report of " + req.body.ModuleCT });
                    }
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getClinicalTestConsolidatedReport(req, res) {
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
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
}
exports.default = new ClinicalController();
