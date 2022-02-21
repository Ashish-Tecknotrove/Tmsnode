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
const uuid_1 = require("uuid");
const language_model_1 = __importDefault(require("../../model/language/language.model"));
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const app_label_1 = __importDefault(require("../../model/language/app.label"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
const app_label_value_1 = __importDefault(require("../../model/language/app.label.value"));
class LanguageController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            try {
                const record = yield language_model_1.default.create(Object.assign({}, req.body));
                return res.json({ msg: "Successfully Created Language" });
            }
            catch (e) {
                return res.json({ msg: e.message });
            }
        });
    }
    //* App Label
    createAppLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield app_label_1.default.findAll({
                    where: {
                        name: req.body.name,
                        IsDeleted: 0
                    }
                }).then((result_) => __awaiter(this, void 0, void 0, function* () {
                    if (result_.length == 0) {
                        req.body.updated_by = "";
                        yield app_label_1.default.create(Object.assign({}, req.body))
                            .then((result) => {
                            return res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 1, message: response_strings_1.default.ADD, data: result });
                        }).catch((err_) => {
                            return res
                                .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                    }
                    else {
                        return res
                            .status(response_codes_1.default.CREATED)
                            .json({ response_code: 0, message: response_strings_1.default.EXISTS });
                    }
                })).catch((err) => {
                    return res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            }
        });
    }
    getAppLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let whereObj = {};
                if (req.body.appLabelId) {
                    whereObj = {
                        id: req.body.appLabelId,
                        IsDeleted: 0
                    };
                }
                else {
                    whereObj = {
                        IsDeleted: 0
                    };
                }
                yield app_label_1.default.findAll({
                    // include: [{
                    //     model: ApplabelValue,
                    //     where: {
                    //         IsDeleted: 0
                    //     },
                    //     required: false
                    // }],
                    where: whereObj
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    return res.status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 1, message: response_strings_1.default.GET, data: result });
                })).catch((err) => {
                    return res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            }
        });
    }
    updateAppLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield app_label_1.default.findAll({
                    where: {
                        id: req.body.appLabelId,
                        IsDeleted: 0
                    }
                }).then((result_) => __awaiter(this, void 0, void 0, function* () {
                    if (result_.length != 0) {
                        let updateObj = {
                            name: req.body.name,
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime
                        };
                        yield app_label_1.default.update(updateObj, {
                            where: {
                                id: req.body.appLabelId
                            }
                        })
                            .then((result) => {
                            return res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 0, message: response_strings_1.default.UPDATED });
                        }).catch((err_) => {
                            return res
                                .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                    }
                    else {
                        return res
                            .status(response_codes_1.default.BAD_REQUEST)
                            .json({ response_code: 0, message: response_strings_1.default.NOT });
                    }
                })).catch((err) => {
                    return res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            }
        });
    }
    deleteAppLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield app_label_1.default.findAll({
                    where: {
                        id: req.body.appLabelId,
                        IsDeleted: 0
                    }
                }).then((result_) => __awaiter(this, void 0, void 0, function* () {
                    if (result_.length != 0) {
                        let updateObj = {
                            IsDeleted: 1,
                            deleted_by: req.body.deleted_by,
                            deletedAt: response_strings_1.default.currentTime
                        };
                        yield app_label_1.default.update(updateObj, {
                            where: {
                                id: req.body.appLabelId
                            }
                        })
                            .then((result) => {
                            return res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 0, message: response_strings_1.default.DELETE, data: result });
                        }).catch((err_) => {
                            return res
                                .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                    }
                    else {
                        return res
                            .status(response_codes_1.default.BAD_REQUEST)
                            .json({ response_code: 0, message: response_strings_1.default.NOT });
                    }
                })).catch((err) => {
                    return res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            }
        });
    }
    //* End App Label
    //* App Labels Value
    createAppLabelValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield app_label_value_1.default.findAll({
                    where: {
                        name: req.body.name,
                        f_languageid: req.body.f_languageid,
                        f_labelid: req.body.f_labelid,
                        IsDeleted: 0
                    }
                }).then((result_) => __awaiter(this, void 0, void 0, function* () {
                    if (result_.length == 0) {
                        req.body.updated_by = "";
                        yield app_label_value_1.default.create(Object.assign({}, req.body))
                            .then((result) => {
                            return res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 0, message: response_strings_1.default.ADD, data: result });
                        }).catch((err_) => {
                            return res
                                .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                    }
                    else {
                        return res
                            .status(response_codes_1.default.CREATED)
                            .json({ response_code: 0, message: response_strings_1.default.EXISTS });
                    }
                })).catch((err) => {
                    return res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            }
        });
    }
    getAppLabelValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield app_label_value_1.default.findAll({
                    include: [{
                            model: app_label_1.default,
                            attributes: ['id', 'name'],
                            where: {
                                IsDeleted: 0
                            },
                            required: false
                        }],
                    where: {
                        // f_labelid: req.body.f_labelid,
                        IsDeleted: 0
                    },
                    // logging:console.log
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    return res.status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: response_strings_1.default.GET, data: result });
                })).catch((err) => {
                    return res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            }
        });
    }
    updateAppLabelValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield app_label_value_1.default.findAll({
                    where: {
                        id: req.body.applabelvalueid,
                        IsDeleted: 0
                    }
                }).then((result_) => __awaiter(this, void 0, void 0, function* () {
                    if (result_.length != 0) {
                        let updateObj = {
                            name: req.body.name,
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime
                        };
                        yield app_label_value_1.default.update(updateObj, {
                            where: {
                                id: req.body.applabelvalueid
                            }
                        })
                            .then((result) => {
                            return res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 0, message: response_strings_1.default.UPDATED });
                        }).catch((err_) => {
                            return res
                                .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                    }
                    else {
                        return res
                            .status(response_codes_1.default.BAD_REQUEST)
                            .json({ response_code: 0, message: response_strings_1.default.NOT });
                    }
                })).catch((err) => {
                    return res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            }
        });
    }
    deleteAppLabelValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield app_label_value_1.default.findAll({
                    where: {
                        id: req.body.applabelvalueid,
                        IsDeleted: 0
                    }
                }).then((result_) => __awaiter(this, void 0, void 0, function* () {
                    if (result_.length != 0) {
                        let updateObj = {
                            IsDeleted: 1,
                            deleted_by: req.body.deleted_by,
                            deletedAt: response_strings_1.default.currentTime
                        };
                        yield app_label_value_1.default.update(updateObj, {
                            where: {
                                id: req.body.applabelvalueid
                            }
                        })
                            .then((result) => {
                            return res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 0, message: response_strings_1.default.DELETE });
                        }).catch((err_) => {
                            return res
                                .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                    }
                    else {
                        return res
                            .status(response_codes_1.default.BAD_REQUEST)
                            .json({ response_code: 0, message: response_strings_1.default.NOT });
                    }
                })).catch((err) => {
                    return res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            }
        });
    }
    //* End App Labels Value
    getMappingswithLanguage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let applabels = yield app_label_1.default.findAll({
                    include: [{
                            model: app_label_value_1.default,
                            attributes: ['name', 'f_languageid'],
                            where: {
                                IsDeleted: 0,
                                // f_languageid: Id
                            },
                            required: false
                        }],
                    where: {
                        IsDeleted: 0
                    },
                    attributes: ['name'],
                });
                yield language_model_1.default.findAll({
                    where: {
                        IsDeleted: 0
                    },
                    attributes: ['id', 'name']
                }).then((result) => {
                    const initialValue = {};
                    let labelData = result.reduce((obj, item) => {
                        console.log(item['id']);
                        let applabelsobj = applabels.filter(function (currentElement) {
                            if (currentElement.ApplabelValue) {
                                return currentElement.ApplabelValue.f_languageid == item['id'] || currentElement.ApplabelValue == null;
                            }
                            else {
                                return "";
                            }
                        });
                        const initialValue2 = {};
                        const applabelsObjStruc = applabelsobj.reduce((obj2, item2) => {
                            return Object.assign(Object.assign({}, obj2), { [item2['name']]: (item2.ApplabelValue) ? item2.ApplabelValue.name : "" });
                        }, initialValue2);
                        return Object.assign(Object.assign({}, obj), { [item['name']]: applabelsObjStruc });
                    }, initialValue);
                    return res.status(response_codes_1.default.SUCCESS)
                        .json({ response_code: 0, message: response_strings_1.default.GET, data: labelData });
                }).catch((err) => {
                    return res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            }
        });
    }
}
exports.default = new LanguageController();
