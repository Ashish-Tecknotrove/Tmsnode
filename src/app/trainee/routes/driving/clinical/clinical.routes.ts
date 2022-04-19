import * as express from "express";
import auth from "../../../../../core/middleware/auth";
import clinicalController from "../../../controller/driving/clinical/clinical.controller";
import clinicalValidators from "../../../validator/driving/clinical.validators";


const ClinicalRoutes = express.Router();


var multer = require('multer');
var formData = multer();

ClinicalRoutes.post('/getClinicalDasboard',
  formData.none(),
  clinicalController.get_clinical_dashboard_report
)

ClinicalRoutes.post('/storeClinicalData',
formData.none(),
auth.verify_trainerAdmin_AuthenticateToken, //?? TRAINER APIS ARE ALLOWED TO STORED CLINICAL DATA
clinicalValidators.StoreDataValidator(),
auth.handleValidatorError,
clinicalController.storeClinicalData
)

ClinicalRoutes.post("/getClinicalCurriculum",
formData.none(),
auth.verify_trainerAdmin_AuthenticateToken, //?? TRAINER APIS ARE ALLOWED TO STORED CLINICAL DATA
clinicalValidators.ClinicalCurriculum(),
auth.handleValidatorError,
clinicalController.getClinicalCurriculum
)

ClinicalRoutes.post("/getClinicalAssignTrainee",
formData.none(),
auth.verify_trainerAdmin_AuthenticateToken, //?? TRAINER APIS ARE ALLOWED TO STORED CLINICAL DATA
clinicalValidators.GetAssignedTrainee(),
auth.handleValidatorError,
clinicalController.getClinical_AssignedTrainee
)


ClinicalRoutes.post('/getClinicalTestReport',
    formData.none(),
    auth.verify_traineeAdmin_AuthenticateToken,
    clinicalValidators.getClinicalTestReport(),
    auth.handleValidatorError,
    clinicalController.getClinicalTestReport
)


ClinicalRoutes.post('/getClinicalTestConsolidatedReport',
    formData.none(),
    auth.verify_traineeAdmin_AuthenticateToken,
    clinicalValidators.getClinicalTestConsolidatedReport(),
    auth.handleValidatorError,
    clinicalController.getClinicalTestConsolidatedReport
)


export default ClinicalRoutes;