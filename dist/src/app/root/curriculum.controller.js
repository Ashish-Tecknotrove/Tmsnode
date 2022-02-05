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
class CurriculumController {
    create_curriculum_parent_category(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield curriculum_parent_category_model_1.default.create(Object.assign({}, req.body))
                    .then(function (data) {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.ADD,
                        data: data,
                    });
                })
                    .catch(function (err) {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: error });
            }
        });
    }
    create_curriculum_parent_category_test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield curriculum_parent_category_test_model_1.default.create(Object.assign({}, req.body))
                    .then(function (data) {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.ADD,
                        data: data,
                    });
                })
                    .catch(function (err) {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: error });
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
                        message: response_strings_1.default.GET,
                        data: getTechnology,
                    });
                }
                else {
                    return res
                        .status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: response_strings_1.default.NOT, data: "" });
                }
            }
            catch (e) {
                return res.status(response_codes_1.default.SUCCESS).json({
                    response_code: 1,
                    message: e,
                    data: "",
                });
            }
        });
    }
    getCompanyCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company_id = req.body.company_id;
                yield curriculum_model_1.default.findAll({
                    where: {
                        company_id: company_id,
                        IsDeleted: 0
                    },
                })
                    .then((data) => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 0,
                        message: response_strings_1.default.GET,
                        data: data,
                    });
                })
                    .catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err });
                });
            }
            catch (err) {
                res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 1, message: err });
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
                    // logging: console.log
                });
                if (getCurriculum != null) {
                    return res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.GET,
                        data: getCurriculum,
                    });
                }
                else {
                    return res
                        .status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: response_strings_1.default.NOT, data: "" });
                }
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: e,
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
                });
                if (getTest != null) {
                    return res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.GET,
                        data: getTest,
                    });
                }
                else {
                    return res
                        .status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: response_strings_1.default.NOT, data: "" });
                }
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 1,
                    message: e,
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
                        .json({ response_code: 0, message: err });
                });
                const updateData = {
                    IsDeleted: 1,
                    deletedAt: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
                };
                // console.log("check_company_is_valid->",check_company_is_valid);
                if (check_company_is_valid != null) {
                    yield curriculum_parent_category_test_model_1.default.update(updateData, {
                        where: { id: test_id },
                    })
                        .then(function (data) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, message: response_strings_1.default.DELETE });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: err });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: response_strings_1.default.NOT });
                }
            }
            catch (e) {
                res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 1, message: e });
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
                        .json({ response_code: 0, message: err });
                });
                const updateData = {
                    prefix: req.body.prefix,
                    title: req.body.title,
                };
                if (check_company_is_valid != null) {
                    yield curriculum_parent_category_test_model_1.default.update(updateData, {
                        where: { id: test_id },
                    })
                        .then(function (data) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, message: response_strings_1.default.UPDATED });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: err });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: response_strings_1.default.NOT });
                }
            }
            catch (e) {
                res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 1, message: e });
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
                    updated_by: req.body.updated_by,
                };
                //Check Curriculum Already Exist
                var check_curriculum_exist = yield curriculum_model_1.default.findOne({
                    where: {
                        name: req.body.name,
                        IsDeleted: 0,
                    },
                    logging: console.log,
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
                            };
                            curriculumbuilder_model_1.default.create(Object.assign({}, curriculum_data))
                                .then(function () {
                                trueFalse = 1;
                            })
                                .catch(function (err) {
                                console.log(err);
                            });
                        }
                        if (trueFalse == 1) {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                curriculum_id: data["id"],
                                message: response_strings_1.default.ADD,
                            });
                        }
                        else {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 1,
                                curriculum_id: data["id"],
                                message: response_strings_1.default.DATABASE_ERROR,
                            });
                        }
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: err });
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
                    .json({ response_code: 0, message: err });
            }
        });
    }
}
exports.default = new CurriculumController();
