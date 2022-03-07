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
const sequelize_1 = __importDefault(require("sequelize"));
const eLearningmaster_model_1 = __importDefault(require("../../model/elearning/eLearningmaster.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../model/root/curriculum_parent_category_test.model"));
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
const trainee_curriculum_model_1 = __importDefault(require("../../model/root/trainee_curriculum.model"));
const trainee_model_1 = __importDefault(require("../../model/root/trainee.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../model/root/curriculumbuilder.model"));
const eLearningresult_model_1 = __importDefault(require("../../model/elearning/eLearningresult.model"));
const AdmZip = require("adm-zip");
class ElearningContent {
    elearningTestLink(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkExists = yield eLearningmaster_model_1.default.findOne({
                    where: {
                        test_id: req.body.test_id,
                        IsDeleted: 0
                    },
                });
                // console.log("checkExists->",checkExists);
                if (checkExists == null) {
                    // console.log("obj->",req.file);
                    //TODO ZIP FILE PATH
                    var filePath = "./resources/coursezip/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
                    //TODO ZIP FILE STORING PATH
                    var newPath = "./resources/course";
                    //! GET AND EXTRACT ZIP FILE
                    const zip = new AdmZip(filePath);
                    zip.extractAllTo(newPath); //TODO EXTRACT TO COURSE FOLDER
                    //! GET AND EXTRACT ZIP FILE
                    const zipFolderName = zip.getEntries();
                    //** Form Data */
                    let obj = {
                        test_id: req.body.test_id,
                        zipname: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename,
                        folderName: zipFolderName[0]['entryName'].slice(0, -1)
                    };
                    yield eLearningmaster_model_1.default.create(obj).then(function (data) {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.ADD, data: data });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.CREATED).json({ response_code: 0, message: response_strings_1.default.EXISTS });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    getElearnigTestLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield curriculum_parent_category_test_model_1.default.findAll({
                    include: [
                        {
                            model: eLearningmaster_model_1.default,
                            required: false,
                            where: {
                                IsDeleted: 0,
                            },
                            attributes: ['zipname', 'folderName', 'id']
                        }
                    ],
                    // attributes:[[sequelize.literal('path'), 'virtualColumn']],
                    where: {
                        IsDeleted: 0,
                        parent_id: req.body.parent_category_id,
                        technology_type_id: req.body.technology_type_id
                    },
                    // logging: console.log
                }).then((result) => {
                    if (result != null) {
                        const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/course/");
                        for (let i = 0; i < result.length; i++) {
                            if (result[i]['ElearningMaster'] != null) {
                                result[i]['dataValues']['ElearningMaster']['link'] =
                                    filePath + result[i]['ElearningMaster']['folderName'] + '/index_lms.html' +
                                        "?actor=%7B%22mbox%22%3A%22mailto%3ashish@gmail.com%22%2C%22" +
                                        "name%22%3A%22Super%22%2C%22objectType%22%3A%22Agent%22%7D&auth=Basic%20Og%3D%3D&test_id=" + result[i]['id'] +
                                        "&endpoint=http%3A%2F%2F" + req.get('host') + "%2FTMS" + "%2Ftrainee" + "%2Felearning" + "%2FstoreElearningResult";
                            }
                        }
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.GET, data: result });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: response_strings_1.default.NOT });
                    }
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    checkUploadElearningLinkFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.files);
                console.log(req.body);
                res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: req.files });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            }
        });
    }
    updateElearnigTestLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield eLearningmaster_model_1.default.findOne({
                    where: {
                        id: req.body.elearning_id,
                        IsDeleted: 0
                    }
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    yield eLearningmaster_model_1.default.update({
                        zipname: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename
                    }, {
                        where: {
                            id: req.body.elearning_id
                        }
                    }).then((updateResult) => {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.UPDATED, data: updateResult });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                    });
                })).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            }
        });
    }
    deleteElearningTestLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkExists = yield eLearningmaster_model_1.default.findOne({
                    where: {
                        id: req.body.elearning_id,
                        IsDeleted: 0
                    },
                });
                if (checkExists != null) {
                    let obj = {
                        IsDeleted: 1,
                        deleteAt: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
                    };
                    yield eLearningmaster_model_1.default.update(obj, {
                        where: { id: req.body.elearning_id },
                    }).then(function (data) {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.DELETE });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: response_strings_1.default.NOT });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            }
        });
    }
    getElearningCurriculumModuleReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let curriculum_id = req.body.curriculum_id;
                let trainer_id = req.body.trainer_id;
                let Trainees = yield trainee_model_1.default.findAll({
                    include: [{
                            required: true,
                            model: trainee_curriculum_model_1.default,
                            where: {
                                curriculum_id: curriculum_id,
                                IsDeleted: 0
                            },
                            attributes: ['id', 'trainee_id', 'trainee_user_id', 'curriculum_id']
                        }],
                    where: {
                        trainer_id: trainer_id,
                        IsDeleted: 0
                    },
                    attributes: ['id', 'company_id', 'sub_company_id', 'department_id', 'login_table_id', 'first_name', 'middle_name', 'last_name', 'email', 'trainer_id']
                });
                let CurriculumTest = yield curriculumbuilder_model_1.default.findAll({
                    include: [{
                            required: true,
                            model: curriculum_parent_category_test_model_1.default,
                            where: {
                                IsDeleted: 0
                            },
                            attributes: ['id', 'prefix', 'title', 'parent_id']
                        }],
                    where: {
                        curriculum_id: curriculum_id,
                        IsDeleted: 0,
                    },
                    attributes: ['id', 'curriculum_id', 'curriculum_parent_category_id', 'curriculum_parent_category_test_id', 'passing_marks', 'total_marks', 'attempts']
                });
                let xAxisData = Array();
                let FirstAttemptPass = Array();
                let FailedTrainees = Array();
                let AttemptAverage = Array();
                for (let c = 0; c < CurriculumTest.length; c++) {
                    xAxisData[c] = 'M' + (c + 1);
                    let FirstAttemptPassCount = 0;
                    let FailedTraineesCount = 0;
                    let SumOfFailedTrainees = 0;
                    let CurriculumTestId = CurriculumTest[c]['dataValues']['CurriculumParentCategoryTest']['id'];
                    for (let i = 0; i < Trainees.length; i++) {
                        // let traineeObj = Trainees[i]['dataValues'];
                        // traineeObj['Sr'] = i + 1;
                        let TraineeId = Trainees[i]['dataValues']['id'];
                        let elearningResultFirstAttemptPass = yield eLearningresult_model_1.default.findOne({
                            where: {
                                IsDeleted: 0,
                                trainee_id: TraineeId,
                                curriculum_test_id: CurriculumTestId,
                                status: "passed",
                                attempt_no: 1
                            }
                        });
                        if (elearningResultFirstAttemptPass != null) {
                            FirstAttemptPassCount += 1;
                        }
                        let elearningResultFailedTrainees = yield eLearningresult_model_1.default.findOne({
                            attributes: [[sequelize_1.default.fn('max', sequelize_1.default.col('id')), 'id']],
                            where: {
                                IsDeleted: 0,
                                trainee_id: TraineeId,
                                curriculum_test_id: CurriculumTestId,
                                status: "failed"
                            }
                        });
                        if (elearningResultFailedTrainees['dataValues']['id'] != null) {
                            FailedTraineesCount += 1;
                        }
                        let elearningResultAllFailedTrainees = yield eLearningresult_model_1.default.findAll({
                            where: {
                                IsDeleted: 0,
                                trainee_id: TraineeId,
                                curriculum_test_id: CurriculumTestId,
                                status: "failed"
                            }
                        });
                        if (elearningResultAllFailedTrainees.length != 0) {
                            for (let item in elearningResultAllFailedTrainees) {
                                SumOfFailedTrainees += 1;
                            }
                        }
                        // console.log("SumOfFailedTrainees->", SumOfFailedTrainees);
                        // console.log("elearningResult->", elearningResultAllFailedTrainees);
                    }
                    let NumberOfTrainees = yield eLearningresult_model_1.default.count({
                        where: {
                            IsDeleted: 0,
                            curriculum_test_id: CurriculumTestId,
                            status: "failed",
                        },
                        group: ['trainee_id']
                    });
                    // console.log("NumberOfTrainees->", NumberOfTrainees)
                    let Avg = 0;
                    if (NumberOfTrainees.length != 0) {
                        Avg = SumOfFailedTrainees / NumberOfTrainees.length;
                    }
                    FirstAttemptPass.push(FirstAttemptPassCount);
                    FailedTrainees.push(FailedTraineesCount);
                    AttemptAverage.push(Avg);
                    CurriculumTest[c]['dataValues']['Trainees'] = Trainees;
                }
                let echartOptions = {
                    color: ['#5470C6', '#91CC75', '#ee6666'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        // formatter: '{b0}: {c0}<br />{b1}: {c1}'
                    },
                    grid: {
                        right: '20%'
                    },
                    toolbox: {
                        feature: {
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    legend: {
                        data: ['FirstAttemptPass', 'FailedTrainees', 'AttemptAverage']
                    },
                    xAxis: [
                        {
                            // type: 'Curriculum Module Test',
                            axisTick: {
                                alignWithLabel: true
                            },
                            // prettier-ignore
                            data: xAxisData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: 'count',
                            min: 0,
                            max: Trainees.length,
                            position: 'left',
                            axisLine: {
                                show: true
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'FirstAttemptPass',
                            type: 'bar',
                            data: FirstAttemptPass
                        },
                        {
                            name: 'FailedTrainees',
                            type: 'bar',
                            data: FailedTrainees
                        },
                        {
                            name: 'AttemptAverage',
                            type: 'bar',
                            data: AttemptAverage
                        }
                    ]
                };
                res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, data: echartOptions });
                // res.status(responseCodes.SUCCESS).json({response_code: 0, data: CurriculumTest});
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            }
        });
    }
}
exports.default = new ElearningContent();
