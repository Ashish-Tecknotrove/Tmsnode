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
const eLearningmaster_model_1 = __importDefault(require("../../model/elearning/eLearningmaster.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../model/root/curriculum_parent_category_test.model"));
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
class ElearningContent {
    elearningTestLink(req, res) {
        var _a;
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
                    let obj = {
                        test_id: req.body.test_id,
                        zipname: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename
                    };
                    console.log("obj->", req.file);
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
                            attributes: ['zipname', 'id']
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
                        const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/test/");
                        for (let i = 0; i < result.length; i++) {
                            result[i]['dataValues']['filePath'] = filePath;
                        }
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.GET, data: result });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: response_strings_1.default.NOT });
                    }
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
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
}
exports.default = new ElearningContent();
