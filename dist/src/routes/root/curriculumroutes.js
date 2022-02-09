"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const curriculum_validator_1 = __importDefault(require("../../validator/root/curriculum.validator"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const curriculum_controller_1 = __importDefault(require("../../app/root/curriculum.controller"));
const router = express.Router();
const multer = require("multer");
const formData = multer();
router.post('/create_curriculum_parent_category', formData.any(), auth_1.default.verifyAuthenticateToken, curriculum_validator_1.default.parentCategory(), auth_1.default.handleValidatorError, curriculum_controller_1.default.create_curriculum_parent_category);
router.post('/get_curriculum_parent_category', formData.none(), auth_1.default.verifyAuthenticateToken, curriculum_validator_1.default.technology(), auth_1.default.handleValidatorError, curriculum_controller_1.default.getCurriculumParent);
router.post('/create_curriculum_parent_category_test', formData.any(), auth_1.default.verifyAuthenticateToken, curriculum_validator_1.default.parentCategoryTest(), auth_1.default.handleValidatorError, curriculum_controller_1.default.create_curriculum_parent_category_test);
router.get('/technology', auth_1.default.verifyAuthenticateToken, curriculum_controller_1.default.getTechnology);
router.post('/get_curriculum_parent_category_test', formData.none(), auth_1.default.verifyAuthenticateToken, curriculum_validator_1.default.getParentCategory(), auth_1.default.handleValidatorError, curriculum_controller_1.default.getCurriculumParentTest);
router.post('/delete_curriculum_parent_category_test', formData.none(), auth_1.default.verifyAuthenticateToken, curriculum_validator_1.default.deleteParentCategoryTest(), auth_1.default.handleValidatorError, curriculum_controller_1.default.deleteCurriculumParentCategoryTest);
router.post('/update_curriculum_parent_category_test', formData.none(), auth_1.default.verifyAuthenticateToken, curriculum_validator_1.default.updateParentCategoryTest(), auth_1.default.handleValidatorError, curriculum_controller_1.default.updateCurriculumParentCategoryTest);
router.post('/getCompanyCurriculum', formData.none(), auth_1.default.verifyAuthenticateToken, curriculum_validator_1.default.getComapnyCurriculamValidId(), auth_1.default.handleValidatorError, curriculum_controller_1.default.getCompanyCurriculum);
router.post('/buildCurriculum', formData.none(), auth_1.default.verifyAuthenticateToken, curriculum_validator_1.default.buildCurriculumParameter(), auth_1.default.handleValidatorError, curriculum_controller_1.default.buildCurriculum);
exports.default = router;
