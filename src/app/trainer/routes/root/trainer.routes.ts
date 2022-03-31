import * as express from "express";

import auth from "../../../../core/middleware/auth";
import elearningTrainerController from "../../controller/elearning/elearningTrainer.controller";

import companyController from "../../controller/root/company.controller";
import traineeController from "../../controller/root/trainee.controller";

import companyValidator from "../../validator/root/company.validator";
import traineeValidator from "../../validator/root/trainee.validator";

const Router = express.Router();
var multer = require("multer");
var formData = multer();

//----- Start CompanyController ---------------------------------------------------
Router.post('/get_company_card2_data',
    formData.any(),
    auth.verify_trainerAdmin_AuthenticateToken,
    companyValidator.get_company_card1_data(),
    auth.handleValidatorError,
    companyController.get_company_card2_data
)

Router.post('/get_company_card2_data_by_trainer',
    formData.any(),
    auth.verify_trainerAdmin_AuthenticateToken,
    companyValidator.get_company_card2_data_by_trainer(),
    auth.handleValidatorError,
    companyController.get_company_card2_data
)


Router.post('/getCurriculumWithSubscriptionCheck',
    formData.none(),
    auth.verify_trainerAdmin_AuthenticateToken,
    companyValidator.getCurriculumWithSubscriptionCheck(),
    auth.handleValidatorError,
    companyController.getCurriculum_with_subscription_check

)

//----- End CompanyController ---------------------------------------------------

//----- Start TraineeController ---------------------------------------------------
Router.post(
    "/getAssignTraineeOfTrainer",
    formData.any(),
    auth.verify_trainerAdmin_AuthenticateToken,
    traineeValidator.getAssignTraineeOfTrainer(),
    auth.handleValidatorError,
    traineeController.getAssignTraineeOfTrainer
);

Router.post(
    "/getAssignTraineeToTrainer",
    formData.any(),
    auth.verify_trainerAdmin_AuthenticateToken,
    traineeValidator.getAssignTraineeOfTrainer(),
    auth.handleValidatorError,
    traineeController.getAssignTraineeToTrainer
);

Router.post(
    "/getAssignTraineeCurriculum",
    formData.any(),
    auth.verify_trainerAdmin_AuthenticateToken,
    traineeValidator.getAssignTraineeCurriculum(),
    auth.handleValidatorError,
    traineeController.getAssignTraineeCurriculum
);

//TODO TRAINEE DASHBOARD
Router.post(
    "/getTechnologiesAllotedToTrainee",
    formData.any(),
    auth.verify_trainerAdmin_AuthenticateToken,
    traineeValidator.getAssignTraineeCurriculumValidator(),
    auth.handleValidatorError,
    traineeController.getTechnologiesAllotedToTrainee
);


Router.post('/getTraineeRemarks',
    formData.any(),
    auth.verify_trainerAdmin_AuthenticateToken,
    traineeValidator.getTraineeRemarks(),
    auth.handleValidatorError,
    traineeController.getTraineeRemarks
)

Router.post('/addTraineeRemarks',
    formData.any(),
    auth.verify_trainerAdmin_AuthenticateToken,
    traineeValidator.addTraineeRemarks(),
    auth.handleValidatorError,
    traineeController.addTraineeRemarks
)

Router.post('/updateTraineeRemarks',
    formData.any(),
    auth.verify_trainerAdmin_AuthenticateToken,
    traineeValidator.updateTraineeRemarks(),
    auth.handleValidatorError,
    traineeController.updateTraineeRemarks
)
//----- Start TraineeController ---------------------------------------------------


//----- Start ElearningTraineeTest ---------------------------------------------------

Router.post('/getElearningProgressDataForTrainer',
    formData.none(),
    auth.verify_trainerAdmin_AuthenticateToken,
    traineeValidator.getElearning_Test_trainee_dashboard(),
    auth.handleValidatorError,
    elearningTrainerController.getElearningProgressDataForTrainer
)

//----- Start ElearningTraineeTest ---------------------------------------------------

export default Router;