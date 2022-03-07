"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class TrainerValidator {
    registerTrainer() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
            (0, express_validator_1.body)('password').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_expertise').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    updateTrainer() {
        return [
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('password').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_expertise').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    getTrainersByCompany() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    deleteTrainer() {
        return [
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('deleted_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    assign_trainee_to_trainer() {
        return [
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainees_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    unassignTrainer() {
        return [
            (0, express_validator_1.body)('assignTrainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getTraineeRemarks() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('curriculum_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('language_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('technology_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    addTraineeRemarks() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('curriculum_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('curriculum_builder_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('remarks').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    updateTraineeRemarks() {
        return [
            (0, express_validator_1.body)('trainee_remark_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('remarks').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }
}
exports.default = new TrainerValidator();
