"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ClinicalValidator {
    StoreDataValidator() {
        return [
            (0, express_validator_1.body)('trainee_data').notEmpty().withMessage('parameter is missing'),
            // body('testfile').notEmpty().withMessage('parameter is missing'),
        ];
    }
    ClinicalCurriculum() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    GetAssignedTrainee() {
        return [
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getClinicalTestReport() {
        return [
            (0, express_validator_1.body)('enrollmentId').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('ModuleCT').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getClinicalTestConsolidatedReport() {
        return [
            (0, express_validator_1.body)('enrollmentId').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new ClinicalValidator();
