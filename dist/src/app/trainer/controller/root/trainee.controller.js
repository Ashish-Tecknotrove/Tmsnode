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
const trainee_model_1 = __importDefault(require("../../../../core/model/root/trainee.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../../../core/model/root/trainee_curriculum.model"));
const users_model_1 = __importDefault(require("../../../../core/model/root/users.model"));
const curriculum_model_1 = __importDefault(require("../../../../core/model/root/curriculum.model"));
const assign_trainee_to_trainer_model_1 = __importDefault(require("../../../../core/model/root/assign_trainee_to_trainer.model"));
const language_model_1 = __importDefault(require("../../../../core/model/language/language.model"));
const technology_model_1 = __importDefault(require("../../../../core/model/root/technology.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../../../core/model/root/curriculumbuilder.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../../../core/model/root/curriculum_parent_category_test.model"));
const trainee_remark_model_1 = __importDefault(require("../../../../core/model/root/trainee_remark.model"));
class TraineeController {
    //!TODO FUNCTION USED TO GET ASSIGN TRAINEE TO TRAINER 
    getAssignTraineeOfTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield assign_trainee_to_trainer_model_1.default.findAll({
                    include: [{
                            model: trainee_model_1.default,
                            required: false,
                            where: {
                                IsDeleted: 0,
                            },
                            include: [{
                                    model: users_model_1.default,
                                    required: false,
                                    where: {
                                        IsDeleted: 0,
                                    },
                                    include: [{
                                            model: language_model_1.default,
                                            required: false,
                                            as: "TraineeLanguage",
                                            where: {
                                                IsDeleted: 0,
                                            },
                                            attributes: ['id', 'name']
                                        }, {
                                            model: language_model_1.default,
                                            required: false,
                                            as: "portalLanguage",
                                            where: {
                                                IsDeleted: 0,
                                            },
                                            attributes: ['id', 'name']
                                        }],
                                    attributes: ['id', 'company_id', 'email', 'aadhar_no', 'mobile_no', 'user_type', 'language', 'portal_language']
                                }, {
                                    model: trainee_curriculum_model_1.default,
                                    required: false,
                                    where: {
                                        IsDeleted: 0,
                                    },
                                    attributes: ['id', 'trainee_id', 'trainee_user_id', 'curriculum_id']
                                }],
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
    getAssignTraineeToTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_model_1.default.findAll({
                    include: [{
                            model: users_model_1.default,
                            required: false,
                            where: {
                                IsDeleted: 0,
                                IsBlock: 0
                            },
                            attributes: ['id', 'company_id', 'email', 'aadhar_no', 'mobile_no', 'user_type', 'language', 'portal_language']
                        }],
                    where: {
                        IsDeleted: 0,
                        trainer_id: req.body.trainer_id,
                        IsBlock: 0
                    },
                    attributes: ['id', 'enrollmentId', 'first_name', 'middle_name', 'last_name', 'email', 'contact', 'address', 'city', 'trainer_id']
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
    getAssignTraineeCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_curriculum_model_1.default.findAll({
                    include: [
                        {
                            model: curriculum_model_1.default,
                            where: {
                                IsDeleted: 0
                            },
                            attributes: ['id', 'company_id', 'name']
                        }
                    ],
                    where: {
                        IsDeleted: 0,
                        trainee_id: req.body.trainee_id
                    },
                    group: ['curriculum_id'],
                    attributes: ['id', 'trainee_id', 'trainee_user_id', 'curriculum_id', 'technology_id']
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: 'Get Trainee Assign Curriculum',
                        data: result
                    });
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
    //! THIS API USE IN TRAINEE DASHBOARD 
    getTechnologiesAllotedToTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, message: "Technologies Loaded", data: techData });
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
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    getTraineeRemarks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield curriculumbuilder_model_1.default.findAll({
                    include: [{
                            model: trainee_remark_model_1.default,
                            required: false,
                            where: {
                                IsDeleted: 0,
                                trainee_id: req.body.trainee_id
                            },
                            attributes: ['id', 'trainee_id', 'trainer_id', 'curriculum_id', 'curriculum_builder_id', 'remarks']
                        }, {
                            model: curriculum_parent_category_test_model_1.default,
                            where: {
                                IsDeleted: 0,
                                language_id: req.body.language_id,
                                technology_type_id: req.body.technology_id
                            },
                            attributes: ['id', 'prefix', 'title', 'parent_id', 'technology_type_id', 'language_id']
                        }],
                    where: {
                        IsDeleted: 0,
                        curriculum_id: req.body.curriculum_id
                    },
                    attributes: ['id', 'curriculum_id', 'vehicle_id', 'curriculum_parent_category_id', 'curriculum_parent_category_test_id', 'passing_marks', 'total_marks', 'attempts']
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "Get Trainee Remarks Fetching successfully.",
                        data: result
                    });
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            }
        });
    }
    addTraineeRemarks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_remark_model_1.default.findAll({
                    where: {
                        IsDeleted: 0,
                        trainee_id: req.body.trainee_id,
                        curriculum_builder_id: req.body.curriculum_builder_id
                    }
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result.length == 0) {
                        req.body.createdAt = response_strings_1.default.currentTime;
                        req.body.updated_by = '';
                        yield trainee_remark_model_1.default.create(Object.assign({}, req.body)).then((addResult) => {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "The Trainer Remark have been submit successfully.",
                                data: addResult,
                            });
                        }).catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        }).catch((err) => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! Remark Already Submitted."
                        });
                    }
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            }
        });
    }
    updateTraineeRemarks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updateBody = {
                    remarks: req.body.remarks,
                    updated_by: req.body.updated_by,
                    updatedAt: response_strings_1.default.currentTime
                };
                yield trainee_remark_model_1.default.update(Object.assign({}, updateBody), {
                    where: {
                        id: req.body.trainee_remark_id
                    }
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "The Trainer Remark have been update successfully."
                    });
                }).catch(function (err) {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            }
        });
    }
}
exports.default = new TraineeController();
