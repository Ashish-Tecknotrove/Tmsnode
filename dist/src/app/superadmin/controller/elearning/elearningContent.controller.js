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
const eLearningmaster_model_1 = __importDefault(require("../../../../core/model/elearning/eLearningmaster.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../../../core/model/root/curriculum_parent_category_test.model"));
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
const response_strings_1 = __importDefault(require("../../../../core/strings/response-strings"));
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
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: response_strings_1.default.ADD,
                            data: data
                        });
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
                            attributes: ['zipname', 'folderName', 'id', 'thumbImg']
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
                        const thumbPath = new URL(req.protocol + '://' + req.get('host') + "/resources/coursethumb/");
                        for (let i = 0; i < result.length; i++) {
                            if (result[i]['ElearningMaster'] != null) {
                                result[i]['dataValues']['ElearningMaster']['link'] =
                                    filePath + result[i]['ElearningMaster']['folderName'] + '/index_lms.html' +
                                        "?actor=%7B%22mbox%22%3A%22mailto%3ashish@gmail.com%22%2C%22" +
                                        "name%22%3A%22Super%22%2C%22objectType%22%3A%22Agent%22%7D&auth=Basic%20Og%3D%3D&test_id=" + result[i]['id'] +
                                        "&endpoint=http%3A%2F%2F" + req.get('host') + "%2FTMS" + "%2Ftrainee" + "%2Felearning" + "%2FstoreElearningResult";
                                let imgThumb = result[i]['ElearningMaster']['thumbImg'];
                                result[i]['dataValues']['ElearningMaster']['thumbImg'] = imgThumb ? thumbPath + imgThumb : null;
                            }
                        }
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: response_strings_1.default.GET,
                            data: result
                        });
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
                    let testFileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                    //TODO ZIP FILE PATH
                    var filePath = "./resources/coursezip/" + testFileName;
                    //TODO ZIP FILE STORING PATH
                    var newPath = "./resources/course";
                    //! GET AND EXTRACT ZIP FILE
                    const zip = new AdmZip(filePath);
                    zip.extractAllTo(newPath); //TODO EXTRACT TO COURSE FOLDER
                    //! GET AND EXTRACT ZIP FILE
                    const zipFolderName = zip.getEntries();
                    yield eLearningmaster_model_1.default.update({
                        zipname: testFileName,
                        folderName: zipFolderName[0]['entryName'].slice(0, -1)
                    }, {
                        where: {
                            id: req.body.elearning_id
                        }
                    }).then((updateResult) => {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: response_strings_1.default.UPDATED,
                            data: updateResult
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                })).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
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
    elearningTestThumbnail(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkExists = yield eLearningmaster_model_1.default.findOne({
                    where: {
                        id: req.body.elearning_id,
                        IsDeleted: 0
                    },
                });
                if (checkExists != null) {
                    yield eLearningmaster_model_1.default.update({
                        thumbImg: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename
                    }, {
                        where: {
                            id: req.body.elearning_id
                        }
                    }).then(function (data) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: response_strings_1.default.UPDATED
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: response_strings_1.default.NOT });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
}
exports.default = new ElearningContent();
