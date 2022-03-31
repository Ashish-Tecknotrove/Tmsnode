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
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
const response_strings_1 = __importDefault(require("../../../../core/strings/response-strings"));
const sequelize = require("sequelize");
const trainee_model_1 = __importDefault(require("../../../../core/model/root/trainee.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../../../core/model/root/trainee_curriculum.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../../../core/model/root/curriculumbuilder.model"));
const eLearningresult_model_1 = __importDefault(require("../../../../core/model/elearning/eLearningresult.model"));
const subscription_model_1 = __importDefault(require("../../../../core/model/root/subscription.model"));
const curriculum_model_1 = __importDefault(require("../../../../core/model/root/curriculum.model"));
const sequelize_1 = require("sequelize");
const curriculum_parent_category_test_model_1 = __importDefault(require("../../../../core/model/root/curriculum_parent_category_test.model"));
const technology_model_1 = __importDefault(require("../../../../core/model/root/technology.model"));
class CompanyController {
    get_company_card2_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let where = {};
                if (req.body.trainer_id) {
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
                    //Get Unblock Trainees Filter
                    let UnBlockTrainees = TraineesData.filter((element) => {
                        if (element['IsBlock'] == "0") {
                            return element;
                        }
                    });
                    let YetToStart = 0;
                    let Completed = 0;
                    let InProgress = 0;
                    for (let i = 0; i < UnBlockTrainees.length; i++) {
                        let TraineeCurriculums = UnBlockTrainees[i]['dataValues']['TraineeCurriculums'];
                        let TotalCurriculum = TraineeCurriculums.length;
                        let CurriculumNotAttempt = 0;
                        let CurriculumAttempt = 0;
                        let CurriculumPass = 0;
                        for (let j = 0; j < TraineeCurriculums.length; j++) {
                            yield curriculumbuilder_model_1.default.findAll({
                                where: {
                                    curriculum_id: TraineeCurriculums[j]['dataValues']['curriculum_id'],
                                    IsDeleted: 0
                                }
                            }).then((CurriculumBuilderData) => __awaiter(this, void 0, void 0, function* () {
                                let TotalTest = CurriculumBuilderData.length;
                                let ElearningResultTestNotAttempt = 0;
                                let ElearningResultTestAttempt = 0;
                                let ElearningResultTestPassed = 0;
                                let ElearningResultTestFailed = 0;
                                for (let k = 0; k < CurriculumBuilderData.length; k++) {
                                    yield eLearningresult_model_1.default.findOne({
                                        attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']],
                                        where: {
                                            curriculum_test_id: CurriculumBuilderData[k]['dataValues']['curriculum_parent_category_test_id'],
                                            trainee_id: UnBlockTrainees[i]['dataValues']['id'],
                                            test_start: 1,
                                            IsDeleted: 0
                                        },
                                        // logging:console.log
                                    }).then((ElearningResultData) => {
                                        // if (ElearningResultData == null) {
                                        if (ElearningResultData['id'] == null) {
                                            ElearningResultTestNotAttempt += 1;
                                        }
                                        else {
                                            if (ElearningResultData['status'] == '3') {
                                                ElearningResultTestPassed += 1;
                                            }
                                            else if (ElearningResultData['status'] == '2') {
                                                ElearningResultTestFailed += 1;
                                            }
                                            ElearningResultTestAttempt += 1;
                                        }
                                        CurriculumBuilderData[k]['dataValues']['ElearningResult'] = ElearningResultData;
                                        TraineeCurriculums[j]['dataValues']['TotalTest'] = TotalTest;
                                        TraineeCurriculums[j]['dataValues']['CurriculumBuilder'] = CurriculumBuilderData;
                                    });
                                }
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
                            }));
                        }
                        UnBlockTrainees[i]['dataValues']['TotalCurriculum'] = TotalCurriculum;
                        if (CurriculumNotAttempt == TotalCurriculum) {
                            UnBlockTrainees[i]['dataValues']['AllCurriculumNotAttempt'] = true;
                            YetToStart += 1;
                        }
                        if (CurriculumPass == TotalCurriculum) {
                            UnBlockTrainees[i]['dataValues']['AllCurriculumsPassed'] = true;
                            Completed += 1;
                        }
                        // console.log("CurriculumAttempt->",CurriculumAttempt);
                        if (CurriculumAttempt == TotalCurriculum) {
                            UnBlockTrainees[i]['dataValues']['AllCurriculumAttempt'] = true;
                            InProgress += 1;
                        }
                    }
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
                        SuccessRatio: Math.round(SuccessRatio)
                        // TotalTraineesData: UnBlockTrainees,
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
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
    //!TODO GET CURRICULUM WITH SUBSCRIPTION CHECK
    //! This Function using in Company Panle to Load Curriculum With Technologies
    getCurriculum_with_subscription_check(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var currentDate = response_strings_1.default.currentDate;
                yield subscription_model_1.default.findAll({
                    include: {
                        model: curriculum_model_1.default,
                        required: true,
                        where: {
                            IsDeleted: 0,
                        },
                    },
                    attributes: ['id', 'curriculum_id', 'expiry_date'],
                    where: {
                        expiry_date: { [sequelize_1.Op.gte]: currentDate },
                        activation_date: { [sequelize_1.Op.lte]: currentDate },
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                    },
                })
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data.length != 0) {
                        for (var i = 0; i < data.length; i++) {
                            yield curriculumbuilder_model_1.default.findAll({
                                include: [{
                                        attributes: ['technology_type_id'],
                                        model: curriculum_parent_category_test_model_1.default,
                                        where: {
                                            IsDeleted: 0
                                        },
                                        include: [{
                                                attributes: ['name'],
                                                model: technology_model_1.default,
                                                where: {
                                                    IsDeleted: 0
                                                },
                                            }]
                                    }],
                                attributes: ['CurriculumParentCategoryTest.technology_type_id',
                                    'CurriculumParentCategoryTest->TechnologyCategory.name'],
                                where: {
                                    curriculum_id: data[i]['Curriculum']['id']
                                },
                                group: ['CurriculumParentCategoryTest.technology_type_id'],
                                // logging:console.log
                            }).then((techData) => {
                                //console.log(techData);
                                data[i]['dataValues']['technologies'] = techData;
                            }, err => {
                                res
                                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                    .json({ response_code: 0, message: "Oops! " + err.message });
                            });
                        }
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({
                            response_code: 1,
                            message: "Curriculum Fetched Successfully...",
                            data: data,
                        });
                    }
                    else {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({
                            response_code: 0,
                            message: "Oops! Curriculum not found or Please check your subscription is valid",
                        });
                    }
                }))
                    .catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) { }
        });
    }
}
exports.default = new CompanyController();
