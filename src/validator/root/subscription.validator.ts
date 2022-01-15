import {body} from "express-validator";

class SubscriptionValidator {


    newSubscriptionParameter() {
        return [
            body('curriculum_id').notEmpty().withMessage('parameter is missing'),
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('day_no').notEmpty().withMessage('parameter is missing'),
            body('calender_type').notEmpty().withMessage('parameter is missing'),
            body('licence_no').notEmpty().withMessage('parameter is missing'),
            body('payment_type').notEmpty().withMessage('parameter is missing'),
            body('activation_date').notEmpty().withMessage('parameter is missing'),
            body('expiry_date').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }


}

export default new SubscriptionValidator();