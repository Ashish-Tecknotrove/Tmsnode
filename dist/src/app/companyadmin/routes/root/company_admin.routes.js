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
const express = __importStar(require("express"));
const moment_1 = __importDefault(require("moment"));
const auth_1 = __importDefault(require("../../../../core/middleware/auth"));
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
const company_controller_1 = __importDefault(require("../../controller/root/company.controller"));
const company_department_controller_1 = __importDefault(require("../../controller/root/company_department.controller"));
const curriculum_controller_1 = __importDefault(require("../../controller/root/curriculum.controller"));
const master_department_controller_1 = __importDefault(require("../../controller/root/master_department.controller"));
const simulator_controller_1 = __importDefault(require("../../controller/root/simulator.controller"));
const subcompany_controller_1 = __importDefault(require("../../controller/root/subcompany.controller"));
const subscription_controller_1 = __importDefault(require("../../controller/root/subscription.controller"));
const trainee_controller_1 = __importDefault(require("../../controller/root/trainee.controller"));
const trainer_controller_1 = __importDefault(require("../../controller/root/trainer.controller"));
const company_validator_1 = __importDefault(require("../../validator/root/company.validator"));
const company_department_validator_1 = __importDefault(require("../../validator/root/company_department.validator"));
const curriculum_validator_1 = __importDefault(require("../../validator/root/curriculum.validator"));
const master_department_validator_1 = __importDefault(require("../../validator/root/master_department.validator"));
const simulator_validator_1 = __importDefault(require("../../validator/root/simulator.validator"));
const subcompany_validator_1 = __importDefault(require("../../validator/root/subcompany.validator"));
const subscription_validator_1 = __importDefault(require("../../validator/root/subscription.validator"));
const trainee_validator_1 = __importDefault(require("../../validator/root/trainee.validator"));
const trainer_validator_1 = __importDefault(require("../../validator/root/trainer.validator"));
const Router = express.Router();
var multer = require("multer");
var formData = multer();
//----- CompanyController ---------------------------------------------------
Router.post('/getCompanyDetailsById', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_validator_1.default.getcompanyPerson(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_details_by_id);
//Create New User
Router.post('/addCompanyUserLogin', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_validator_1.default.companyPersonLogin(), auth_1.default.handleValidatorError, company_controller_1.default.add_company_login);
// Get Company New User
Router.post('/getCompanyUser', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_validator_1.default.getcompanyPerson(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_user);
Router.post('/updatedCompanyUser', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_validator_1.default.updatecompanyPersonLogin(), auth_1.default.handleValidatorError, company_controller_1.default.updated_company_user);
Router.post('/deleteCompanyUser', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_validator_1.default.deletecompanyPerson(), auth_1.default.handleValidatorError, company_controller_1.default.delete_company_user);
//----------Dashboard Cards
Router.post('/get_company_card1_data', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_validator_1.default.get_company_card1_data(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_card1_data);
Router.post('/get_company_card2_data', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_validator_1.default.get_company_card1_data(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_card2_data);
Router.post('/get_company_card3_data', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_validator_1.default.get_company_card3_data(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_card3_data);
//-------- End CompanyController ---------------------------------------------------
//-------- Start CompanyDepartmentController ---------------------------------------------------
Router.post("/assignTrainersToDepartment_SubCompany", formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_department_validator_1.default.assignTrainersToDepartment_SubCompany(), auth_1.default.handleValidatorError, company_department_controller_1.default.assignTrainersToDepartment_SubCompany);
Router.post("/addDepartment", formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_department_validator_1.default.addDepartmentValidator(), auth_1.default.handleValidatorError, company_department_controller_1.default.addDepartment);
Router.post("/getDepartmentDetails", formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_department_validator_1.default.getDepartment(), auth_1.default.handleValidatorError, company_department_controller_1.default.departmentDetails);
Router.post("/getCompanyDepartment", formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_department_validator_1.default.getDepartment(), auth_1.default.handleValidatorError, company_department_controller_1.default.getCompanyDepartment);
//* Gold Panel
Router.post("/getCompanyDepartmentList", formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_department_validator_1.default.getDepartment(), auth_1.default.handleValidatorError, company_department_controller_1.default.getCompanyDepartmentList);
//* Gold Panel
Router.post("/blockUnblockCompanyDepartment", formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_department_validator_1.default.blockUnblockCompanyDepartment(), auth_1.default.handleValidatorError, company_department_controller_1.default.blockUnblockCompanyDepartment);
//* Gold Panel
Router.post("/editCompanyDepartment", formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_department_validator_1.default.editCompanyDepartment(), auth_1.default.handleValidatorError, company_department_controller_1.default.editCompanyDepartment);
//-------- End CompanyDepartmentController ---------------------------------------------------
//-------- Start CurriculumController ---------------------------------------------------
Router.get('/technology', auth_1.default.verify_companyAdmin_AuthenticateToken, curriculum_controller_1.default.getTechnology);
Router.post('/getCurriculumWithSubscriptionCheck', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, curriculum_validator_1.default.getCurriculumWithSubscriptionCheck(), auth_1.default.handleValidatorError, curriculum_controller_1.default.getCurriculum_with_subscription_check);
Router.post('/getTestMarksAttemptByTechnology', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, curriculum_validator_1.default.getTestMarksAttemptByTechnology(), auth_1.default.handleValidatorError, curriculum_controller_1.default.getTestMarksAttemptByTechnology);
Router.post('/submitTestMarksAttemptByTechnology', auth_1.default.verify_companyAdmin_AuthenticateToken, curriculum_validator_1.default.submitTestMarksAttemptByTechnology(), auth_1.default.handleValidatorError, curriculum_controller_1.default.submitTestMarksAttemptByTechnology);
//-------- End CurriculumController ---------------------------------------------------
//-------- Start MasterDepartmentController ---------------------------------------------------
Router.post('/addMasterDepartment', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, master_department_validator_1.default.addMasterDepartment(), auth_1.default.handleValidatorError, master_department_controller_1.default.addMasterDepartment);
Router.post('/updateMasterDepartment', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, master_department_validator_1.default.updateMasterDepartment(), auth_1.default.handleValidatorError, master_department_controller_1.default.updateMasterDepartment);
Router.post('/deleteMasterDepartment', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, master_department_validator_1.default.deleteMasterDepartment(), auth_1.default.handleValidatorError, master_department_controller_1.default.deleteMasterDepartment);
Router.post('/getMasterDepartment', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, master_department_validator_1.default.getMasterDepartment(), auth_1.default.handleValidatorError, master_department_controller_1.default.getMasterDepartment);
//-------- End MasterDepartmentController ---------------------------------------------------
//-------- Start SimulatorController ---------------------------------------------------
Router.post('/assignSimulator', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, simulator_validator_1.default.assignSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.assignSimulator);
Router.post('/unassignSimulator', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, simulator_validator_1.default.unassignSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.unassignSimulator);
Router.post('/getSimulator', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, simulator_validator_1.default.getSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.getSimulator);
Router.post('/get_company_simulator_list', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, simulator_validator_1.default.get_company_simulator_list(), auth_1.default.handleValidatorError, simulator_controller_1.default.get_company_simulator_list);
//-------- End SimulatorController ---------------------------------------------------
//-------- Start SubCompanyController ---------------------------------------------------
Router.post('/registerSubcompany', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, subcompany_validator_1.default.registerSubcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.registerSubCompany);
Router.post('/getSubcompany', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, subcompany_validator_1.default.getSubcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.getSubcompany);
Router.post('/getSubcompanyDetails', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, subcompany_validator_1.default.getSubcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.getSubcompany_detail_info);
Router.post('/assignDepartment', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, subcompany_validator_1.default.assignDepartmentValidator(), auth_1.default.handleValidatorError, subcompany_controller_1.default.assign_department_to_subcompany);
Router.post('/assignTrainerToSubCompany', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, subcompany_validator_1.default.assignTrainerValidator(), auth_1.default.handleValidatorError, subcompany_controller_1.default.assign_trainer_to_subcompany);
Router.post('/getSubCompanyList', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, subcompany_validator_1.default.getSubcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.getSubCompanyList);
Router.post('/block_unblock_subcompany', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, subcompany_validator_1.default.block_unblock_subcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.block_unblock_subcompany);
Router.post('/edit_subcompany', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, subcompany_validator_1.default.edit_subcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.edit_subcompany);
//-------- End SubCompanyController ---------------------------------------------------
//-------- Start SubscriptionController ---------------------------------------------------
Router.post('/getSubscriptionByCompany', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, subscription_validator_1.default.getSubscriptionByCompany(), auth_1.default.handleValidatorError, subscription_controller_1.default.getSubscriptionByCompany);
//-------- End SubscriptionController ---------------------------------------------------
//-------- Start TraineeController ---------------------------------------------------
const bulkstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./resources/csv");
    },
    filename: function (req, file, cb) {
        cb(null, (0, moment_1.default)().format('YYYYMMDDHHmmss') + '_' + file.originalname.toLowerCase().split(' ').join('_'));
    },
});
const bulkfileFilter = (req, file, cb) => {
    if (file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")) {
        cb(null, true);
    }
    else {
        cb(new Error("Oops! you can only upload excel file."), false);
    }
};
const bulkupload = multer({ storage: bulkstorage, fileFilter: bulkfileFilter }).single("file");
Router.post("/bulk", auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.bulkimportTraineevalidate(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    bulkupload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            //console.log("Multer error->", err);
            // A Multer error occurred when uploading.
            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
        }
        else if (err) {
            // An unknown error occurred when uploading.
            console.log("unknown error->", err);
            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
        }
        else {
            console.log("Everything went fine");
            next();
        }
    });
}), trainee_controller_1.default.bulkInsertTrainee);
Router.post("/getTraineeCount", formData.any(), trainee_controller_1.default.getTraineeCount);
Router.post("/registerTrainee", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.registerTrainee(), auth_1.default.handleValidatorError, trainee_controller_1.default.registerNewTrainee);
Router.post("/getTrainee", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_controller_1.default.getTrainee);
Router.post("/updateTrainee", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.updateTrainee(), auth_1.default.handleValidatorError, trainee_controller_1.default.updateTraineeDetails);
Router.post("/deleteTrainee", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.deleteTraineevalidate(), auth_1.default.handleValidatorError, trainee_controller_1.default.deleteTrainee);
Router.post("/block_unblock_Trainee", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.blockTrainee(), auth_1.default.handleValidatorError, trainee_controller_1.default.blockTrainee);
Router.post("/getUnassignedTrainee", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_controller_1.default.getUnassignedTrainee);
Router.post("/get_trainee_assigned_to_trainer_and_not_assigned", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.get_trainee_assigned_to_trainer_and_not_assigned(), auth_1.default.handleValidatorError, trainee_controller_1.default.get_trainee_assigned_to_trainer_and_not_assigned);
Router.post("/getAssignTraineeOfTrainer", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.getAssignTraineeOfTrainer(), auth_1.default.handleValidatorError, trainee_controller_1.default.getAssignTraineeOfTrainer);
Router.post("/getAssignTraineeToTrainer", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.getAssignTraineeOfTrainer(), auth_1.default.handleValidatorError, trainee_controller_1.default.getAssignTraineeToTrainer);
Router.post("/getAssignTraineeCurriculum", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.getAssignTraineeCurriculum(), auth_1.default.handleValidatorError, trainee_controller_1.default.getAssignTraineeCurriculum);
//TODO TRAINEE DASHBOARD
Router.post("/getTechnologiesAllotedToTrainee", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.getAssignTraineeCurriculumValidator(), auth_1.default.handleValidatorError, trainee_controller_1.default.getTechnologiesAllotedToTrainee);
Router.post("/registerTrainee_loop", formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainee_validator_1.default.registerTrainee(), auth_1.default.handleValidatorError, trainee_controller_1.default.registerNewTrainee_for_loop);
// -----------------Trainee Customize Form
Router.post('/getTraineeCustomForm', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, company_validator_1.default.getTraineeCustomFormValidator(), auth_1.default.handleValidatorError, trainee_controller_1.default.get_trainee_customize_form);
//-------- End TraineeController ---------------------------------------------------
//-------- Start TrainerController ---------------------------------------------------
Router.post('/getTrainerCount', formData.any(), trainer_controller_1.default.getTrainerCount);
Router.post('/registerTrainer', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.registerTrainer(), auth_1.default.handleValidatorError, trainer_controller_1.default.registerTrainer);
Router.post('/updateTrainer', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.updateTrainer(), auth_1.default.handleValidatorError, trainer_controller_1.default.updateTrainer);
Router.post('/getTrainers', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.getTrainersByCompany(), auth_1.default.handleValidatorError, trainer_controller_1.default.getTrainers);
Router.post('/getActiveTrainers', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.getTrainersByCompany(), auth_1.default.handleValidatorError, trainer_controller_1.default.getActiveTrainers);
Router.post('/block_unblock_trainer', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.block_unblock_trainer(), auth_1.default.handleValidatorError, trainer_controller_1.default.blockTrainer);
Router.post('/deleteTrainer', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.deleteTrainer(), auth_1.default.handleValidatorError, trainer_controller_1.default.deleteTrainer);
Router.post('/assign_trainee_to_trainer', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.assign_trainee_to_trainer(), auth_1.default.handleValidatorError, trainer_controller_1.default.assign_trainee_to_trainer);
Router.post('/unassignTrainer', formData.any(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.unassignTrainer(), auth_1.default.handleValidatorError, trainer_controller_1.default.unassignTrainer);
Router.post('/getTrainersForAssignDepartment', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.getTrainersForAssignDepartment(), auth_1.default.handleValidatorError, trainer_controller_1.default.getTrainersForAssignDepartment);
//* This for GOLD Panel
Router.post('/checkAssignTrainersTrainee', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.checkAssignTrainersTrainee(), auth_1.default.handleValidatorError, trainer_controller_1.default.checkAssignTrainersTrainee);
//* This for GOLD Panel
Router.post('/assign_department_to_trainer', formData.none(), auth_1.default.verify_companyAdmin_AuthenticateToken, trainer_validator_1.default.assign_department_to_trainer(), auth_1.default.handleValidatorError, trainer_controller_1.default.assign_department_to_trainer);
//-------- End TrainerController ---------------------------------------------------
exports.default = Router;
