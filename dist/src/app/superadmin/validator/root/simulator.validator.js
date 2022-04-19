"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class SimulatorValidator {
    addSimulator() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    editSimulator() {
        return [
            (0, express_validator_1.body)('simulator_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    deleteSimulator() {
        return [
            (0, express_validator_1.body)('simulator_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('deleted_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    assignSimulator() {
        return [
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('simulator_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    unassignSimulator() {
        return [
            (0, express_validator_1.body)('simulator_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getSimulator() {
        return [
        // body('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    get_company_simulator_list() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new SimulatorValidator();
