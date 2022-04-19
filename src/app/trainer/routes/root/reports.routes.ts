import * as express from "express";
import auth from "../../../../core/middleware/auth";
import reportsController from "../../controller/root/reports.controller";
import reportsValidator from "../../validator/root/reports.validator";


const Router = express.Router();
var multer = require("multer");
var formData = multer();

//-------- Start ReportsController ---------------------------------------------------
Router.post('/getTrainerTrainingReport',
    formData.none(),
    auth.verify_trainerAdmin_AuthenticateToken,
    reportsValidator.getTrainerTrainingReport(),
    auth.handleValidatorError,
    reportsController.getTrainerTrainingReport
)

Router.post('/getTrainerPerfomance',
    formData.none(),
    auth.verify_trainerAdmin_AuthenticateToken,
    reportsValidator.getTrainerPerfomance(),
    auth.handleValidatorError,
    reportsController.getTrainerPerfomance
)

Router.post('/getTraineeSimulatorConsolidatedReport',
    formData.none(),
    auth.verify_trainerAdmin_AuthenticateToken,
    reportsValidator.getTraineeSimulatorConsolidatedReport(),
    auth.handleValidatorError,
    reportsController.getTraineeSimulatorConsolidatedReport
)

Router.post('/getTraineeElearingConsolidatedReport',
    formData.none(),
    auth.verify_trainerAdmin_AuthenticateToken,
    reportsValidator.getTraineeElearingConsolidatedReport(),
    auth.handleValidatorError,
    reportsController.getTraineeElearingConsolidatedReport
)


//-------- End ReportsController ---------------------------------------------------


export default Router;