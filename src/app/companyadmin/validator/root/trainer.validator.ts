import { body } from "express-validator";

class TrainerValidator {


    registerTrainer() {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('name').notEmpty().withMessage('parameter is missing'),
            body('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
            body('password').notEmpty().withMessage('parameter is missing'),
            body('trainer_expertise').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing')
        ];  
    }

    updateTrainer() {
        return [
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('name').notEmpty().withMessage('parameter is missing'),
            body('password').notEmpty().withMessage('parameter is missing'),
            body('trainer_expertise').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }

    getTrainersByCompany(){
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    deleteTrainer(){
        return [
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('deleted_by').notEmpty().withMessage('parameter is missing'),
        ];
    }

    

    assign_trainee_to_trainer(){
        return [
            body('created_by').notEmpty().withMessage('parameter is missing'),
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('trainees_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    unassignTrainer(){
        return [
            body('assignTrainer_id').notEmpty().withMessage('parameter is missing'),
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getTraineeRemarks(){
        return[
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
            body('curriculum_id').notEmpty().withMessage('parameter is missing'),
            body('language_id').notEmpty().withMessage('parameter is missing'),
            body('technology_id').notEmpty().withMessage('parameter is missing')
        ];
    }

    addTraineeRemarks(){
        return[
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('curriculum_id').notEmpty().withMessage('parameter is missing'),
            body('curriculum_builder_id').notEmpty().withMessage('parameter is missing'),
            body('remarks').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }

    updateTraineeRemarks(){
        return[
            body('trainee_remark_id').notEmpty().withMessage('parameter is missing'),
            body('remarks').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }

    block_unblock_trainer()
    {
        return[
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }

    getTrainersForAssignDepartment(){
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    assign_department_to_trainer(){
        return [
            body('company_department_id').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('bit').notEmpty().withMessage('parameter is missing'),
        ];
    }

    checkAssignTrainersTrainee(){
        return[
            body('company_department_id').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
        ];
    }


}

export default new TrainerValidator();