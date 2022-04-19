"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class CompanyDepartmentValidator {
    assignTrainersToDepartment_SubCompany() {
        return [
            (0, express_validator_1.body)('department_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    addDepartmentValidator() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('department_name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('username').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('designation').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('contactNumber').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
            (0, express_validator_1.body)('password').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getDepartment() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    blockUnblockCompanyDepartment() {
        return [
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('company_department_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    editCompanyDepartment() {
        return [
            (0, express_validator_1.body)('company_department_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('username').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('contactNumber').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('designation').notEmpty().withMessage('parameter is missing'),
            // body('name').notEmpty().withMessage('parameter is missing'),
            // body('descripition').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new CompanyDepartmentValidator();
