import * as express from "express";
import auth from "../../../../core/middleware/auth";
import elearningTraineeTestController from "../../controller/elearning/elearningTraineeTest.controller";
import elearningValidator from "../../validator/root/elearning.validator";

const ElearningTraineeRoutes = express.Router();


var multer = require('multer');
var formData = multer();

ElearningTraineeRoutes.post('/getElearningDataTrainee',
  formData.none(),
  auth.verify_traineeAdmin_AuthenticateToken,
  elearningValidator.getElearning_Test_trainee_dashboard(),
  auth.handleValidatorError,
  elearningTraineeTestController.getElearningTestData
)


ElearningTraineeRoutes.post('/start_training_session',
  formData.none(),
  auth.verify_traineeAdmin_AuthenticateToken,
  elearningValidator.session_validator(),
  auth.handleValidatorError,
  elearningTraineeTestController.start_training_session
)



ElearningTraineeRoutes.post('/reset_training_session',
  formData.none(),
  auth.verify_traineeAdmin_AuthenticateToken,
  elearningValidator.session_validator(),
  auth.handleValidatorError,
  elearningTraineeTestController.reset_training_session
)

ElearningTraineeRoutes.post('/close_training_session',
  formData.none(),
  auth.verify_traineeAdmin_AuthenticateToken,
  elearningValidator.getElearning_Test_trainee_dashboard(),
  auth.handleValidatorError,
  elearningTraineeTestController.close_training_session
)

ElearningTraineeRoutes.post('/get_trainee_test_details_info',
  formData.none(),
  auth.verify_traineeAdmin_AuthenticateToken,
  elearningValidator.test_detail_info(),
  auth.handleValidatorError,
  elearningTraineeTestController.get_trainee_test_details
)



ElearningTraineeRoutes.post('/get_elearning_test_result',
  formData.none(),
  auth.verify_traineeAdmin_AuthenticateToken,
  elearningValidator.test_result(),
  auth.handleValidatorError,
  elearningTraineeTestController.get_elearning_test_result
)

//! THIS URL HANDLING THE TRAINEE ELEARNING
ElearningTraineeRoutes.put('/storeElearningResult/statements',
elearningTraineeTestController.store_trainee_test_data
)

ElearningTraineeRoutes.put('/storeElearningResult/activities',
elearningTraineeTestController.handle_scrom_activities_state
)

ElearningTraineeRoutes.get('/storeElearningResult/activities/state',
elearningTraineeTestController.handle_scrom_activities_state
)

ElearningTraineeRoutes.put('/storeElearningResult/activities/state',
elearningTraineeTestController.handle_scrom_activities_state
)

export default ElearningTraineeRoutes;