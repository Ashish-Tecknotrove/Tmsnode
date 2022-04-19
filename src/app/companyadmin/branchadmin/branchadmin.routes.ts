import { Router } from "express";
import multer from "multer";
import authValidator from "../../../auth/auth.validator";
import auth from "../../../core/middleware/auth";
import branchadminController from "./branchadmin.controller";
import branchadminValidator from "./branchadmin.validator";


const BranchAdminRoutes = Router();3
var formData = multer();

BranchAdminRoutes.post("/getBranchAssignedDepartment",
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.getAssignedDepartment(),
auth.handleValidatorError,
branchadminController.get_assigned_department
)

BranchAdminRoutes.post("/getBranchAssignedTrainerWithDepartmentInfo",
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.getAssignedTrainer(),
auth.handleValidatorError,
branchadminController.get_assigned_trainer_with_department
)

BranchAdminRoutes.post("/AssignDepartmentToTrainer",
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.AssignDepartmentToTrainer(),
auth.handleValidatorError,
branchadminController.assign_trainer_to_department
)

BranchAdminRoutes.post("/getBranchAssignedTrainer",
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.getAssignedTrainer(),
auth.handleValidatorError,
branchadminController.get_assigned_trainer
)

BranchAdminRoutes.post("/getTrainerAssignedTrainee_with_without_assigned",
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.getTrainerassignedTrainee(),
auth.handleValidatorError,
branchadminController.get_trainee_assigned_to_trainer_and_not_assigned
)

BranchAdminRoutes.post("/AssignTrainee",
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.AssignTrainee(),
auth.handleValidatorError,
branchadminController.assign_trainee
)

BranchAdminRoutes.post("/getBranchAssignTrainee",
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.BranchTrainee(),
auth.handleValidatorError,
branchadminController.get_branch_assign_trainee
)

BranchAdminRoutes.post('/getTraineeSimulatorConsolidatedReport',
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.BranchTraineeSimulatorReport(),
auth.handleValidatorError,
branchadminController.getTraineeSimulatorConsolidatedReport
)

BranchAdminRoutes.post('/getTraineeElearingConsolidatedReport',
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.BranchTraineeElearningReport(),
auth.handleValidatorError,
branchadminController.getTraineeElearingConsolidatedReport
)

BranchAdminRoutes.post('/getTrainerPerfomance',
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.TrainerPerformance(),
auth.handleValidatorError,
branchadminController.getTrainerPerfomance
)


BranchAdminRoutes.post('/getTraineePerformanceTrack',
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.TraineePerformanceTrack(),
auth.handleValidatorError,
branchadminController.getTraineeTrainingReport
)


BranchAdminRoutes.post('/getDashboardCount',
formData.none(),
auth.verify_branchAdmin_AuthenticateToken,
branchadminValidator.getDashboardCount(),
auth.handleValidatorError,
branchadminController.getDashboardCount
)

export default BranchAdminRoutes;