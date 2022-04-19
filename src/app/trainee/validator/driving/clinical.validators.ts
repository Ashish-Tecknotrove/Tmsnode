import { Response } from "express";
import { body } from "express-validator";

class ClinicalValidator {


    StoreDataValidator() {
        return [
            body('trainee_data').notEmpty().withMessage('parameter is missing'),
            // body('testfile').notEmpty().withMessage('parameter is missing'),
        ];
    }

    ClinicalCurriculum() {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    GetAssignedTrainee() {
        return [
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    getClinicalTestReport() {
        return [
            body('enrollmentId').notEmpty().withMessage('parameter is missing'),
            body('ModuleCT').notEmpty().withMessage('parameter is missing'),
        ];
    }

    getClinicalTestConsolidatedReport() {
        return [
            body('enrollmentId').notEmpty().withMessage('parameter is missing'),
        ];
    }

}

export default new ClinicalValidator();