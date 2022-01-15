import { body } from "express-validator";


class LoginValidator{

    checkLoginParameters()
    {
        return[
            body('username').notEmpty().withMessage('parameter is missing'),
            body('password').notEmpty().withMessage('parameter is missing')
        ];
    }

    verifytokenParameters()
    {
        return[
            body('access_token').notEmpty().withMessage('parameter is missing')
        ];
    }

}


export default new LoginValidator();