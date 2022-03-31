import { body } from "express-validator";

class TraineeValidator {

    getTraineeCustomFormValidator()
    {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    
    registerTrainee() {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('curriculum_id').notEmpty().withMessage('parameter is missing'),
            body('first_name').notEmpty().withMessage('parameter is missing'),
            body('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
            body('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }


    updateTrainee() {
        return [
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
            body('first_name').notEmpty().withMessage('parameter is missing'),
            body('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
            body('updated_by').notEmpty().withMessage('parameter is missing')

        ];
    }

    deleteTraineevalidate(){
        return [
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
            body('deleted_by').notEmpty().withMessage('parameter is missing')
        ];
    }

    blockTrainee()
    {
        return [
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }

    getAssignTraineeOfTrainer(){
        return [
            body('trainer_id').notEmpty().withMessage('parameter is missing')
        ];
    }

    getAssignTraineeCurriculum(){
        return [
            body('trainee_id').notEmpty().withMessage('parameter is missing')
            //body('language_id').notEmpty().withMessage('parameter is missing')
        ];
    }


    //TODO TRAINEE DASHBOARD 
    getAssignTraineeCurriculumValidator()
    {
        return [
            body('trainee_id').notEmpty().withMessage('parameter is missing')
            //body('language_id').notEmpty().withMessage('parameter is missing')
        ];
    }


    bulkimportTraineevalidate()
    {
        return[
            
        ];
    }


}

export default new TraineeValidator();