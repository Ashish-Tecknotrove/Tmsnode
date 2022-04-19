import { body } from "express-validator";


class DepartmentAdminValidator
{
    getAssignedDepartment() 
    {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    getAssignedTrainer() 
    {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            
            body('department_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    AssignDepartmentToTrainer() 
    {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('department_id').notEmpty().withMessage('parameter is missing'),
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('change_trainee_department_bit').notEmpty().withMessage('parameter is missing'),
        ];
    }

    getTrainerassignedTrainee() 
    {
        return [
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('company_id').notEmpty().withMessage('parameter is missing'),
            
        ];
    }

    AssignTrainee() 
    {
        return [
            body('updateData').notEmpty().withMessage('parameter is missing')
        ];
    }

    DepartmentTrainee()
    {
        return[
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('department_id').notEmpty().withMessage('parameter is missing')
            
        ]
    }

    

    
    DepartmentTraineeElearningReport()
    {
        return[
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
        ]
    }

    DepartmentTraineeSimulatorReport()
    {
        return[
            body('enrollmentId').notEmpty().withMessage('parameter is missing'),
        ]
    }

    TrainerPerformance()
    {
        return[
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
        ]
    }

    TraineePerformanceTrack()
    {
        return[
            body('company_id').notEmpty().withMessage('parameter is missing'),
            
        ]
    }

    
    getDashboardCount()
    {
        return[
            body('company_id').notEmpty().withMessage('parameter is missing'),
        ]
    }

}



export default new DepartmentAdminValidator();