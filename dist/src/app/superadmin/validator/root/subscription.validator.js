"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class SubscriptionValidator {
    newSubscriptionParameter() {
        return [
            (0, express_validator_1.body)('curriculum_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('day_no').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('calender_type').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('licenceType').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('payment_type').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('activation_date').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    updateSubscriptionParameter() {
        return [
            (0, express_validator_1.body)('subscription_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('day_no').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('calender_type').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('licenceType').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('payment_type').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('activation_date').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    deleteSubscriptionParameter() {
        return [
            (0, express_validator_1.body)('subscription_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('deleted_by').notEmpty().withMessage('parameter is missing'),
            // body('deletedAt').notEmpty().withMessage('parameter is missing')
        ];
    }
    getSubscriptionByCompany() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new SubscriptionValidator();
