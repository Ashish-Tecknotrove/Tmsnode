import { check } from 'express-validator';
import e, { Request, Response } from "express";
import responseCodes from "../../strings/response-codes";
import responseStrings from "../../strings/response-strings";
import MasterDepartment from '../../model/root/master_department.model';

class MasterDepartmentController {

   async addMasterDepartment(req: Request, res: Response) {
      try {

         //? CHECK MASTER DEPARTMENT
         await MasterDepartment.findAll({
            where: {
               IsDeleted: 0,
               name: req.body.name,
               company_id:req.body.company_id
            },
            logging: console.log
         }).then(async (result) => {

            //?  MASTER DEPARTMENT NOT EXIST
            if (result.length == 0) {
               req.body.createdAt = responseStrings.currentTime;
               req.body.updated_by = '';

               //? MASTER DEPARTMENT CREATE
               await MasterDepartment.create({ ...req.body }).then(async (data) => {
                  res.status(responseCodes.SUCCESS).json({
                     response_code: 1,
                     message: responseStrings.ADD,
                     data: data
                  });
               }).catch(function (err: any) {
                  res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
               });
            } else {
               //?  MASTER DEPARTMENT EXIST
               return res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: responseStrings.EXISTS
               });
            }

         }).catch((err: any) => {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
               response_code: 0,
               message: err.message
            });
         })
      } catch (e: any) {
         return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: e.message,
            data: "",
         });
      }
   }

   async updateMasterDepartment(req: Request, res: Response) {
      try {

         //? CHECK MASTER DEPARTMENT
         await MasterDepartment.findOne({
            where: {
               IsDeleted: 0,
               id: req.body.masterdepartment_id
            },
            logging: console.log
         }).then(async (result) => {

            //?  MASTER DEPARTMENT EXIST
            if (result) {
               req.body.updatedAt = responseStrings.currentTime;

               let updateObj = {
                  name: req.body.name,
                  descripition: req.body.descripition,
                  updatedAt: responseStrings.currentTime,
                  updated_by:req.body.updated_by
               }

               //? MASTER DEPARTMENT UPDATE
               await MasterDepartment.update({ ...updateObj }, {
                  where: {
                     id: req.body.masterdepartment_id
                  }
               }).then(async (data) => {
                  res.status(responseCodes.SUCCESS).json({
                     response_code: 1,
                     message: responseStrings.UPDATED
                  });
               }).catch(function (err: any) {
                  res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
               });
            } else {
               //?  MASTER DEPARTMENT NOT EXIST
               return res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: responseStrings.NOT
               });
            }

         }).catch((err: any) => {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
               response_code: 0,
               message: err.message
            });
         })
      } catch (e: any) {
         return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: e.message,
            data: "",
         });
      }
   }

   async deleteMasterDepartment(req: Request, res: Response) {
      try {

         //? CHECK MASTER DEPARTMENT
         await MasterDepartment.findOne({
            where: {
               IsDeleted: 0,
               id: req.body.masterdepartment_id
            },
            logging: console.log
         }).then(async (result) => {

            //?  MASTER DEPARTMENT EXIST
            if (result) {

               let updateObj = {
                  IsDeleted: 1,
                  deletedAt: responseStrings.currentTime,
                  deleted_by:req.body.updated_by
               }

               //? MASTER DEPARTMENT DELETE
               await MasterDepartment.update({ ...updateObj }, {
                  where: {
                     id: req.body.masterdepartment_id
                  }
               }).then(async (data) => {
                  res.status(responseCodes.SUCCESS).json({
                     response_code: 1,
                     message: responseStrings.DELETE
                  });
               }).catch(function (err: any) {
                  res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
               });
            } else {
               //?  MASTER DEPARTMENT NOT EXIST
               return res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: responseStrings.NOT
               });
            }

         }).catch((err: any) => {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
               response_code: 0,
               message: err.message
            });
         })
      } catch (e: any) {
         return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: e.message,
            data: "",
         });
      }
   }

   async getMasterDepartment(req:Request,res:Response){
      try {

         //? CHECK MASTER DEPARTMENT
         await MasterDepartment.findAll({
            where: {
               IsDeleted: 0,
               company_id: req.body.company_id
            },
            logging: console.log
         }).then(async (result) => {

            //?  MASTER DEPARTMENT EXIST
            if (result) {

               res.status(responseCodes.SUCCESS).json({
                  response_code: 1,
                  message: responseStrings.GET,
                  data:result
               });
            } else {
               //?  MASTER DEPARTMENT NOT EXIST
               return res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: responseStrings.NOT
               });
            }

         }).catch((err: any) => {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
               response_code: 0,
               message: err.message
            });
         })
      } catch (e: any) {
         return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: e.message,
            data: "",
         });
      }
   }

}
export default new MasterDepartmentController();