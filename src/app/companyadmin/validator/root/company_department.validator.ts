import { body } from "express-validator";

class CompanyDepartmentValidator {


   assignTrainersToDepartment_SubCompany() {
      return [
         body('department_id').notEmpty().withMessage('parameter is missing'),
         body('updated_by').notEmpty().withMessage('parameter is missing'),
         body('trainer_id').notEmpty().withMessage('parameter is missing')
      ];
   }

   addDepartmentValidator() {
      return [
         body('company_id').notEmpty().withMessage('parameter is missing'),
         body('department_name').notEmpty().withMessage('parameter is missing'),
         body('username').notEmpty().withMessage('parameter is missing'),
         body('designation').notEmpty().withMessage('parameter is missing'),
         body('contactNumber').notEmpty().withMessage('parameter is missing'),
         body('email').notEmpty().withMessage('parameter is missing').isEmail().withMessage(' is not in a valid format'),
         body('password').notEmpty().withMessage('parameter is missing'),
         body('created_by').notEmpty().withMessage('parameter is missing'),
      ];
   }

   getDepartment() {
      return [
         body('company_id').notEmpty().withMessage('parameter is missing')
      ];
   }

   blockUnblockCompanyDepartment(){
      return [
         body('updated_by').notEmpty().withMessage('parameter is missing'),
         body('company_department_id').notEmpty().withMessage('parameter is missing')
      ];
   }

   editCompanyDepartment(){
      return [
         body('company_department_id').notEmpty().withMessage('parameter is missing'),
         body('username').notEmpty().withMessage('parameter is missing'),
         body('contactNumber').notEmpty().withMessage('parameter is missing'),
         body('designation').notEmpty().withMessage('parameter is missing'),
         body('name').notEmpty().withMessage('parameter is missing'),
         body('descripition').notEmpty().withMessage('parameter is missing'),
         body('updated_by').notEmpty().withMessage('parameter is missing'),
      ];
   }

}

export default new CompanyDepartmentValidator();