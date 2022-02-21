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
const curriculum_model_1 = __importDefault(require("../../model/root/curriculum.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../model/root/curriculumbuilder.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../model/root/curriculum_parent_category_test.model"));
const trainer_model_1 = __importDefault(require("../../model/root/trainer.model"));
const users_model_1 = __importDefault(require("../../model/root/users.model"));
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
class TrainerController {
    getTrainerCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainer_model_1.default.count({
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    },
                }).then(data => {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Trainers count fetched successfully...", count: data });
                }).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    registerTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainer_model_1.default.findOne({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0
                    },
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result == null) {
                        req.body.createdAt = response_strings_1.default.currentTime;
                        req.body.updated_by = '';
                        yield trainer_model_1.default.create(Object.assign({}, req.body)).then((data) => __awaiter(this, void 0, void 0, function* () {
                            const login = {
                                company_id: data.company_id,
                                email: data.email,
                                password: req.body.password,
                                user_type: response_strings_1.default.UserTypeTrainer,
                                language: 1,
                                created_by: req.body.created_by,
                                createdAt: response_strings_1.default.currentTime,
                                updated_by: ''
                            };
                            yield users_model_1.default.create(Object.assign({}, login)).then((UserData) => __awaiter(this, void 0, void 0, function* () {
                                const updateTrainer = {
                                    login_table_id: UserData.id
                                };
                                yield trainer_model_1.default.update(Object.assign({}, updateTrainer), {
                                    where: {
                                        id: data.id
                                    }
                                }).then((updateData) => {
                                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.ADD, trainer: data, UserData: UserData });
                                }).catch((err) => {
                                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                                });
                            }));
                        })).catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.CREATED).json({ response_code: 0, message: response_strings_1.default.EXISTS });
                    }
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: e.message,
                    data: "",
                });
            }
        });
    }
    updateTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainer_model_1.default.findOne({
                    where: {
                        id: req.body.trainer_id,
                        IsDeleted: 0
                    },
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result != null) {
                        let updateTrainer = {
                            name: req.body.name,
                            password: req.body.password,
                            trainer_expertise: req.body.trainer_expertise,
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime
                        };
                        yield trainer_model_1.default.update(Object.assign({}, updateTrainer), {
                            where: {
                                id: req.body.trainer_id
                            }
                        }).then((update) => __awaiter(this, void 0, void 0, function* () {
                            let updateUser = {
                                password: req.body.password,
                                updated_by: req.body.updated_by,
                                updatedAt: response_strings_1.default.currentTime
                            };
                            yield users_model_1.default.update(Object.assign({}, updateUser), {
                                where: {
                                    id: result.login_table_id
                                }
                            }).then((updateRes) => {
                                res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.UPDATED });
                            }).catch((err) => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                            });
                        })).catch((err) => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: response_strings_1.default.NOT });
                    }
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: err.message,
                        data: "",
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err.message,
                    data: "",
                });
            }
        });
    }
    getTrainers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainer_model_1.default.findAll({
                    include: [{
                            model: users_model_1.default,
                            where: {
                                IsDeleted: 0,
                                company_id: req.body.company_id
                            },
                            required: false
                        }],
                    where: {
                        IsDeleted: 0,
                        company_id: req.body.company_id
                    },
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.GET, data: result });
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: err.message,
                        data: "",
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err.message,
                    data: "",
                });
            }
        });
    }
    deleteTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainer_model_1.default.findOne({
                    where: {
                        IsDeleted: 0,
                        id: req.body.trainer_id
                    },
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result != null) {
                        let updateTrainer = {
                            IsDeleted: 1,
                            deleted_by: req.body.deleted_by,
                            deletedAt: response_strings_1.default.currentTime
                        };
                        yield trainer_model_1.default.update(Object.assign({}, updateTrainer), {
                            where: {
                                id: req.body.trainer_id
                            }
                        }).then((update) => __awaiter(this, void 0, void 0, function* () {
                            let updateUser = {
                                IsDeleted: 1,
                                deleted_by: req.body.deleted_by,
                                deletedAt: response_strings_1.default.currentTime
                            };
                            yield users_model_1.default.update(Object.assign({}, updateUser), {
                                where: {
                                    id: result.login_table_id
                                }
                            }).then((updateRes) => {
                                res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.DELETE });
                            }).catch((err) => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                            });
                        })).catch((err) => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: response_strings_1.default.NOT });
                    }
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: err.message,
                        data: "",
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err.message
                });
            }
        });
    }
    getTestMarksAttemptByTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body.company_id);
                yield curriculumbuilder_model_1.default.findAll({
                    include: [{
                            model: curriculum_model_1.default,
                            where: {
                                IsDeleted: 0,
                                company_id: req.body.company_id
                            },
                            attributes: ['id', 'company_id', 'name'],
                            required: true
                        }, {
                            //     model: CurriculumParentCategory,
                            //     where: {
                            //         IsDeleted: 0,
                            //         technology_type_id: req.body.technology_type_id
                            //     },
                            //     attributes: ['id', 'title', 'technology_type_id'],
                            //     required:false
                            // },{
                            model: curriculum_parent_category_test_model_1.default,
                            where: {
                                IsDeleted: 0,
                                technology_type_id: req.body.technology_type_id
                            },
                            attributes: ['id', 'prefix', 'title'],
                            required: true
                        }],
                    where: {
                        IsDeleted: 0,
                        curriculum_id: req.body.curriculum_id
                    },
                    attributes: ['id', 'curriculum_id', 'curriculum_parent_category_id', 'curriculum_parent_category_test_id', 'passing_marks', 'total_marks', 'attempts']
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 0,
                        data: result
                    });
                })
                    .catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: err.message
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err.message
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
                        passing_marks: data[i]['passing_marks'],
                        total_marks: data[i]['total_marks'],
                        attempts: data[i]['attempts'],
                        updated_by: req.body.updated_by,
                        updatedAt: response_strings_1.default.currentTime
                    };
                    yield curriculumbuilder_model_1.default.update(Object.assign({}, updateMarksAttempt), {
                        where: {
                            id: data[i]['id']
                        }
                    }).then((result) => {
                        if (datalength - 1 == i) {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 0,
                                message: response_strings_1.default.UPDATED
                            });
                        }
                    }).catch((err) => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: err.message
                        });
                    });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err.message
                });
            }
        });
    }
}
exports.default = new TrainerController();