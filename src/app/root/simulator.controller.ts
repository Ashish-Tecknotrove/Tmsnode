import { Request, Response } from "express";
import { Op } from "sequelize";
import Simulator from "../../model/root/simulator.model";
import Trainer from "../../model/root/trainer.model";
import responseCodes from "../../strings/response-codes";
import responseStrings from "../../strings/response-strings";

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

  async assignSimulator(req: Request, res: Response) {
    try {
     // req.body.updatedAt = responseStrings.currentTime;

      await Simulator.findAll({
        where: {
          id: req.body.simulator_id,
          [Op.or]:[{trainer_id:null},{trainer_id:""}],
          IsDeleted: 0,
        },
        logging:console.log
      }).then(async (response) => {
          if (response.length != 0) {

            var update_body={
              trainer_id:req.body.trainer_id,
              updatedAt:responseStrings.currentTime,
              updated_by:responseStrings.currentTime
            }

            await Simulator.update({ ...update_body },{where:{id:req.body.simulator_id}})
              .then((data) => {
                res.status(responseCodes.SUCCESS).json({
                  response_code: 1,
                  message: "Simulator Assigned Successfully.",
                  data: "",
                });
              })
              .catch((err) => {
                res.status(responseCodes.BAD_REQUEST).json({
                  response_code: 0,
                  message: "Oops! " + err.message,
                  data:"",
                });
              });
          } else {
            res.status(responseCodes.BAD_REQUEST).json({
              response_code: 0,
              message: "Oops! Simulator has been assigned to another trainer",
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

  async unassignSimulator(req: Request, res: Response) {
    try {
     // req.body.updatedAt = responseStrings.currentTime;

            var update_body={
              trainer_id:null,
              updatedAt:responseStrings.currentTime,
              updated_by:responseStrings.currentTime
            }

            await Simulator.update({ ...update_body },{where:{id:req.body.simulator_id}})
              .then((data) => {
                res.status(responseCodes.SUCCESS).json({
                  response_code: 1,
                  message: "Simulator Unassigned Successfully.",
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
