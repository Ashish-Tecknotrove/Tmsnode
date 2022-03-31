import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');

import MasterDepartment from "../../../../core/model/root/master_department.model";


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
            // logging: console.log
         }).then(async (result) => {

            //?  MASTER DEPARTMENT NOT EXIST
            if (result.length == 0) {
               req.body.createdAt = responseStrings.currentTime;
               req.body.updated_by = '';

               //? MASTER DEPARTMENT CREATE
               await MasterDepartment.create({ ...req.body }).then(async (data) => {
                  res.status(responseCodes.SUCCESS).json({
                     response_code: 1,
                     message: "Department added successfully.",
                     data: data
                  });
               }).catch(function (err: any) {
                  res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:  "Oops! "+ err.message });
               });
            } else {
               //?  MASTER DEPARTMENT EXIST
               return res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: "Oops! Name of department already exists, please use another one"
               });
            }

         }).catch((err: any) => {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
               response_code: 0,
               message:  "Oops! "+ err.message
            });
         })
      } catch (e: any) {
         return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message:  "Oops! "+ e.message,
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
               company_id: req.body.company_id,
               name: req.body.name
            },
            // logging: console.log
         }).then(async (result) => {

            //?  MASTER DEPARTMENT NOT EXIST
            if (result==null) {
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
                     message: "Department Updated Successfully."
                  });
               }).catch(function (err: any) {
                  res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:  "Oops! "+ err.message });
               });
            } else {
               //?  MASTER DEPARTMENT EXIST
               return res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: "Oops! An invalid department ID was entered, or this department was already deleted"
               });
            }

         }).catch((err: any) => {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
               response_code: 0,
               message:  "Oops! "+ err.message
            });
         })
      } catch (e: any) {
         return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message:  "Oops! "+ e.message,
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
            // logging: console.log
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
                     message: "Department Deleted Successfully."
                  });
               }).catch(function (err: any) {
                  res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:  "Oops! "+ err.message });
               });
            } else {
               //?  MASTER DEPARTMENT NOT EXIST
               return res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: "Oops! An invalid department ID was entered, or this department was already deleted"
               });
            }

         }).catch((err: any) => {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
               response_code: 0,
               message:  "Oops! "+ err.message
            });
         })
      } catch (e: any) {
         return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message:  "Oops! "+ e.message,
            data: "",
         });
      }
   }

   async getMasterDepartment(req:Request,res:Response){
      try {

         //? CHECK MASTER DEPARTMENT
         await MasterDepartment.findAll({
            where:{company_id:req.body.company_id,IsDeleted:0},
            //logging: console.log
         }).then(async (result) => {

            //?  MASTER DEPARTMENT EXIST
            if (result) {

               res.status(responseCodes.SUCCESS).json({
                  response_code: 1,
                  message: "data have been fetched successfully",
                  data:result
               });
            } else {
               //?  MASTER DEPARTMENT NOT EXIST
               return res.status(responseCodes.SUCCESS).json({
                  response_code: 0,
                  message: "No data were found"
               });
            }

         }).catch((err: any) => {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
               response_code: 0,
               message:  "Oops! "+ err.message
            });
         })
      } catch (e: any) {
         return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message:  "Oops! "+ e.message,
            data: "",
         });
      }
   }

}
export default new MasterDepartmentController();