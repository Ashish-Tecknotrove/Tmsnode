import { Router } from "express";
import multer from "multer";
import authValidator from "../../../auth/auth.validator";
import auth from "../../../core/middleware/auth";
import branchadminController from "./departmentadmin.controller";
import departmentadminValidator from "./departmentadmin.validator";



const DepartmentAdminRoutes = Router();3
var formData = multer();


DepartmentAdminRoutes.post("/getDepartmentAssignedTrainer",
formData.none(),
auth.verify_departmentAdmin_AuthenticateToken,
departmentadminValidator.getAssignedTrainer(),
auth.handleValidatorError,
branchadminController.get_assigned_trainer
)

DepartmentAdminRoutes.post("/getTrainerAssignedTrainee_with_without_assigned",
formData.none(),
auth.verify_departmentAdmin_AuthenticateToken,
departmentadminValidator.getTrainerassignedTrainee(),
auth.handleValidatorError,
branchadminController.get_trainee_assigned_to_trainer_and_not_assigned
)

DepartmentAdminRoutes.post("/AssignTrainee",
formData.none(),
auth.verify_departmentAdmin_AuthenticateToken,
departmentadminValidator.AssignTrainee(),
auth.handleValidatorError,
branchadminController.assign_trainee
)

DepartmentAdminRoutes.post("/getDepartmentAssignTrainee",
formData.none(),
auth.verify_departmentAdmin_AuthenticateToken,
departmentadminValidator.DepartmentTrainee(),
auth.handleValidatorError,
branchadminController.get_department_assign_trainee
)

DepartmentAdminRoutes.post('/getTraineeSimulatorConsolidatedReport',
formData.none(),
auth.verify_departmentAdmin_AuthenticateToken,
departmentadminValidator.DepartmentTraineeSimulatorReport(),
auth.handleValidatorError,
branchadminController.getTraineeSimulatorConsolidatedReport
)

DepartmentAdminRoutes.post('/getTraineeElearingConsolidatedReport',
formData.none(),
auth.verify_departmentAdmin_AuthenticateToken,
departmentadminValidator.DepartmentTraineeElearningReport(),
auth.handleValidatorError,
branchadminController.getTraineeElearingConsolidatedReport
)

DepartmentAdminRoutes.post('/getTrainerPerfomance',
formData.none(),
auth.verify_departmentAdmin_AuthenticateToken,
departmentadminValidator.TrainerPerformance(),
auth.handleValidatorError,
branchadminController.getTrainerPerfomance
)


DepartmentAdminRoutes.post('/getTraineePerformanceTrack',
formData.none(),
auth.verify_departmentAdmin_AuthenticateToken,
departmentadminValidator.TraineePerformanceTrack(),
auth.handleValidatorError,
branchadminController.getTraineeTrainingReport
)


DepartmentAdminRoutes.post('/getDashboardCount',
formData.none(),
auth.verify_departmentAdmin_AuthenticateToken,
departmentadminValidator.getDashboardCount(),
auth.handleValidatorError,
branchadminController.getDashboardCount
)

export default DepartmentAdminRoutes;