import { Response } from "express";
import { body } from "express-validator";

class ReportsValidator {


    getTrainerTrainingReport(){
        return [
            body('trainer_id').notEmpty().withMessage('parameter is missing')
        ];
    }

    getTrainerPerfomance(){
        return [
            body('trainer_id').notEmpty().withMessage('parameter is missing')
        ];
    }

    getTraineeSimulatorConsolidatedReport(){
        return [
            body('enrollmentId').notEmpty().withMessage('parameter is missing'),
        ];
    }

    getTraineeElearingConsolidatedReport(){
        return [
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
}

export default new ReportsValidator();