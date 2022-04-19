import { Request, Response } from "express";
import { Op } from "sequelize";
import Simulator from "../../../../core/model/root/simulator.model";
import Trainer from "../../../../core/model/root/trainer.model";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";

class SimulatorController {


  async addSimulator(req: Request, res: Response) {
    try {
      req.body.createdAt = responseStrings.currentTime;

      await Simulator.findAll({
        where: {
          name: req.body.name,
          IsDeleted: 0,
        },
      }).then(async (response) => {
          if (response.length == 0) {
            await Simulator.create({ ...req.body })
              .then((data) => {
                res.status(responseCodes.SUCCESS).json({
                  response_code: 1,
                  message: "Simulator added successfully.",
                  data: "",
                });
              })
              .catch((err) => {
                res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: "Oops! " + err.message,
                  data: "",
                });
              });
          } else {
            res.status(responseCodes.BAD_REQUEST).json({
              response_code: 0,
              message: "Oops! Simulator with same name already exist",
              data: "",
            });
          }
        })
        .catch((err) => {
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: "Oops! " + err.message,
            data: "",
          });
        });
    } catch (err: any) {
      res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 0,
        message: "Oops! " + err.message,
        data: "",
      });
    }
  }

  async getSimulator(req: Request, res: Response) {
    try {
      req.body.created_at = responseStrings.currentTime;

      let where_condition={};
      if(req.body.company_id)
      {
        where_condition= {
          company_id: req.body.company_id,
          IsDeleted: 0,
        };
      }
      else
      {
        where_condition= {
          IsDeleted: 0,
        };
      }

      await Simulator.findAll({
        where: where_condition,
      })
        .then(async (response) => {
          if (response.length != 0) {
            res.status(responseCodes.SUCCESS).json({
              response_code: 1,
              message: "Simulator fetched  successfully.",
              data: response,
            });
          } else {
            res.status(responseCodes.SUCCESS).json({
              response_code: 0,
              message: "Oops! No Simulator found",
              data: [],
            });
          }
        })
        .catch((err) => {
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: "Oops! " + err.message,
            data: [],
          });
        });
    } catch (err: any) {
      res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 0,
        message: "Oops! " + err.message,
        data: [],
      });
    }
  }

  async editSimulator(req: Request, res: Response)
  {
    try {
      req.body.updatedAt = responseStrings.currentTime;

      await Simulator.findAll({
        where: {
          name: req.body.name,
          IsDeleted: 0,
        },
      })
        .then(async (response) => {
          if (response.length == 0) 
          {

            await Simulator.update({ ...req.body },{where:{id:req.body.simulator_id}})
              .then((data) => {
                res.status(responseCodes.SUCCESS).json({
                  response_code: 1,
                  message: "Simulator Updated successfully.",
                  data: "",
                });
              })
              .catch((err) => {
                res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: "Oops! " + err.message,
                  data: "",
                });
              });
          } else {
            res.status(responseCodes.BAD_REQUEST).json({
              response_code: 0,
              message: "Oops! Simulator with same name already exist",
              data: "",
            });
          }
        })
        .catch((err) => {
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: "Oops! " + err.message,
            data: "",
          });
        });
    } catch (err: any) {
      res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 0,
        message: "Oops! " + err.message,
        data: "",
      });
    }
  }

  async deleteSimulator(req: Request, res: Response)
  {
    try {
      req.body.deleteddAt = responseStrings.currentTime;

      var body={
        IsDeleted:1,
        deleted_by:req.body.deleted_by,
        deleteddAt:responseStrings.currentTime
      }
    
            await Simulator.update({...body },{where:{id:req.body.simulator_id}})
              .then((data) => {
                res.status(responseCodes.SUCCESS).json({
                  response_code: 1,
                  message: "Simulator Deleted successfully.",
                  data: "",
                });
              })
              .catch((err) => {
                res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: "Oops! " + err.message,
                  data: "",
                });
              });
         
    } catch (err: any) {
      res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 0,
        message: "Oops! " + err.message,
        data: "",
      });
    }
  }

  async get_company_simulator_list(req: Request, res: Response)
  {
    try {

      await Simulator.findAll({
        include:[{
          model:Trainer,
          required:false,
          where:{
            IsDeleted:0,
            IsBlock:0
          }
        }],
        where: { 
          company_id: req.body.company_id,
          IsDeleted: 0
        },
      })
        .then(async (response) => {
          if (response.length != 0) {
            res.status(responseCodes.SUCCESS).json({
              response_code: 1,
              message: "Simulator fetched  successfully.",
              data: response,
            });
          } else {
            res.status(responseCodes.SUCCESS).json({
              response_code: 0,
              message: "Oops! No Simulator found",
              data: [],
            });
          }
        })
        .catch((err) => {
          res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
            response_code: 0,
            message: "Oops! " + err.message,
            data: [],
          });
        });
    } catch (err: any) {
      res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
        response_code: 0,
        message: "Oops! " + err.message,
        data: [],
      });
    }
  }
  
  
}

export default new SimulatorController();
