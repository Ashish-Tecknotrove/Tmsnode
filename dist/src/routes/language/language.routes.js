"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_label_value_controller_1 = __importDefault(require("../../app/languages/app.label.value.controller"));
const languages_controller_1 = __importDefault(require("../../app/languages/languages.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const languagevalidator_1 = __importDefault(require("../../validator/languages/languagevalidator"));
const LanguageRoutes = express_1.default.Router();
const multer = require("multer");
const formData = multer();
LanguageRoutes.post('/addLanguage', languagevalidator_1.default.checkCreateLanguage(), auth_1.default.handleValidatorError, languages_controller_1.default.create);
LanguageRoutes.get('/getValues', app_label_value_controller_1.default.findAll);
//* App Labels Module 
// Last Work #(Vipul) 
LanguageRoutes.post('/createAppLabel', formData.any(), auth_1.default.verifyAuthenticateToken, languagevalidator_1.default.chechCreateAppLabel(), auth_1.default.handleValidatorError, languages_controller_1.default.createAppLabel);
LanguageRoutes.post('/updateAppLabel', formData.any(), auth_1.default.verifyAuthenticateToken, languagevalidator_1.default.chechUpdateAppLabel(), auth_1.default.handleValidatorError, languages_controller_1.default.updateAppLabel);
LanguageRoutes.post('/deleteAppLabel', formData.any(), auth_1.default.verifyAuthenticateToken, languagevalidator_1.default.chechDeleteAppLabel(), auth_1.default.handleValidatorError, languages_controller_1.default.deleteAppLabel);
LanguageRoutes.post('/getAppLabel', formData.any(), auth_1.default.verifyAuthenticateToken, languages_controller_1.default.getAppLabel);
//* End App Labels Module
LanguageRoutes.post('/createAppLabelValue', formData.any(), auth_1.default.verifyAuthenticateToken, languagevalidator_1.default.checkCreateAppLabelValue(), auth_1.default.handleValidatorError, languages_controller_1.default.createAppLabelValue);
LanguageRoutes.post('/updateAppLabelValue', formData.any(), auth_1.default.verifyAuthenticateToken, languagevalidator_1.default.checkupdateAppLabelValue(), auth_1.default.handleValidatorError, languages_controller_1.default.updateAppLabelValue);
LanguageRoutes.post('/deleteAppLabelValue', formData.any(), auth_1.default.verifyAuthenticateToken, languagevalidator_1.default.chechDeleteAppLabelValue(), auth_1.default.handleValidatorError, languages_controller_1.default.deleteAppLabelValue);
LanguageRoutes.post('/getAppLabelValue', formData.any(), auth_1.default.verifyAuthenticateToken, 
// languagevalidator.chechGetAppLabelValue(),
// auth.handleValidatorError,
languages_controller_1.default.getAppLabelValue);
LanguageRoutes.post('/getMappingswithLanguage', formData.any(), auth_1.default.verifyAuthenticateToken, languages_controller_1.default.getMappingswithLanguage);
exports.default = LanguageRoutes;
