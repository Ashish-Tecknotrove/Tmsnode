import * as express from "express";
import {Request, Response} from "express";
import {NextFunction} from "express";
import moment from "moment";
import auth from "../../../../core/middleware/auth";
import responseCodes from "../../../../core/strings/response-codes";

import companyController from "../../controller/root/company.controller";
import company_departmentController from "../../controller/root/company_department.controller";
import curriculumController from "../../controller/root/curriculum.controller";
import master_departmentController from "../../controller/root/master_department.controller";
import simulatorController from "../../controller/root/simulator.controller";
import subcompanyController from "../../controller/root/subcompany.controller";
import subscriptionController from "../../controller/root/subscription.controller";
import traineeController from "../../controller/root/trainee.controller";
import trainerController from "../../controller/root/trainer.controller";



import companyValidator from "../../validator/root/company.validator";
import company_departmentValidator from "../../validator/root/company_department.validator";
import CurriculumValidator from "../../validator/root/curriculum.validator";
import master_departmentValidator from "../../validator/root/master_department.validator";
import simulatorValidator from "../../validator/root/simulator.validator";
import subcompanyValidator from "../../validator/root/subcompany.validator";
import SubscriptionValidator from "../../validator/root/subscription.validator";
import traineeValidator from "../../validator/root/trainee.validator";
import trainerValidator from "../../validator/root/trainer.validator";

const Router = express.Router();
var multer = require("multer");
var formData = multer();

//----- CompanyController ---------------------------------------------------

Router.post('/getCompanyDetailsById',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    companyValidator.getcompanyPerson(),
    auth.handleValidatorError,
    companyController.get_company_details_by_id
);

//Create New User
Router.post('/addCompanyUserLogin',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    companyValidator.companyPersonLogin(),
    auth.handleValidatorError,
    companyController.add_company_login
);

// Get Company New User
Router.post('/getCompanyUser',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    companyValidator.getcompanyPerson(),
    auth.handleValidatorError,
    companyController.get_company_user
);

Router.post('/updatedCompanyUser',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    companyValidator.updatecompanyPersonLogin(),
    auth.handleValidatorError,
    companyController.updated_company_user
);

Router.post('/deleteCompanyUser',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    companyValidator.deletecompanyPerson(),
    auth.handleValidatorError,
    companyController.delete_company_user
);

//----------Dashboard Cards
Router.post('/get_company_card1_data',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    companyValidator.get_company_card1_data(),
    auth.handleValidatorError,
    companyController.get_company_card1_data
)

Router.post('/get_company_card2_data',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    companyValidator.get_company_card1_data(),
    auth.handleValidatorError,
    companyController.get_company_card2_data
)



Router.post('/get_company_card3_data',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    companyValidator.get_company_card3_data(),
    auth.handleValidatorError,
    companyController.get_company_card3_data
)

//-------- End CompanyController ---------------------------------------------------

//-------- Start CompanyDepartmentController ---------------------------------------------------
Router.post(
    "/assignTrainersToDepartment_SubCompany",
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    company_departmentValidator.assignTrainersToDepartment_SubCompany(),
    auth.handleValidatorError,
    company_departmentController.assignTrainersToDepartment_SubCompany
);

Router.post(
    "/addDepartment",
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    company_departmentValidator.addDepartmentValidator(),
    auth.handleValidatorError,
    company_departmentController.addDepartment
);

Router.post(
    "/getDepartmentDetails",
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    company_departmentValidator.getDepartment(),
    auth.handleValidatorError,
    company_departmentController.departmentDetails
);

Router.post(
    "/getCompanyDepartment",
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    company_departmentValidator.getDepartment(),
    auth.handleValidatorError,
    company_departmentController.getCompanyDepartment
);

//* Gold Panel
Router.post(
    "/getCompanyDepartmentList",
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    company_departmentValidator.getDepartment(),
    auth.handleValidatorError,
    company_departmentController.getCompanyDepartmentList
);

//* Gold Panel
Router.post(
    "/blockUnblockCompanyDepartment",
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    company_departmentValidator.blockUnblockCompanyDepartment(),
    auth.handleValidatorError,
    company_departmentController.blockUnblockCompanyDepartment
);

//* Gold Panel
Router.post(
    "/editCompanyDepartment",
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    company_departmentValidator.editCompanyDepartment(),
    auth.handleValidatorError,
    company_departmentController.editCompanyDepartment
);
//-------- End CompanyDepartmentController ---------------------------------------------------

//-------- Start CurriculumController ---------------------------------------------------
Router.get('/technology',
    auth.verify_companyAdmin_AuthenticateToken,
    curriculumController.getTechnology
)

Router.post('/getCurriculumWithSubscriptionCheck',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    CurriculumValidator.getCurriculumWithSubscriptionCheck(),
    auth.handleValidatorError,
    curriculumController.getCurriculum_with_subscription_check

)

Router.post('/getTestMarksAttemptByTechnology',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    CurriculumValidator.getTestMarksAttemptByTechnology(),
    auth.handleValidatorError,
    curriculumController.getTestMarksAttemptByTechnology
)

Router.post('/submitTestMarksAttemptByTechnology',
    auth.verify_companyAdmin_AuthenticateToken,
    CurriculumValidator.submitTestMarksAttemptByTechnology(),
    auth.handleValidatorError,
    curriculumController.submitTestMarksAttemptByTechnology
)
//-------- End CurriculumController ---------------------------------------------------


//-------- Start MasterDepartmentController ---------------------------------------------------

Router.post('/addMasterDepartment',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    master_departmentValidator.addMasterDepartment(),
    auth.handleValidatorError,
    master_departmentController.addMasterDepartment
);


Router.post('/updateMasterDepartment',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    master_departmentValidator.updateMasterDepartment(),
    auth.handleValidatorError,
    master_departmentController.updateMasterDepartment
);

Router.post('/deleteMasterDepartment',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    master_departmentValidator.deleteMasterDepartment(),
    auth.handleValidatorError,
    master_departmentController.deleteMasterDepartment
);

Router.post('/getMasterDepartment',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    master_departmentValidator.getMasterDepartment(),
    auth.handleValidatorError,
    master_departmentController.getMasterDepartment
);

//-------- End MasterDepartmentController ---------------------------------------------------


//-------- Start SimulatorController ---------------------------------------------------

Router.post('/assignSimulator',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    simulatorValidator.assignSimulator(),
    auth.handleValidatorError,
    simulatorController.assignSimulator
);

Router.post('/unassignSimulator',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    simulatorValidator.unassignSimulator(),
    auth.handleValidatorError,
    simulatorController.unassignSimulator
);


Router.post('/getSimulator',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    simulatorValidator.getSimulator(),
    auth.handleValidatorError,
    simulatorController.getSimulator
);

Router.post('/get_company_simulator_list',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    simulatorValidator.get_company_simulator_list(),
    auth.handleValidatorError,
    simulatorController.get_company_simulator_list
);
//-------- End SimulatorController ---------------------------------------------------


//-------- Start SubCompanyController ---------------------------------------------------

Router.post('/registerSubcompany',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    subcompanyValidator.registerSubcompany(),
    auth.handleValidatorError,
    subcompanyController.registerSubCompany
);

Router.post('/getSubcompany',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    subcompanyValidator.getSubcompany(),
    auth.handleValidatorError,
    subcompanyController.getSubcompany
);

Router.post('/getSubcompanyDetails',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    subcompanyValidator.getSubcompany(),
    auth.handleValidatorError,
    subcompanyController.getSubcompany_detail_info
);

Router.post('/assignDepartment',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    subcompanyValidator.assignDepartmentValidator(),
    auth.handleValidatorError,
    subcompanyController.assign_department_to_subcompany
);

Router.post('/assignTrainerToSubCompany',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    subcompanyValidator.assignTrainerValidator(),
    auth.handleValidatorError,
    subcompanyController.assign_trainer_to_subcompany
);

Router.post('/getSubCompanyList',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    subcompanyValidator.getSubcompany(),
    auth.handleValidatorError,
    subcompanyController.getSubCompanyList
);

Router.post('/block_unblock_subcompany',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    subcompanyValidator.block_unblock_subcompany(),
    auth.handleValidatorError,
    subcompanyController.block_unblock_subcompany
);

Router.post('/edit_subcompany',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    subcompanyValidator.edit_subcompany(),
    auth.handleValidatorError,
    subcompanyController.edit_subcompany
);

//-------- End SubCompanyController ---------------------------------------------------

//-------- Start SubscriptionController ---------------------------------------------------
Router.post('/getSubscriptionByCompany',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    SubscriptionValidator.getSubscriptionByCompany(),
    auth.handleValidatorError,
    subscriptionController.getSubscriptionByCompany
)
//-------- End SubscriptionController ---------------------------------------------------


//-------- Start TraineeController ---------------------------------------------------
const bulkstorage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, "./resources/csv");
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, moment().format('YYYYMMDDHHmmss') + '_' + file.originalname.toLowerCase().split(' ').join('_'));
    },
});


const bulkfileFilter = (req: any, file: any, cb: any) => {
    if (
        file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")
    ) {
        cb(null, true);
    } else {
        cb(new Error("Oops! you can only upload excel file."), false);
    }
};

const bulkupload = multer({ storage: bulkstorage,fileFilter:bulkfileFilter }).single("file");

Router.post(
    "/bulk",
    auth.verify_companyAdmin_AuthenticateToken,
    traineeValidator.bulkimportTraineevalidate(),
    async (req: Request, res: Response, next: NextFunction) => {
        bulkupload(req, res, function (err: any) {
            if (err instanceof multer.MulterError) {
                //console.log("Multer error->", err);
                // A Multer error occurred when uploading.
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            } else if (err) {
                // An unknown error occurred when uploading.
                console.log("unknown error->", err);
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            } else {
                console.log("Everything went fine");
                next();
            }
        })
    },
    traineeController.bulkInsertTrainee
);

Router.post(
    "/getTraineeCount",
    formData.any(),
    traineeController.getTraineeCount
);

Router.post(
    "/registerTrainee",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeValidator.registerTrainee(),
    auth.handleValidatorError,
    traineeController.registerNewTrainee
);

Router.post(
    "/getTrainee",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeController.getTrainee
);

Router.post(
    "/updateTrainee",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeValidator.updateTrainee(),
    auth.handleValidatorError,
    traineeController.updateTraineeDetails
);

Router.post(
    "/deleteTrainee",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeValidator.deleteTraineevalidate(),
    auth.handleValidatorError,
    traineeController.deleteTrainee
);

Router.post(
    "/block_unblock_Trainee",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeValidator.blockTrainee(),
    auth.handleValidatorError,
    traineeController.blockTrainee
);



Router.post(
    "/getUnassignedTrainee",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeController.getUnassignedTrainee
);

Router.post(
    "/getAssignTraineeOfTrainer",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeValidator.getAssignTraineeOfTrainer(),
    auth.handleValidatorError,
    traineeController.getAssignTraineeOfTrainer
);

Router.post(
    "/getAssignTraineeToTrainer",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeValidator.getAssignTraineeOfTrainer(),
    auth.handleValidatorError,
    traineeController.getAssignTraineeToTrainer
);

Router.post(
    "/getAssignTraineeCurriculum",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeValidator.getAssignTraineeCurriculum(),
    auth.handleValidatorError,
    traineeController.getAssignTraineeCurriculum
);

//TODO TRAINEE DASHBOARD
Router.post(
    "/getTechnologiesAllotedToTrainee",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeValidator.getAssignTraineeCurriculumValidator(),
    auth.handleValidatorError,
    traineeController.getTechnologiesAllotedToTrainee
);

Router.post(
    "/registerTrainee_loop",
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    traineeValidator.registerTrainee(),
    auth.handleValidatorError,
    traineeController.registerNewTrainee_for_loop
);

// -----------------Trainee Customize Form
Router.post('/getTraineeCustomForm',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    companyValidator.getTraineeCustomFormValidator(),
    auth.handleValidatorError,
    traineeController.get_trainee_customize_form
)

//-------- End TraineeController ---------------------------------------------------

//-------- Start TrainerController ---------------------------------------------------

Router.post('/getTrainerCount',
    formData.any(),
    trainerController.getTrainerCount
)

Router.post('/registerTrainer',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    trainerValidator.registerTrainer(),
    auth.handleValidatorError,
    trainerController.registerTrainer
);

Router.post('/updateTrainer',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    trainerValidator.updateTrainer(),
    auth.handleValidatorError,
    trainerController.updateTrainer
);

Router.post('/getTrainers',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    trainerValidator.getTrainersByCompany(),
    auth.handleValidatorError,
    trainerController.getTrainers
);

Router.post('/block_unblock_trainer',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    trainerValidator.block_unblock_trainer(),
    auth.handleValidatorError,
    trainerController.blockTrainer
);

Router.post('/deleteTrainer',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    trainerValidator.deleteTrainer(),
    auth.handleValidatorError,
    trainerController.deleteTrainer
);

Router.post('/assign_trainee_to_trainer',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    trainerValidator.assign_trainee_to_trainer(),
    auth.handleValidatorError,
    trainerController.assign_trainee_to_trainer
)

Router.post('/unassignTrainer',
    formData.any(),
    auth.verify_companyAdmin_AuthenticateToken,
    trainerValidator.unassignTrainer(),
    auth.handleValidatorError,
    trainerController.unassignTrainer
)


Router.post('/getTrainersForAssignDepartment',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    trainerValidator.getTrainersForAssignDepartment(),
    auth.handleValidatorError,
    trainerController.getTrainersForAssignDepartment
);

//* This for GOLD Panel
Router.post('/checkAssignTrainersTrainee',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    trainerValidator.checkAssignTrainersTrainee(),
    auth.handleValidatorError,
    trainerController.checkAssignTrainersTrainee
);


//* This for GOLD Panel
Router.post('/assign_department_to_trainer',
    formData.none(),
    auth.verify_companyAdmin_AuthenticateToken,
    trainerValidator.assign_department_to_trainer(),
    auth.handleValidatorError,
    trainerController.assign_department_to_trainer
);

//-------- End TrainerController ---------------------------------------------------

export default Router;