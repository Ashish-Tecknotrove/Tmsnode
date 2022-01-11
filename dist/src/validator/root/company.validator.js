"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class CompanyValidator {
    registerCommpanyParameter() {
        return [
            (0, express_validator_1.body)('company_name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('gst').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('pincode').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('country_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('state_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('city_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('address').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainee_unique_fields').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('picture').notEmpty().withMessage('parameter is missing'),
        ];
    }
    companyPersonofcontact() {
        return [
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('department').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('contact_number').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('email').notEmpty().withMessage('parameter is missing')
        ];
    }
}
exports.default = new CompanyValidator();