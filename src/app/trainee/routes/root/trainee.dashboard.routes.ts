import * as express from "express";
import auth from "../../../../core/middleware/auth";
import traineeDashboardController from "../../controller/root/trainee.dashboard.controller";
import traineeRootValidator from "../../validator/root/trainee.root.validator";

const TraineeRootRoutes = express.Router();


var multer = require('multer');
var formData = multer();


TraineeRootRoutes.post('/getCompleteRatioOfCourse',
  formData.none(),
  auth.verify_traineeAdmin_AuthenticateToken,
  traineeRootValidator.getCompleteRatioOfCourse(),
  auth.handleValidatorError,
  traineeDashboardController.getCompleteRatioOfCourse
)

export default TraineeRootRoutes;