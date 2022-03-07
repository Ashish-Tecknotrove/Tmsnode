"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class SubCompanyValidator {
    registerSubcompany() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('designation').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('contact_no').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
            (0, express_validator_1.body)('password').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    getSubcompany() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    assignDepartmentValidator() {
        return [
            (0, express_validator_1.body)('sub_company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('department_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('designation').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('contact_no').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
            (0, express_validator_1.body)('password').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    assignTrainerValidator() {
        return [
            (0, express_validator_1.body)('sub_company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new SubCompanyValidator();
