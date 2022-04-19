import * as express from "express";
import auth from "../../../../core/middleware/auth";
import elearningTraineeTestController from "../../controller/elearning/elearningTraineeTest.controller";
import traineeResourcesController from "../../controller/root/trainee.resources.controller";
import elearningValidator from "../../validator/root/elearning.validator";
import traineeRootValidator from "../../validator/root/trainee.root.validator";

const TraineeRootRoutes = express.Router();


var multer = require('multer');
var formData = multer();

TraineeRootRoutes.post('/getTechnologiesAllotedToTrainee',
  formData.none(),
  auth.verify_traineeAdmin_AuthenticateToken,
  traineeRootValidator.getAllottedTecknologies(),
  auth.handleValidatorError,
  traineeResourcesController.getTechnologiesAllotedToTrainee
)

export default TraineeRootRoutes;