"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class TraineeValidator {
    getTraineeCustomFormValidator() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    registerTrainee() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('curriculum_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('first_name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    updateTrainee() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('first_name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
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
    get_trainee_assigned_to_trainer_and_not_assigned() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    getAssignTraineeOfTrainer() {
        return [
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    getAssignTraineeCurriculum() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing')
            //body('language_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    //TODO TRAINEE DASHBOARD 
    getAssignTraineeCurriculumValidator() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing')
            //body('language_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    bulkimportTraineevalidate() {
        return [];
    }
}
exports.default = new TraineeValidator();
