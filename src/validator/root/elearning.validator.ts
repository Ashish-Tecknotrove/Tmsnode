import { Response } from "express";
import { body } from "express-validator";

class ElearningValidator {


    checkElearning() {
        return [
            body('test_id').notEmpty().withMessage('parameter is missing')
        ];
    }
}

export default new ElearningValidator();