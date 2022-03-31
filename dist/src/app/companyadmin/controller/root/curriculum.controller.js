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
const subscription_model_1 = __importDefault(require("../../../../core/model/root/subscription.model"));
const curriculum_model_1 = __importDefault(require("../../../../core/model/root/curriculum.model"));
const technology_model_1 = __importDefault(require("../../../../core/model/root/technology.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../../../core/model/root/curriculumbuilder.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../../../core/model/root/curriculum_parent_category_test.model"));
const sequelize_1 = require("sequelize");
//! Last Upated Ashish Rhatwal 9 feb 4:43 PM
class CurriculumController {
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
