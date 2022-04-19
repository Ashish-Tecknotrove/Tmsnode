import { Response } from "express";
import { body } from "express-validator";

class CompanyValidator {


    registerCommpanyParameter() {
        return [
            body('company_name').notEmpty().withMessage('parameter is missing'),
            body('gst').notEmpty().withMessage('parameter is missing'),
            body('pincode').notEmpty().withMessage('parameter is missing'),
            body('country_id').notEmpty().withMessage('parameter is missing'),
            body('state_id').notEmpty().withMessage('parameter is missing'),
            body('city_id').notEmpty().withMessage('parameter is missing'),
            body('address').notEmpty().withMessage('parameter is missing'),
            body('trainee_unique_fields').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing'),
            body('picture').notEmpty().withMessage('parameter is missing'),
        ];
    }

    updateCommpanyParameter() {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('company_name').notEmpty().withMessage('parameter is missing'),
            body('gst').notEmpty().withMessage('parameter is missing'),
            body('pincode').notEmpty().withMessage('parameter is missing'),
            body('country_id').notEmpty().withMessage('parameter is missing'),
            body('state_id').notEmpty().withMessage('parameter is missing'),
            body('city_id').notEmpty().withMessage('parameter is missing'),
            body('address').notEmpty().withMessage('parameter is missing'),
            body('trainee_unique_fields').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
            body('picture').notEmpty().withMessage('parameter is missing'),
        ];
    }

    deleteCommpanyParameter() {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('deleted_by').notEmpty().withMessage('parameter is missing')
        ];
    }

    companyPersonofcontact() {
        return [
            body('name').notEmpty().withMessage('parameter is missing'),
            body('department').notEmpty().withMessage('parameter is missing'),
            body('contact_number').notEmpty().withMessage('parameter is missing'),
            body('email').notEmpty().withMessage('parameter is missing')
        ];
    }

    companyPersonLogin()
    {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('name').notEmpty().withMessage('parameter is missing'),
            body('designation').notEmpty().withMessage('parameter is missing'),
            body('mobile_no').notEmpty().withMessage('parameter is missing'),
            body('email').notEmpty().withMessage('parameter is missing'),
            body('email').isEmail().withMessage(' is not in a valid format'),
            body('password').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing'),
        ];
    }

    getcompanyPerson()
    {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing')
        ];
    }

    updatecompanyPersonLogin()
    {
        return [
            body('user_id').notEmpty().withMessage('parameter is missing'),
            body('name').notEmpty().withMessage('parameter is missing'),
            body('designation').notEmpty().withMessage('parameter is missing'),
            body('mobile_no').notEmpty().withMessage('parameter is missing'),
            body('email').notEmpty().withMessage('parameter is missing'),
            body('email').isEmail().withMessage('invalid email'),
            body('password').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }

    deletecompanyPerson()
    {
        return [
            body('user_id').notEmpty().withMessage('parameter is missing'),
            body('deleted_by').notEmpty().withMessage('parameter is missing')
        ];
    }

    getTraineeCustomFormValidator()
    {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing')
        ];
    }

    get_company_card1_data(){
        return [
            body('company_id').notEmpty().withMessage('parameter is missing')
        ];
    }

    get_company_card2_data_by_trainer(){
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('trainer_id').notEmpty().withMessage('parameter is missing')
        ];
    }

    get_company_card3_data(){
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('panel_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

}

export default new CompanyValidator();