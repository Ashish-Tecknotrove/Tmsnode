import {body} from "express-validator";

class SubCompanyValidator {


    registerSubcompany() {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('name').notEmpty().withMessage('parameter is missing'),
            body('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
            body('username').notEmpty().withMessage('parameter is missing'),
            body('contact_no').notEmpty().withMessage('parameter is missing'),
            body('designation').notEmpty().withMessage('parameter is missing'),
            body('password').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }

    getSubcompany() {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
        ]
    }

    assignDepartmentValidator() {
        return [
            body('sub_company_id').notEmpty().withMessage('parameter is missing'),
            body('department_id').notEmpty().withMessage('parameter is missing'),
            body('name').notEmpty().withMessage('parameter is missing'),
            body('designation').notEmpty().withMessage('parameter is missing'),
            body('contact_no').notEmpty().withMessage('parameter is missing'),
            body('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
            body('password').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing')

        ]
    }

    assignTrainerValidator() {
        return [
            body('sub_company_id').notEmpty().withMessage('parameter is missing'),
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),

        ]
    }

    block_unblock_subcompany() {
        return [
            // body('IsBlock').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
            body('sub_company_id').notEmpty().withMessage('parameter is missing'),
        ]
    }

    edit_subcompany(){
        return [
            body('name').notEmpty().withMessage('parameter is missing'),
            body('username').notEmpty().withMessage('parameter is missing'),
            body('contact_no').notEmpty().withMessage('parameter is missing'),
            body('designation').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
            body('sub_company_id').notEmpty().withMessage('parameter is missing'),
        ]
    }


}

export default new SubCompanyValidator();