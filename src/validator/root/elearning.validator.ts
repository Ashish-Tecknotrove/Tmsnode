import { Response } from "express";
import { body } from "express-validator";

class ElearningValidator {


    checkElearning() {
        return [
            body('test_id').notEmpty().withMessage('parameter is missing'),
            // body('testfile').notEmpty().withMessage('parameter is missing'),
        ];
    }

    getElearning() {
        return [
            body('parent_category_id').notEmpty().withMessage('parameter is missing'),
            body('technology_type_id').notEmpty().withMessage('parameter is missing'),
            // body('testfile').notEmpty().withMessage('parameter is missing'),
        ];
    }

    checkElearningId() {
        return [
            body('elearning_id').notEmpty().withMessage('parameter is missing'),
            // body('testfile').notEmpty().withMessage('parameter is missing'),
        ];
    }
}

export default new ElearningValidator();