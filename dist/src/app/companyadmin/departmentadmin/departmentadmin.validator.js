"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class DepartmentAdminValidator {
    getAssignedDepartment() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getAssignedTrainer() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('department_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    AssignDepartmentToTrainer() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('department_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('change_trainee_department_bit').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getTrainerassignedTrainee() {
        return [
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    AssignTrainee() {
        return [
            (0, express_validator_1.body)('updateData').notEmpty().withMessage('parameter is missing')
        ];
    }
    DepartmentTrainee() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('department_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    DepartmentTraineeElearningReport() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    DepartmentTraineeSimulatorReport() {
        return [
            (0, express_validator_1.body)('enrollmentId').notEmpty().withMessage('parameter is missing'),
        ];
    }
    TrainerPerformance() {
        return [
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    TraineePerformanceTrack() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getDashboardCount() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new DepartmentAdminValidator();
