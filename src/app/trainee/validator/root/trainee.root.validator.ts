import { Response } from "express";
import { body } from "express-validator";

class TraineeRootValidator {


    getAllottedTecknologies() {
        return [
            body('trainee_id').notEmpty().withMessage('parameter is missing'),
            // body('testfile').notEmpty().withMessage('parameter is missing'),
        ];
    }

    

}

export default new TraineeRootValidator();