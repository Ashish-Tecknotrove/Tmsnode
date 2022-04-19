import { body } from "express-validator";

class MasterDepartmentValidator {


   addMasterDepartment() {
      return [
         body('company_id').notEmpty().withMessage('parameter is missing'),
         body('name').notEmpty().withMessage('parameter is missing'),
         body('created_by').notEmpty().withMessage('parameter is missing')
      ];
   }

   updateMasterDepartment() {
      return [
         body('masterdepartment_id').notEmpty().withMessage('parameter is missing'),
         body('name').notEmpty().withMessage('parameter is missing'),
         body('updated_by').notEmpty().withMessage('parameter is missing')
      ];
   }

   deleteMasterDepartment() {
      return [
         body('masterdepartment_id').notEmpty().withMessage('parameter is missing'),
         body('deleted_by').notEmpty().withMessage('parameter is missing')
      ];
   }

   getMasterDepartment() {
      return [
         body('company_id').notEmpty().withMessage('parameter is missing'),
      ];
   }

}

export default new MasterDepartmentValidator();