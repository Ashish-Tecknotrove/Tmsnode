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
const express_1 = require("express");
const auth_1 = __importDefault(require("../../../../core/middleware/auth"));
const company_controller_1 = __importDefault(require("../../controller/root/company.controller"));
const curriculum_controller_1 = __importDefault(require("../../controller/root/curriculum.controller"));
const dashboard_controller_1 = __importDefault(require("../../controller/root/dashboard.controller"));
const simulator_controller_1 = __importDefault(require("../../controller/root/simulator.controller"));
const subscription_controller_1 = __importDefault(require("../../controller/root/subscription.controller"));
const company_validator_1 = __importDefault(require("../../validator/root/company.validator"));
const curriculum_validator_1 = __importDefault(require("../../validator/root/curriculum.validator"));
const simulator_validator_1 = __importDefault(require("../../validator/root/simulator.validator"));
const subscription_validator_1 = __importDefault(require("../../validator/root/subscription.validator"));
const SuperAdminRoutes = (0, express_1.Router)();
var multer = require('multer');
var formData = multer();
//TODO VALIDATE DECLARATON 
const authentication = auth_1.default.verify_superAdmin_AuthenticateToken;
const acceptPostData = formData.none();
//TODO FILE UPLOAD CODE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './resources/company_logo');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
//?? DASHBOARD //
SuperAdminRoutes.get("/company_count", authentication, dashboard_controller_1.default.total_companies);
SuperAdminRoutes.get("/subscriptionCount", authentication, dashboard_controller_1.default.total_subscription);
//?? DASHBOARD -- END //
//TODO COMPANY ROUTES START
//?? Register New Company
SuperAdminRoutes.post('/registerCompany', authentication, upload.single('picture_pic'), //FormData With File
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}), company_validator_1.default.registerCommpanyParameter(), auth_1.default.handleValidatorError, company_controller_1.default.registerCompany);
// ?? Update Company
SuperAdminRoutes.post('/updateCompany', authentication, upload.single('picture_pic'), //FormData With File
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}), company_validator_1.default.updateCommpanyParameter(), auth_1.default.handleValidatorError, company_controller_1.default.updateCompany);
//?? Delete Company
SuperAdminRoutes.post('/deleteCompany', acceptPostData, authentication, company_validator_1.default.deleteCommpanyParameter(), auth_1.default.handleValidatorError, company_controller_1.default.deleteCompany);
//?? GET Company
SuperAdminRoutes.post('/getRegisterCompany', acceptPostData, authentication, company_controller_1.default.getCompany);
//?? Company Login
// ??Create New User
SuperAdminRoutes.post('/addCompanyUserLogin', acceptPostData, authentication, company_validator_1.default.companyPersonLogin(), auth_1.default.handleValidatorError, company_controller_1.default.add_company_login);
//?? Get Company New User
SuperAdminRoutes.post('/getCompanyUser', acceptPostData, authentication, company_validator_1.default.getcompanyPerson(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_user);
SuperAdminRoutes.post('/updatedCompanyUser', acceptPostData, authentication, company_validator_1.default.updatecompanyPersonLogin(), auth_1.default.handleValidatorError, company_controller_1.default.updated_company_user);
SuperAdminRoutes.post('/deleteCompanyUser', acceptPostData, authentication, company_validator_1.default.deletecompanyPerson(), auth_1.default.handleValidatorError, company_controller_1.default.delete_company_user);
SuperAdminRoutes.post('/getCompanyDetailsById', acceptPostData, authentication, company_validator_1.default.getcompanyPerson(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_details_by_id);
// -----------------Trainee Customize Form
SuperAdminRoutes.post('/getTraineeCustomForm', acceptPostData, authentication, company_validator_1.default.getTraineeCustomFormValidator(), auth_1.default.handleValidatorError, company_controller_1.default.get_trainee_customize_form);
//TODO COMPANY ROUTES END --------------------------------
//TODO Curriculum Controller 
SuperAdminRoutes.post('/create_curriculum_parent_category', acceptPostData, authentication, curriculum_validator_1.default.parentCategory(), auth_1.default.handleValidatorError, curriculum_controller_1.default.create_curriculum_parent_category);
SuperAdminRoutes.post('/get_curriculum_parent_category', formData.none(), authentication, curriculum_validator_1.default.technology(), auth_1.default.handleValidatorError, curriculum_controller_1.default.getCurriculumParent);
SuperAdminRoutes.post('/create_curriculum_parent_category_test', acceptPostData, authentication, curriculum_validator_1.default.parentCategoryTest(), auth_1.default.handleValidatorError, curriculum_controller_1.default.create_curriculum_parent_category_test);
SuperAdminRoutes.get('/technology', authentication, curriculum_controller_1.default.getTechnology);
SuperAdminRoutes.post('/get_curriculum_parent_category_test', formData.none(), authentication, curriculum_validator_1.default.getParentCategory(), auth_1.default.handleValidatorError, curriculum_controller_1.default.getCurriculumParentTest);
SuperAdminRoutes.post('/delete_curriculum_parent_category_test', formData.none(), authentication, curriculum_validator_1.default.deleteParentCategoryTest(), auth_1.default.handleValidatorError, curriculum_controller_1.default.deleteCurriculumParentCategoryTest);
SuperAdminRoutes.post('/update_curriculum_parent_category_test', formData.none(), authentication, curriculum_validator_1.default.updateParentCategoryTest(), auth_1.default.handleValidatorError, curriculum_controller_1.default.updateCurriculumParentCategoryTest);
SuperAdminRoutes.post('/getCompanyCurriculum', formData.none(), authentication, curriculum_validator_1.default.getComapnyCurriculamValidId(), auth_1.default.handleValidatorError, curriculum_controller_1.default.getCompanyCurriculum);
SuperAdminRoutes.post('/buildCurriculum', formData.none(), authentication, curriculum_validator_1.default.buildCurriculumParameter(), auth_1.default.handleValidatorError, curriculum_controller_1.default.buildCurriculum);
//TODO CURRICULUM CONTROLLER END ------------------
//TODO SIMULATOR ROUTES
SuperAdminRoutes.post('/addSimulator', formData.none(), authentication, simulator_validator_1.default.addSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.addSimulator);
SuperAdminRoutes.post('/editSimulator', formData.none(), authentication, simulator_validator_1.default.editSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.editSimulator);
SuperAdminRoutes.post('/deleteSimulator', formData.none(), authentication, simulator_validator_1.default.deleteSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.deleteSimulator);
SuperAdminRoutes.post('/getSimulator', formData.none(), authentication, simulator_validator_1.default.getSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.getSimulator);
SuperAdminRoutes.post('/get_company_simulator_list', formData.none(), authentication, simulator_validator_1.default.get_company_simulator_list(), auth_1.default.handleValidatorError, simulator_controller_1.default.get_company_simulator_list);
//TODO Simulatore Routes END HERE
//TODO Create Subscription
SuperAdminRoutes.post('/createSubscription', formData.none(), authentication, subscription_validator_1.default.newSubscriptionParameter(), auth_1.default.handleValidatorError, subscription_controller_1.default.createNewSubscription);
SuperAdminRoutes.post('/updateSubscription', formData.none(), authentication, subscription_validator_1.default.updateSubscriptionParameter(), auth_1.default.handleValidatorError, subscription_controller_1.default.updateSubscription);
SuperAdminRoutes.post('/deleteSubscription', formData.none(), authentication, subscription_validator_1.default.deleteSubscriptionParameter(), auth_1.default.handleValidatorError, subscription_controller_1.default.deleteSubscription);
SuperAdminRoutes.post('/getSubscription', formData.none(), authentication, subscription_controller_1.default.getSubscription);
SuperAdminRoutes.post('/getSubscriptionByCompany', formData.none(), authentication, subscription_validator_1.default.getSubscriptionByCompany(), auth_1.default.handleValidatorError, subscription_controller_1.default.getSubscriptionByCompany);
exports.default = SuperAdminRoutes;
