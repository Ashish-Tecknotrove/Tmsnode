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
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const language_model_1 = __importDefault(require("../../model/language/language.model"));
const moment_1 = __importDefault(require("moment"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
const subscription_model_1 = __importDefault(require("../../model/root/subscription.model"));
//! Last Upated Ashish Rhatwal 9 feb 4:43 PM
class CurriculumController {
    create_curriculum_parent_category(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield curriculum_parent_category_model_1.default.findOne({
                    where: {
                        title: req.body.title,
                        IsDeleted: 0,
                    },
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result == null) {
                        req.body.createdAt = response_strings_1.default.currentTime;
                        req.body.updated_by = "";
                        yield curriculum_parent_category_model_1.default.create(Object.assign({}, req.body))
                            .then(function (data) {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Category added successfully.",
                                data: data,
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
                            .json({ response_code: 0, message: "Oops! Name of category already exists, please use another name" });
                    }
                }))
                    .catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    create_curriculum_parent_category_test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.createdAt = response_strings_1.default.currentTime;
                req.body.updated_by = "";
                yield curriculum_parent_category_test_model_1.default.findOne({
                    where: { title: req.body.title },
                })
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data == null) {
                        yield curriculum_parent_category_test_model_1.default.create(Object.assign({}, req.body))
                            .then(function (data) {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Test added successfully.",
                                data: data,
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
                            .status(response_codes_1.default.CREATED)
                            .json({ response_code: 0, message: "Oops! Name of test already exists, please use another name" });
                    }
                }))
                    .catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    getTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getTechnology = yield technology_model_1.default.findAll();
                if (getTechnology != null) {
                    return res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "data have been fetched successfully",
                        data: getTechnology,
                    });
                }
                else {
                    return res
                        .status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: "No data were found", data: "" });
                }
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + e.message,
                    data: "",
                });
            }
        });
    }
    getCompanyCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield curriculum_model_1.default.findAll({
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    },
                    order: [["id", "DESC"]]
                })
                    .then((data) => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "data have been fetched successfully",
                        data: data,
                    });
                })
                    .catch((err) => {
                    console.log("err1->", err);
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
    getCurriculumParent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const technology_id = req.body.technology_id;
                const getCurriculum = yield curriculum_parent_category_model_1.default.findAll({
                    include: [
                        {
                            model: curriculum_parent_category_test_model_1.default,
                        },
                    ],
                    where: {
                        technology_type_id: {
                            [sequelize_1.Op.in]: [sequelize_2.default.literal(`${technology_id}`)],
                        },
                        IsDeleted: 0
                    },
                    order: [["id", "desc"]]
                    // logging: console.log
                });
                // console.log(getCurriculum);
                if (getCurriculum.length == 0) {
                    return res
                        .status(response_codes_1.default.SUCCESS)
                        .json({
                        response_code: 0,
                        message: "No data were found",
                        data: getCurriculum,
                    });
                }
                else {
                    return res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "data have been fetched successfully",
                        data: getCurriculum,
                    });
                }
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + e.message,
                    data: "",
                });
            }
        });
    }
    getCurriculumParentTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parent_id = req.body.parent_id;
                const getTest = yield curriculum_parent_category_test_model_1.default.findAll({
                    include: [
                        {
                            model: language_model_1.default,
                            attributes: {
                                exclude: [
                                    "id",
                                    "description",
                                    "created_by",
                                    "isDeleted",
                                    "createdAt",
                                    "updatedAt",
                                ],
                            },
                        },
                    ],
                    where: {
                        parent_id: parent_id,
                        IsDeleted: 0,
                    },
                    order: [["id", "desc"]]
                });
                if (getTest != null) {
                    return res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "data have been fetched successfully",
                        data: getTest,
                    });
                }
                else {
                    return res
                        .status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: "No data were found", data: "" });
                }
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + e.message,
                    data: "",
                });
            }
        });
    }
    deleteCurriculumParentCategoryTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const test_id = req.body.test_id;
                let check_company_is_valid = yield curriculum_parent_category_test_model_1.default.findOne({
                    where: {
                        id: test_id,
                        IsDeleted: 0,
                    },
                    // logging:console.log
                }).catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
                const updateData = {
                    IsDeleted: 1,
                    deletedAt: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
                    deleted_by: req.body.deleted_by
                };
                // console.log("check_company_is_valid->",check_company_is_valid);
                if (check_company_is_valid != null) {
                    yield curriculum_parent_category_test_model_1.default.update(updateData, {
                        where: { id: test_id },
                    })
                        .then(function (data) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, message: "Test deleted successfully." });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: "Oops! An invalid ID was entered, or this test was already deleted" });
                }
            }
            catch (e) {
                res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + e.message });
            }
        });
    }
    updateCurriculumParentCategoryTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const test_id = req.body.test_id;
                let check_company_is_valid = yield curriculum_parent_category_test_model_1.default.findOne({
                    where: {
                        id: test_id,
                        IsDeleted: 0,
                    },
                    // logging:console.log
                }).catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
                const updateData = {
                    prefix: req.body.prefix,
                    title: req.body.title,
                    description: req.body.description,
                    updated_by: req.body.updated_by,
                    updatedAt: response_strings_1.default.currentTime,
                };
                if (check_company_is_valid != null) {
                    yield curriculum_parent_category_test_model_1.default.update(updateData, {
                        where: { id: test_id },
                    })
                        .then(function (data) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, message: "Test updated successfully." });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: "No data were found" });
                }
            }
            catch (e) {
                res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + e.message });
            }
        });
    }
    buildCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Create Curriculum
                const curriculum = {
                    company_id: req.body.company_id,
                    name: req.body.name,
                    created_by: req.body.created_by,
                    updated_by: "",
                    createdAt: response_strings_1.default.currentTime,
                };
                //Check Curriculum Already Exist
                var check_curriculum_exist = yield curriculum_model_1.default.findOne({
                    where: {
                        name: req.body.name,
                        IsDeleted: 0,
                    },
                    // logging: console.log,
                });
                if (check_curriculum_exist == null) {
                    //Parse JSON String into JSON Object
                    var curriculumBody = req.body.curriculum;
                    var curriculumBodyData = JSON.parse(curriculumBody);
                    //Parse JSON String into JSON Object
                    //Step 1 Create Curriculum Data
                    yield curriculum_model_1.default.create(Object.assign({}, curriculum))
                        .then(function (data) {
                        //Get Curriculum Id
                        var curriculum_id = data["id"];
                        let trueFalse = 0;
                        //Add This id and Created Curriculum Builder with parent id
                        for (var i = 0; i < curriculumBodyData.length; i++) {
                            var curriculum_data = {
                                curriculum_id: curriculum_id,
                                curriculum_parent_category_id: curriculumBodyData[i]["cp_id"],
                                curriculum_parent_category_test_id: curriculumBodyData[i]["cptest_id"],
                                created_by: curriculumBodyData[i]["created_by"],
                                updated_by: curriculumBodyData[i]["updated_by"],
                                createdAt: response_strings_1.default.currentTime
                            };
                            curriculumbuilder_model_1.default.create(Object.assign({}, curriculum_data))
                                .then((result) => {
                                trueFalse = trueFalse + 1;
                                // console.log("trueFalse->",trueFalse)
                                if (trueFalse == curriculumBodyData.length) {
                                    res.status(response_codes_1.default.SUCCESS).json({
                                        response_code: 1,
                                        curriculum_id: data["id"],
                                        message: "Curriculum build successfully. Please add subscription to use the curriculum.",
                                    });
                                }
                            })
                                .catch((err) => {
                                console.log(err);
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err.message,
                                });
                            });
                        }
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.CREATED)
                        .json({ response_code: 0, message: response_strings_1.default.EXISTS });
                }
            }
            catch (err) {
                res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
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
    getTestMarksAttemptByTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body.company_id);
                yield curriculumbuilder_model_1.default.findAll({
                    include: [
                        {
                            model: curriculum_model_1.default,
                            where: {
                                IsDeleted: 0,
                                company_id: req.body.company_id,
                            },
                            attributes: ["id", "company_id", "name"],
                            required: true,
                        },
                        {
                            model: curriculum_parent_category_test_model_1.default,
                            include: [
                                {
                                    model: technology_model_1.default,
                                    where: {
                                        IsDeleted: 0,
                                    },
                                    attributes: ["id", "name"],
                                    required: false,
                                },
                            ],
                            where: {
                                IsDeleted: 0,
                                // technology_type_id: req.body.technology_type_id
                            },
                            attributes: ["id", "prefix", "title"],
                            required: true,
                        },
                    ],
                    where: {
                        IsDeleted: 0,
                        curriculum_id: req.body.curriculum_id,
                    },
                    attributes: [
                        "id",
                        "curriculum_id",
                        "curriculum_parent_category_id",
                        "curriculum_parent_category_test_id",
                        "passing_marks",
                        "total_marks",
                        "attempts",
                    ],
                })
                    .then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "Data fetched successfully.",
                        data: result,
                    });
                })
                    .catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message,
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                });
            }
        });
    }
    submitTestMarksAttemptByTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = req.body.data;
                let datalength = data.length;
                for (let i = 0; i < datalength; i++) {
                    let updateMarksAttempt = {
                        passing_marks: data[i]["passing_marks"],
                        total_marks: data[i]["total_marks"],
                        attempts: data[i]["attempts"],
                        updated_by: req.body.updated_by,
                        updatedAt: response_strings_1.default.currentTime,
                    };
                    yield curriculumbuilder_model_1.default.update(Object.assign({}, updateMarksAttempt), {
                        where: {
                            id: data[i]["id"],
                        },
                    })
                        .then((result) => {
                        if (datalength - 1 == i) {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Curriculum Attempt And Marks updated successfully...",
                            });
                        }
                    })
                        .catch((err) => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message,
                        });
                    });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                });
            }
        });
    }
}
exports.default = new CurriculumController();
