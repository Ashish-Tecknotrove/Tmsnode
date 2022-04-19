import { Response } from "express";
import { body } from "express-validator";

class ElearningValidator {


    checkElearning() 
    {
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

    getElearningCurriculumModuleReport(){
        return [
            body('curriculum_id').notEmpty().withMessage('parameter is missing'),
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
        ];
    }


    //! VAlidator for Elearning Trainee Test

    getElearning_Test_trainee_dashboard() {
        return [
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    session_validator()
    {
        return [
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
            body('test_id').notEmpty().withMessage('parameter is missing'),
            body('builder_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    test_detail_info() {
        return [
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
            body('test_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    test_result()
    {
        return [
            body('result_id').notEmpty().withMessage('parameter is missing')
        ];
    }

}

export default new ElearningValidator();