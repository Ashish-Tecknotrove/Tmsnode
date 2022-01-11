"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_label_value_controller_1 = __importDefault(require("../../app/languages/app.label.value.controller"));
const languages_controller_1 = __importDefault(require("../../app/languages/languages.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const languagevalidator_1 = __importDefault(require("../../validator/languages/languagevalidator"));
const LanguageRoutes = (0, express_1.Router)();
LanguageRoutes.post('/addLanguage', languagevalidator_1.default.checkCreateLanguage(), auth_1.default.handleValidatorError, languages_controller_1.default.create);
LanguageRoutes.get('/getValues', app_label_value_controller_1.default.findAll);
LanguageRoutes.post('/createLabelValue', languagevalidator_1.default.checkCreateAppLabel(), auth_1.default.handleValidatorError, app_label_value_controller_1.default.create);
exports.default = LanguageRoutes;
