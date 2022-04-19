"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class BranchAdminValidator {
    getAssignedDepartment() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('sub_company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getAssignedTrainer() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('sub_company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    AssignDepartmentToTrainer() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('sub_company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('department_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('change_trainee_department_bit').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getTrainerassignedTrainee() {
        return [
            (0, express_validator_1.body)('trainer_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('sub_company_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    AssignTrainee() {
        return [
            (0, express_validator_1.body)('updateData').notEmpty().withMessage('parameter is missing')
        ];
    }
    BranchTrainee() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('sub_company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    BranchTraineeElearningReport() {
        return [
            (0, express_validator_1.body)('trainee_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    BranchTraineeSimulatorReport() {
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
            (0, express_validator_1.body)('sub_company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
    getDashboardCount() {
        return [
            (0, express_validator_1.body)('company_id').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('sub_company_id').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new BranchAdminValidator();
