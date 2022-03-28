"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class CurriculumValidator {
    technology() {
        return [
            (0, express_validator_1.body)('technology_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    parentCategory() {
        return [
            (0, express_validator_1.body)('title').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('technology_type_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    parentCategoryTest() {
        return [
            (0, express_validator_1.body)('technology_type_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('parent_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('prefix').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('title').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('description').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('language_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getParentCategory() {
        return [
            (0, express_validator_1.body)('parent_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getParentCategoryTest() {
        return [
            (0, express_validator_1.body)('test_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    updateParentCategoryTest() {
        return [
            (0, express_validator_1.body)('test_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('prefix').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('title').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('description').notEmpty().withMessage('parameter is missing'),
            // body('language_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    deleteParentCategoryTest() {
        return [
            (0, express_validator_1.body)('test_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('deleted_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getComapnyCurriculamValidId() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    buildCurriculumParameter() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('curriculum').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    getCurriculumWithSubscriptionCheck() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    getTestMarksAttemptByTechnology() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            // body('technology_type_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('curriculum_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    submitTestMarksAttemptByTechnology() {
        return [
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('data').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new CurriculumValidator();
