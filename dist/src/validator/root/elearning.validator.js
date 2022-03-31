"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ElearningValidator {
    checkElearning() {
        return [
            (0, express_validator_1.body)('test_id').notEmpty().withMessage('parameter is missing'),
            // body('testfile').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getElearning() {
        return [
            (0, express_validator_1.body)('parent_category_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('technology_type_id').notEmpty().withMessage('parameter is missing'),
            // body('testfile').notEmpty().withMessage('parameter is missing'),
        ];
    }
    checkElearningId() {
        return [
            (0, express_validator_1.body)('elearning_id').notEmpty().withMessage('parameter is missing'),
            // body('testfile').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getElearningCurriculumModuleReport() {
        return [
            (0, express_validator_1.body)('curriculum_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    //! VAlidator for Elearning Trainee Test
    getElearning_Test_trainee_dashboard() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    test_detail_info() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('test_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new ElearningValidator();
