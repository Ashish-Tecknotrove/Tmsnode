"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class MasterDepartmentValidator {
    addMasterDepartment() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    updateMasterDepartment() {
        return [
            (0, express_validator_1.body)('masterdepartment_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    deleteMasterDepartment() {
        return [
            (0, express_validator_1.body)('masterdepartment_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('deleted_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    getMasterDepartment() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new MasterDepartmentValidator();
