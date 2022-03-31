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
const moment_1 = __importDefault(require("moment"));
const company_model_1 = __importDefault(require("../../../../core/model/root/company.model"));
const masterpanel_model_1 = __importDefault(require("../../../../core/model/root/masterpanel.model"));
const compayuser_model_1 = __importDefault(require("../../../../core/model/root/compayuser.model"));
const subscription_model_1 = __importDefault(require("../../../../core/model/root/subscription.model"));
const curriculum_model_1 = __importDefault(require("../../../../core/model/root/curriculum.model"));
const countries_model_1 = __importDefault(require("../../../../core/model/resources/countries.model"));
const states_model_1 = __importDefault(require("../../../../core/model/resources/states.model"));
const cities_model_1 = __importDefault(require("../../../../core/model/resources/cities.model"));
const users_model_1 = __importDefault(require("../../../../core/model/root/users.model"));
const trainee_model_1 = __importDefault(require("../../../../core/model/root/trainee.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../../../core/model/root/trainee_curriculum.model"));
const subcompany_model_1 = __importDefault(require("../../../../core/model/root/subcompany.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../../../core/model/root/curriculumbuilder.model"));
const eLearningresult_model_1 = __importDefault(require("../../../../core/model/elearning/eLearningresult.model"));
const company_department_model_1 = __importDefault(require("../../../../core/model/root/company_department.model"));
const master_department_model_1 = __importDefault(require("../../../../core/model/root/master_department.model"));
const trainer_model_1 = __importDefault(require("../../../../core/model/root/trainer.model"));
class CompanyController {
    get_company_details_by_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield company_model_1.default.findOne({
                    include: [
                        {
                            model: compayuser_model_1.default,
                            attributes: ['id', 'name', 'designation', 'mobile_no', 'canlogin'],
                            where: {
                                IsDeleted: 0
                            },
                            required: false
                        },
                        {
                            model: subscription_model_1.default,
                            include: [{
                                    model: curriculum_model_1.default,
                                    attributes: ['id', 'name'],
                                    where: {
                                        IsDeleted: 0
                                    },
                                    required: false
                                }],
                            where: {
                                IsDeleted: 0,
                                company_id: req.body.company_id
                            },
                            required: false
                        },
                        {
                            model: masterpanel_model_1.default,
                            attributes: ['panel']
                        },
                        {
                            model: countries_model_1.default,
                            attributes: ['title', 'slug'],
                            required: false
                        },
                        {
                            model: states_model_1.default,
                            attributes: ['title', 'slug'],
                            required: false
                        },
                        {
                            model: cities_model_1.default,
                            attributes: ['title', 'slug'],
                            required: false
                        }
                    ],
                    //logging: console.log,
                    where: {
                        id: req.body.company_id,
                        IsDeleted: 0
                    }
                }).then((result) => {
                    if (result != null) {
                        let logo = new URL(req.protocol + '://' + req.get('host')) + "resources/company_logo/" + result['picture'];
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({
                            response_code: 1,
                            logo: logo,
                            message: response_strings_1.default.GET,
                            data: result,
                        });
                    }
                    else {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 0, message: "No data were found." });
                    }
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    add_company_login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Table Fields for Company Contac
                req.body.canlogin = 1;
                req.body.updated_by = "";
                req.body.createdAt = response_strings_1.default.currentTime;
                const checkemailExist = yield compayuser_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0
                    }
                });
                const checkemailExist_in_user_table = yield users_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0
                    }
                });
                if (checkemailExist.length == 0 && checkemailExist_in_user_table.length == 0) {
                    yield compayuser_model_1.default.create(Object.assign({}, req.body))
                        .then((userdata) => {
                        //Add login in User table
                        const userLoginData = {
                            company_id: req.body.company_id,
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 2,
                            language: 1,
                            createdAt: response_strings_1.default.currentTime,
                            created_by: req.body.created_by,
                            updated_by: "",
                        };
                        users_model_1.default.create(Object.assign({}, userLoginData))
                            .then((data) => {
                            const updateId = {
                                login_table_id: data["id"],
                            };
                            compayuser_model_1.default.update(Object.assign({}, updateId), { where: { id: userdata["id"] } }).catch((err) => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: "Oops! " + err.message });
                            });
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Added company user successfully, and login created"
                            });
                            response_codes_1.default;
                        })
                            .catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    })
                        .catch(function (err) {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Oops! Another user with this email already exists"
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    updated_company_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_id = req.body.user_id;
                let check_company_user_is_valid = yield compayuser_model_1.default.findOne({
                    where: {
                        id: user_id,
                        IsDeleted: 0,
                    }
                }).catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
                if (check_company_user_is_valid != null) {
                    req.body.updatedAt = response_strings_1.default.currentTime;
                    const user_login_id = check_company_user_is_valid['login_table_id'];
                    yield compayuser_model_1.default.update(Object.assign({}, req.body), { where: { id: user_id } })
                        .then(function (data) {
                        const user_table_update = {
                            name: req.body.name,
                            email: req.body.email,
                            mobile_no: req.body.mobile_no,
                            password: req.body.password,
                            designation: req.body.designation,
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime
                        };
                        users_model_1.default.update(user_table_update, { where: { id: user_login_id } }).then(function (data) {
                            res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 1, message: "Company user updated successfully." });
                        }).catch((err) => {
                            res
                                .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.BAD_REQUEST)
                        .json({
                        response_code: 0,
                        message: "Oops! An invalid company user ID was entered, or this user was already deleted",
                    });
                }
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    get_company_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company_id = req.body.company_id;
                const company_user_data = yield compayuser_model_1.default.findAll({
                    include: [
                        {
                            model: users_model_1.default,
                        }
                    ],
                    where: {
                        company_id: company_id,
                        canlogin: 1,
                        IsDeleted: 0,
                    },
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                });
                if (company_user_data) {
                    res
                        .status(response_codes_1.default.SUCCESS)
                        .json({
                        response_code: 1,
                        message: "data have been fetched successfully.",
                        data: company_user_data,
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "No data were found." });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    delete_company_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.user_id;
                const UserData = yield compayuser_model_1.default.findOne({
                    where: {
                        id: user_id,
                        IsDeleted: 0
                    }
                });
                if (UserData != null) {
                    //* This Array has been used to update two table check before any change
                    let updateData = {
                        IsDeleted: 1,
                        deleted_by: req.body.deleted_by,
                        deletedAt: response_strings_1.default.currentTime
                    };
                    //! Delete the User from Company Contacts table
                    yield compayuser_model_1.default.update(Object.assign({}, updateData), { where: { id: user_id } })
                        .then(function (data) {
                        //! Delete the User from user table
                        const login_table_id = UserData['login_table_id'];
                        users_model_1.default.update(Object.assign({}, updateData), { where: { id: login_table_id } }).then(function (data) {
                            res.status(response_codes_1.default.SUCCESS)
                                .json({
                                response_code: 1,
                                message: "Company user deleted successfully.",
                            });
                        }).catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    })
                        .catch(function (err) {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 0,
                        message: "Oops! An invalid company user ID was entered, or this user was already deleted"
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    get_company_card1_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TraineesData = yield trainee_model_1.default.findAll({
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0,
                        IsBlock: 0
                    }
                });
                let currentMonth = (0, moment_1.default)().format("YYYY-MM");
                let currentMonthText = (0, moment_1.default)().format("MMMM");
                let currentYearText = (0, moment_1.default)().format("YYYY");
                if (TraineesData.length != 0) {
                    let TraineeCurrentMonth = TraineesData.filter((element) => {
                        var elementMonth = (0, moment_1.default)(element['createdAt'], "YYYY-MM-DD").format("YYYY-MM");
                        if (currentMonth == elementMonth) {
                            return element;
                        }
                    });
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.GET,
                        currentYearText: currentYearText,
                        currentMonthText: currentMonthText,
                        currentMonthTraineesCount: TraineeCurrentMonth.length,
                        allTraineesCount: TraineesData.length
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 0,
                        message: "Oops! Trainees not register yet.",
                        currentYearText: currentYearText,
                        currentMonthText: currentMonthText,
                        currentMonthTraineesCount: 0,
                        allTraineesCount: 0
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
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
    get_company_card3_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let company_id = req.body.company_id;
                let panel_id = req.body.panel_id;
                let seriesData = Array();
                let xAxisData = Array();
                let TraineesData = yield trainee_model_1.default.findAll({
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    }
                });
                if (TraineesData.length != 0) {
                    if (panel_id == 3) {
                        const BranchData = yield subcompany_model_1.default.findAll({
                            where: {
                                company_id: company_id,
                                IsDeleted: 0
                            }
                        });
                        if (BranchData.length != 0) {
                            for (let i = 0; i < BranchData.length; i++) {
                                xAxisData[i] = BranchData[i]['name'];
                                let branchTrainees = TraineesData.filter((element) => {
                                    if (element['sub_company_id'] == BranchData[i]['id']) {
                                        return element;
                                    }
                                });
                                seriesData[i] = branchTrainees.length;
                            }
                        }
                        else {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 0,
                                message: response_strings_1.default.NOT
                            });
                        }
                    }
                    else if (panel_id == 2) {
                        const DepartmentData = yield company_department_model_1.default.findAll({
                            include: [
                                {
                                    model: master_department_model_1.default,
                                    where: {
                                        IsDeleted: 0,
                                        company_id: company_id
                                    }
                                }
                            ],
                            where: {
                                company_id: company_id,
                                IsDeleted: 0
                            }
                        });
                        if (DepartmentData.length != 0) {
                            for (let i = 0; i < DepartmentData.length; i++) {
                                xAxisData[i] = DepartmentData[i]['MasterDepartment']['name'];
                                let departmentTrainees = TraineesData.filter((element) => {
                                    if (element['department_id'] == DepartmentData[i]['id']) {
                                        return element;
                                    }
                                });
                                seriesData[i] = departmentTrainees.length;
                            }
                        }
                        else {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 0,
                                message: response_strings_1.default.NOT
                            });
                        }
                    }
                    else {
                        const TrainerData = yield trainer_model_1.default.findAll({
                            where: {
                                company_id: company_id,
                                IsDeleted: 0
                            }
                        });
                        if (TrainerData.length != 0) {
                            for (let i = 0; i < TrainerData.length; i++) {
                                xAxisData[i] = TrainerData[i]['name'];
                                let trainerTrainees = TraineesData.filter((element) => {
                                    if (element['trainer_id'] == TrainerData[i]['id']) {
                                        return element;
                                    }
                                });
                                seriesData[i] = trainerTrainees.length;
                            }
                        }
                        else {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 0,
                                message: response_strings_1.default.NOT
                            });
                        }
                    }
                    let options = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                            },
                        },
                        grid: {
                            right: '5%',
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true,
                                },
                                // prettier-ignore
                                data: xAxisData,
                                axisLabel: {
                                    interval: 0,
                                    //rotate: 30 //If the label names are too long you can manage this by rotating the label.
                                }
                            },
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: 'count',
                                min: 0,
                                max: TraineesData.length,
                                position: 'left',
                                axisLine: {
                                    show: true,
                                },
                            },
                        ],
                        series: [
                            {
                                type: 'bar',
                                barMaxWidth: 50,
                                // showBackground: true,
                                data: seriesData,
                            },
                        ],
                    };
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.GET,
                        echartOption: options
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({
                        response_code: 0,
                        message: response_strings_1.default.NOT
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
}
exports.default = new CompanyController();
