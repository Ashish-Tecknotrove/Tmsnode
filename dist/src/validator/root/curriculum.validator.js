"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class CurriculumValidator {
    parentCategory() {
        return [
            (0, express_validator_1.body)('title').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('technology_type_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    parentCategoryTest() {
        return [
            (0, express_validator_1.body)('subcategory_prefix').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('subcategory_name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('title').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('parent_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('technology_type_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
}
exports.default = new CurriculumValidator();
