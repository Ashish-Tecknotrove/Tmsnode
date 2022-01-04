import {body} from "express-validator";

class CompanyValidator{


    registerCommpanyParameter()
    {
        return[
            body('company_name').notEmpty().withMessage('parameter is missing'),
            body('gst_number').notEmpty().withMessage('parameter is missing'),
            body('pincode').notEmpty().withMessage('parameter is missing'),
            body('country').notEmpty().withMessage('parameter is missing'),
            body('state').notEmpty().withMessage('parameter is missing'),
            body('city').notEmpty().withMessage('parameter is missing'),
            body('address').notEmpty().withMessage('parameter is missing'),
            body('trainee_unique_fields').notEmpty().withMessage('parameter is missing')
            // body('logo').notEmpty().withMessage('parameter is missing')
        ];
    }

    companyPersonofcontact()
    {
        return[
            body('name').notEmpty().withMessage('parameter is missing'),
            body('department').notEmpty().withMessage('parameter is missing'),
            body('contact_number').notEmpty().withMessage('parameter is missing'),
            body('email').notEmpty().withMessage('parameter is missing')
        ];
    }
}

export default new CompanyValidator();