import { body } from "express-validator";

class SimulatorValidator {


    addSimulator() {
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('name').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing'),
        ];
    }

    editSimulator() {
        return [
            body('simulator_id').notEmpty().withMessage('parameter is missing'),
            body('name').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }

    deleteSimulator() {
        return [
            body('simulator_id').notEmpty().withMessage('parameter is missing'),
            body('deleted_by').notEmpty().withMessage('parameter is missing'),
        ];
    }

    assignSimulator() {
        return [
            body('trainer_id').notEmpty().withMessage('parameter is missing'),
            body('simulator_id').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    
    unassignSimulator() {
        return [
            body('simulator_id').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }


    getSimulator() {
        return [
           // body('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    get_company_simulator_list() {
        return [
           body('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }


}

export default new SimulatorValidator();