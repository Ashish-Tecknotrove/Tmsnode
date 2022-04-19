"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class TraineeRootValidator {
    getAllottedTecknologies() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
            // body('testfile').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getCompleteRatioOfCourse() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('enrollment_Id').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new TraineeRootValidator();
