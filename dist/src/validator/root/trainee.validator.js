"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class TraineeValidator {
    registerTrainee() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('first_name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage('Valid Email'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    updateTrainee() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('first_name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage('Valid Email'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    deleteTraineevalidate() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('deleted_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    blockTrainee() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }
}
exports.default = new TraineeValidator();
