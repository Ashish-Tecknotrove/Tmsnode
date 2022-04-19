"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ReportsValidator {
    getTrainerTrainingReport() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            // body('trainer_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    getTrainerPerfomance() {
        return [
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    getTraineeSimulatorConsolidatedReport() {
        return [
            (0, express_validator_1.body)('enrollmentId').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getTraineeElearingConsolidatedReport() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new ReportsValidator();
