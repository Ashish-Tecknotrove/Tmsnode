import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');

const readXlsxFile = require("read-excel-file/node");

import Trainee from "../../../../core/model/root/trainee.model";
import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import Subscription from "../../../../core/model/root/subscription.model";
import Users from "../../../../core/model/root/users.model";
import CompanyDepartment from "../../../../core/model/root/company_department.model";
import MasterDepartment from "../../../../core/model/root/master_department.model";
import SubCompany from "../../../../core/model/root/subcompany.model";
import Curriculum from "../../../../core/model/root/curriculum.model";
import Assign_trainee_to_trainer from "../../../../core/model/root/assign_trainee_to_trainer.model";
import Languages from "../../../../core/model/language/language.model";
import TechnologyCategory from "../../../../core/model/root/technology.model";
import { Op } from "sequelize";
import TraineeCustomizeFormModel from "../../../../core/model/root/traineeFormCustomize.model";
import TraineeFormMasterModel from "../../../../core/model/root/traineeFormMaster.model";
import moment = require("moment");



class TraineeController {


    async bulkInsertTrainee(req: Request, res: Response) {
      
        try {

            const company_id=req.body.company_id;
            const course_json=req.body.curriculum;
            const langauge_id=req.body.language_id;
            const csv_file = req.file?.filename;

            await TraineeCustomizeFormModel.findAll({
                include:TraineeFormMasterModel,
                attributes:["id","company_id","form_master_id","isValidate","isUsed"],
                where:{
                    company_id:company_id
                }
            }).then(async(formData:any)=>
            {
                if(formData.length != 0)
                {
                    let trainees =Array();

                    
                    var path="./resources/csv/"+ csv_file;

                    readXlsxFile(path).then((rows:any) => {
                        // skip header
                        rows.shift();
                        console.log("Row Length :- "+rows.length);
                       
                        rows.forEach((row:any) => {

                        let trainee = {
                        id: row[0],
                        title: row[1],
                        description: row[2],
                        published: row[3],
                        };
                        trainees.push(trainee);
                    });

                    console.log(trainees);
            });




            res.status(responseCodes.SUCCESS).json({response_code: 1, message: csv_file});
                }
                else
                {
                    res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Oops! Invalid Company Id or Form not generated please contact administrator."});
                }

            }).catch(err=>{

                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
            });
           

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
        }
    }

    async getTraineeCount(req: Request, res: Response) {
        try {
            await Trainee.count({
                where: {
                    company_id: req.body.company_id,
                    IsDeleted: 0
                },

            }).then(data => {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: "Trainee count fetched successfully.",
                    count: data
                });

            }).catch(err => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
            });
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
        }


    }

    async registerNewTrainee(req: Request, res: Response) {
        try {

            var curriculum_id_json=JSON.parse(req.body.curriculum_id);

            var curriculum_count=curriculum_id_json.length;
            var license_number_valid=0;
            for(let i=0;i<curriculum_id_json.length;i++)
            {
                var curriculum=curriculum_id_json[i]['curriculum_id']
                var company_id=req.body.company_id;

                await Trainee.count({
                    include:[{
                        model:TraineeCurriculum,
                        where:{
                            trainee_id:sequelize.col("Trainee.id"),
                            curriculum_id:curriculum
                        },
                    }],
                    where:{company_id:company_id},
                    group:["TraineeCurriculums.trainee_id","TraineeCurriculums.curriculum_id"],
                    //logging:console.log
                }).then(async (Totalcount:any)=>
                {
                    var count=Totalcount.length;
                    //console.log(count.length);
                    await Subscription.findOne({
                        where:{
                            curriculum_id:curriculum
                        }
                    }).then((sub:any)=>
                    {
                        if (sub["licence_no"] <= count && sub['licenceType'] == 0) {
                            license_number_valid++;
                        }

                    }).catch(err=>{

                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
                    });
                    
                }).catch(err=>
                {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

                });
            }

            if(license_number_valid == 0)
            {
                 //!TODO Check Trainee Exist In Trainee Table

                  //!TODO Check Trainee Exist In Trainee Table
            let check_trainee_exits = await Trainee.findAll({
                where:
                    {
                        email: req.body.email,
                        IsDeleted: 0
                    }
            });

            //!TODO Check Trainee login Exist In User Table
            let check_trainee_login_exist = await Users.findAll({
                where:
                    {
                        email: req.body.email,
                        IsDeleted: 0
                    }
            });

            //**IF No */
            if (check_trainee_exits.length == 0 && check_trainee_login_exist.length == 0) {
                //* Create Trainee Crediantails
                req.body.createdAt = responseStrings.currentTime;

                await Trainee.create({...req.body}).then(traineeData => {
                    var user_login_body =
                        {
                            company_id: req.body.company_id,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 4,
                            language: req.body.language,
                            portal_language:req.body.language,
                            createdAt: responseStrings.currentTime,
                            updated_by: "",
                            updatedAt: '',
                            created_by: req.body.created_by
                        };

                    //**On Success create User Login */
                    Users.create({...user_login_body}).then(async userData => {

                        var companyId=req.body.company_id;
                        var enrollmentId="REG/"+companyId+"/"+traineeData['id']+"/"+moment().format("Y");

                        const updateId = {
                            login_table_id: userData["id"],
                            enrollmentId:enrollmentId
                        };

                        //*ADD CURRICULUM IN CURRICULUM TABLE

                        for(let i=0;i<curriculum_id_json.length;i++)
                        {
                            var data={
                                trainee_id:traineeData['id'],
                                trainee_user_id:userData['id'],
                                curriculum_id:curriculum_id_json[i]['curriculum_id'],
                                technology_id:curriculum_id_json[i]['technology_id'],
                                language_id:req.body.language,
                                created_by:req.body.created_by,
                                createdAt:responseStrings.currentTime
                            }

                            await TraineeCurriculum.create({...data}).then(data=>
                            {
                                console.log("done");
                            }).catch(err=>
                            {
                                console.log("Oops! "+err.message);
                            });
                        }


                        //**update the login id in Trainee Table */
                        Trainee.update({...updateId}, {where: {id: traineeData['id']}}).then(success => {

                            res.status(responseCodes.SUCCESS).json({
                                response_code: 1,
                                message: "The Trainee have been registered successfully."
                            });

                        }).catch(err => {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({message: "Oops! "+err.message});
                        });


                    }).catch(err => {

                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

                    });


                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
                });
            }
            //TODO If Trainee exist in trainee table but login not ceated 
            else if (check_trainee_exits.length != 0 && check_trainee_login_exist.length == 0) {

                var user_login_body =
                    {
                        company_id: req.body.company_id,
                        email: req.body.email,
                        password: req.body.password,
                        user_type: 3,
                        language: req.body.language,
                        created_by: req.body.created_by,
                        updated_by: "",
                        createdAt: responseStrings.currentTime,
                        updatedAt: "",

                    };

                //**Create User Login */
                Users.create({...user_login_body}).then(userData => {
                    const updateId = {
                        login_table_id: userData["id"],
                    };

                    //**update the login id in Trainee Table */
                    Trainee.update({...updateId}, {where: {id: check_trainee_exits[0]['id']}}).then(success => {

                        res.status(responseCodes.SUCCESS).json({
                            response_code: 1,
                            message: "The Trainee have been registered successfully."
                        });

                    }).catch(err => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0,message: "Oops! "+err.message});
                    })

                    //res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Trainee Already Exits \n But Login Crediantial Not Found \n Login Crediantial Created" });

                }).catch(err => {

                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

                });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Oops! Email of trainee already exists, please use another one"
                });
            }
            }
            else
            {
                if(curriculum_id_json.length > 1)
                {
                    res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Ooops! One or both of your selected subscription has been max out their limit"});
                }   
                else
                {
                    res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Ooops! Your selected subscription has been max out their limit"});
                }
                
            }



        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
        }
    }

    async getTrainee(req: Request, res: Response) {
        try {
            const company_id = req.body.company_id;

            var where_condition = {};

            if (req.body.sub_company_id && req.body.department_id) {
                where_condition = {
                    company_id: req.body.company_id,
                    sub_company_id: req.body.sub_company_id,
                    department_id: req.body.department_id,
                    // IsBlock:0,
                    IsDeleted: 0
                }
            } else if (req.body.sub_company_id) {
                where_condition = {
                    company_id: req.body.company_id,
                    sub_company_id: req.body.sub_company_id,
                    // IsBlock:0,
                    IsDeleted: 0
                }
            } else if (req.body.department_id) {
                where_condition = {
                    company_id: req.body.company_id,
                    department_id: req.body.department_id,
                    // IsBlock:0,
                    IsDeleted: 0
                }
            } else {
                where_condition = {
                    company_id: req.body.company_id,
                    // IsBlock:0,
                    IsDeleted: 0
                }
            }

            await Trainee.findAll({
                include:[{
                    model:CompanyDepartment,
                    include:[{
                        model:MasterDepartment,
                        where:{
                            IsDeleted: 0
                        },
                    required:false,
                        attributes: ['id', 'company_id', 'name', 'descripition']
                    }],
                    where:{
                        IsDeleted: 0
                    },
                    required: false,
                    attributes:['id','company_id','sub_company_id','department_id','name']
                },{
                    model:SubCompany,
                    where:{
                        IsDeleted: 0
                    },
                    required:false,
                    attributes:['id','company_id','name','description','designation']
                }],
                where: where_condition
            }).then(success => {

            // await Trainee.findAll({where:where_condition}).then(success=>
            // {

                if (success.length != 0) {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: 'Trainee have been fetched successfully.',
                        data: success
                    });
                } else {
                    res.status(responseCodes.SUCCESS).json({response_code: 0, 
                        message: 'No trainee were found.',data:success});

                }

            }).catch(err => {

                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

            });

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

        }
    }

    async updateTraineeDetails(req: Request, res: Response) {
        try {
            //** Check Trainee Id Exist */
            const trainee_id = req.body.trainee_id;

            const trainee_exist = await Trainee.findAll({
                where: {
                    id: trainee_id,
                    IsDeleted: 0
                }
            });

            //** If trainee Exist*/
            if (trainee_id.length != 0) {
                req.body.updatedAt = responseStrings.currentTime;
                //* Updated Trainee Table
                await Trainee.update({...req.body}, {where: {id: trainee_id}}).then(success => {

                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "The Trainee have been update successfully."
                    });

                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

                });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Oops! An invalid trainee ID was entered, or this trainee was already deleted"});
            }
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
        };
    }

    async deleteTrainee(req: Request, res: Response) {
        try {
            //** Check Trainee Id Exist */
            const trainee_id = req.body.trainee_id;

            const trainee_exist = await Trainee.findAll({
                where: {
                    id: trainee_id,
                    IsDeleted: 0
                }
            });

            //** If trainee Exist*/
            if (trainee_exist.length != 0) {
                const delete_trainee_data = {
                    deleted_by: req.body.deleted_by,
                    deletedAt: responseStrings.currentTime,
                    IsDeleted: 1
                };
                //* Updated Trainee Table
                await Trainee.update({...delete_trainee_data}, {where: {id: trainee_id}}).then(success => {
                    const delete_user_data = {
                        deleted_by: req.body.deleted_by,
                        deletedAt: responseStrings.currentTime,
                        IsDeleted: 1
                    };

                    //** update User Table*/
                    Users.update({...delete_user_data}, {where: {id: trainee_exist[0]['login_table_id']}}).then(succ => {

                        res.status(responseCodes.SUCCESS).json({
                            response_code: 1,
                            message: "The Trainee have been deleted successfully."
                        });

                    }).catch(err => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

                    });

                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

                });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Oops! An invalid trainee ID was entered, or this trainee was already deleted"
                });
            }
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
        }
        ;
    }

    async blockTrainee(req: Request, res: Response) {
        try {
            //** Check Trainee Id Exist */
            const trainee_id = req.body.trainee_id;

            const trainee_exist = await Trainee.findAll({
                where: {
                    id: trainee_id,
                    IsDeleted: 0
                }
            });

            //** If trainee Exist */
            if (trainee_exist.length != 0) {
                let block_trainee_data = {
                        updated_by: req.body.updated_by,
                        updatedAt: responseStrings.currentTime,
                    IsBlock: (trainee_exist[0]['IsBlock'] == "1" ? 0 : 1)
                    };
                let message = '';
                if (trainee_exist[0]['IsBlock'] == "1") {
                    message = "Trainee Unblocked Successfully.";
                }

                if (trainee_exist[0]['IsBlock'] == "0") {
                    message = "The Trainee have been blocked.";
                }

                //* Updated Trainee Table
                await Trainee.update({...block_trainee_data}, {where: {id: trainee_id}}).then(success => {
                    const block_user_data = {
                        deleted_by: req.body.deleted_by,
                        deletedAt: responseStrings.currentTime,
                        IsBlock: (trainee_exist[0]['IsBlock'] == "1" ? 0 : 1)
                    };

                    //** update User Table*/
                    Users.update({...block_user_data}, {where: {id: trainee_exist[0]['login_table_id']}}).then(succ => {

                        res.status(responseCodes.SUCCESS).json({response_code: 1, message: message});

                    }).catch(err => {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

                    });

                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

                });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Oops! An invalid trainee ID was entered, or this trainee was already deleted"
                });
            }
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
        };
    }

    async getUnassignedTrainee(req: Request, res: Response) {
        try {
            await Trainee.findAll(
                {
                    include:[{
                        model:TraineeCurriculum,
                        include:[{
                            model:Curriculum
                        }],
                        where:{
                            IsDeleted:0
                        }
                    }],
                    where: {
                    company_id: req.body.company_id,
                    // IsBlock:0,
                    IsDeleted: 0,
                    IsBlock:0,
                    [Op.or]:[{trainer_id: 0},{trainer_id:null}]
                },
                order:[['id','DESC']]
            }).then((success:any) => {

                if (success.length != 0) {

                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: 'Trainee Get Successfully.',
                        data: success
                    });
                } else {
                    res.status(responseCodes.SUCCESS).json({response_code: 0, message: 'No trainee found',data: []});

                }

            }).catch(err => {

                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });

                });

        } catch (err: any) {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

        }
    }

    async get_trainee_assigned_to_trainer_and_not_assigned(req: Request, res: Response) {
        try {
            await Trainee.findAll(
                {
                    include: [{
                        model: TraineeCurriculum,
                        include: [{
                            model: Curriculum,
                            attributes: ['id', 'company_id', 'name'],
                        }],
                        attributes: ['id', 'trainee_id', 'curriculum_id', 'technology_id'],
                        where: {
                            IsDeleted: 0
                        },
                    }],
                    attributes: ['id', 'enrollmentId', 'company_id', 'first_name', 'middle_name', 'last_name', 'email', 'contact', 'trainer_id'],
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0,
                        IsBlock: 0,
                        [Op.or]: [{ trainer_id: 0 }, { trainer_id: null }, { trainer_id: req.body.trainer_id }]
                    },
                    order: [['id', 'DESC']]
                }).then((result: any) => {

                    if (result.length != 0) {

                        for (let i = 0; i < result.length; i++) {

                            if (result[i]["trainer_id"] == 0 || result[i]["trainer_id"] == null) {
                                result[i]["dataValues"]["assign"] = false;
                            }
                            else {
                                result[i]["dataValues"]["assign"] = true;
                            }
                        }

                        res.status(responseCodes.SUCCESS).json({
                            response_code: 1,
                            message: 'Trainee Get Successfully.',
                            data: result
            });
                    } else {
                        res.status(responseCodes.SUCCESS).json({ response_code: 0, message: 'No trainee found', data: [] });

                    }

                }).catch(err => {

                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });

                });
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

        }
    }

    //!TODO FUNCTION USED TO GET ASSIGN TRAINEE TO TRAINER 
    async getAssignTraineeOfTrainer(req: Request, res: Response) {
        try {
            await Assign_trainee_to_trainer.findAll({
                include: [{
                    model: Trainee,
                    required: false,
                    where: {
                        IsDeleted: 0,
                    },
                    include: [{
                        model: Users,
                        required: false,
                        where: {
                            IsDeleted: 0,
                        },
                        include: [{
                        model: Languages,
                            required: false,
                            as: "TraineeLanguage",
                        where: {
                            IsDeleted: 0,
                            },
                            attributes: ['id', 'name']
                        }, {
                            model: Languages,
                            required: false,
                            as: "portalLanguage",
                            where: {
                                IsDeleted: 0,
                            },
                            attributes: ['id', 'name']
                        }],
                        attributes: ['id', 'company_id', 'email', 'aadhar_no', 'mobile_no', 'user_type', 'language', 'portal_language']
                    }, {
                        model: TraineeCurriculum,
                        required: false,
                        where: {
                            IsDeleted: 0,
                        },
                        attributes: ['id', 'trainee_id', 'trainee_user_id', 'curriculum_id']
                    }],
                    attributes: ['id', 'first_name', 'middle_name', 'last_name', 'email', 'contact', 'address', 'city', 'trainer_id']
                }],
                where: {
                    IsDeleted: 0,
                    trainer_id: req.body.trainer_id
                }
            }).then((result: any) => {
                res.status(responseCodes.SUCCESS).json({response_code: 1, message: 'Get Assign Trainee', data: result});
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});

        }
    }


    async getAssignTraineeToTrainer(req: Request, res: Response) {
        try {
            await Trainee.findAll({
                    include: [{
                        model: Users,
                        required: false,
                        where: {
                            IsDeleted: 0,
                        IsBlock:0
                        },
                        attributes: ['id', 'company_id', 'email', 'aadhar_no', 'mobile_no', 'user_type', 'language', 'portal_language']
                    }],
                where: {
                    IsDeleted: 0,
                    trainer_id: req.body.trainer_id,
                    IsBlock:0
                },
                attributes: ['id', 'first_name', 'middle_name', 'last_name', 'email', 'contact', 'address', 'city', 'trainer_id']
            }).then((result: any) => {
                res.status(responseCodes.SUCCESS).json({response_code: 1, message: 'Get Assign Trainee', data: result});
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});

        }
    }

    async getAssignTraineeCurriculum(req: Request, res: Response) {
        try {
            await TraineeCurriculum.findAll({
                include: [
                    {
                        model: Curriculum,
                        where: {
                            IsDeleted: 0
                        },
                        attributes: ['id', 'company_id', 'name']
                    }
                ],
                where: {
                    IsDeleted: 0,
                    trainee_id: req.body.trainee_id
                },
                group: ['curriculum_id'],
                attributes: ['id', 'trainee_id', 'trainee_user_id', 'curriculum_id','technology_id']
            }).then((result: any) => {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: 'Get Trainee Assign Curriculum',
                    data: result
                });
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            })
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

        }
    }

    //! THIS API USE IN TRAINEE DASHBOARD 
    async getTechnologiesAllotedToTrainee(req: Request, res: Response)
    {
        try{
            await TraineeCurriculum.findAll({
                include:[{
                    model:TechnologyCategory,
                    attributes:['id','name'],
                    where:{IsDeleted:0}
                }],
                where:{
                  trainee_id:req.body.trainee_id,
                  IsBlock:0,
                  IsDeleted:0
                },
                attributes:['TechnologyCategory.name'],
                group:['TraineeCurriculum.technology_id']
              }).then((techData:any)=>
              {
                  if(techData.length !=0)
                  {
                    res
                    .status(responseCodes.SUCCESS)
                    .json({ response_code: 1, message:"Technologies Loaded",data:techData});
                  }
                  else
                  {
                    res
                    .status(responseCodes.SUCCESS)
                    .json({ response_code: 0, message:  "Oops! no curriculum has been alloted to you."});
                  }
                
              },err=>{
                res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message:  "Oops! "+ err.message });
              });
        }
        catch(err:any){
            res.status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message:  "Oops! "+ err.message });
            }
    }

    async registerNewTrainee_for_loop(req: Request, res: Response) {

        var enrollmentId="REG/"+"6"+"/"+"12"+"/"+moment().format("Y");
    res.status(responseCodes.SUCCESS).json({response_code: 0, message: enrollmentId});
        
        
        // try {

        //     for(let l=87;l<=1000;l++)
        //     {
        //         req.body.company_id= 2;
        //         req.body.email= "trainee.daimler"+l+"@gmail.com";
        //         req.body.first_name= "Trainee Daimler " + l +" Demo";
        //         req.body.password= "123";
        //         req.body.language= "1";
        //         req.body.created_by= 2;

        //         var curriculum_id_json=JSON.parse(req.body.curriculum_id);

        //     var curriculum_count=curriculum_id_json.length;
        //     var license_number_valid=0;
        //     for(let i=0;i<curriculum_id_json.length;i++)
        //     {
        //         var curriculum=curriculum_id_json[i]['curriculum_id']
        //         var company_id=req.body.company_id;

        //         await Trainee.count({
        //             include:[{
        //                 model:TraineeCurriculum,
        //                 where:{
        //                     trainee_id:sequelize.col("Trainee.id"),
        //                     curriculum_id:curriculum
        //                 },
        //             }],
        //             where:{company_id:company_id},
        //             group:["TraineeCurriculums.trainee_id","TraineeCurriculums.curriculum_id"],
        //             //logging:console.log
        //         }).then(async (Totalcount:any)=>
        //         {
        //             var count=Totalcount.length;
        //             //console.log(count.length);
        //             await Subscription.findOne({
        //                 where:{
        //                     curriculum_id:curriculum
        //                 }
        //             }).then((sub:any)=>
        //             {
        //                 if(sub["licence_no"] <= count)
        //                 {
        //                     license_number_valid++;
        //                 }

        //             }).catch(err=>{

        //                 res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
        //             });
                    
        //         }).catch(err=>
        //         {
        //             res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

        //         });
        //     }

        //     if(license_number_valid == 0)
        //     {
        //          //!TODO Check Trainee Exist In Trainee Table

        //           //!TODO Check Trainee Exist In Trainee Table
        //     let check_trainee_exits = await Trainee.findAll({
        //         where:
        //             {
        //                 email: req.body.email,
        //                 IsDeleted: 0
        //             }
        //     });

        //     //!TODO Check Trainee login Exist In User Table
        //     let check_trainee_login_exist = await Users.findAll({
        //         where:
        //             {
        //                 email: req.body.email,
        //                 IsDeleted: 0
        //             }
        //     });

        //     //**IF No */
        //     if (check_trainee_exits.length == 0 && check_trainee_login_exist.length == 0) {
        //         //* Create Trainee Crediantails
        //         req.body.createdAt = responseStrings.currentTime;

        //         await Trainee.create({...req.body}).then(traineeData => {
        //             var user_login_body =
        //                 {
        //                     company_id: req.body.company_id,
        //                     email: req.body.email,
        //                     password: req.body.password,
        //                     user_type: 4,
        //                     language: req.body.language,
        //                     portal_language:req.body.language,
        //                     createdAt: responseStrings.currentTime,
        //                     updated_by: "",
        //                     updatedAt: '',
        //                     created_by: req.body.created_by
        //                 };

        //             //**On Success create User Login */
        //             Users.create({...user_login_body}).then(async userData => {

        //                 const updateId = {
        //                     login_table_id: userData["id"],
        //                 };

        //                 //*ADD CURRICULUM IN CURRICULUM TABLE

        //                 for(let i=0;i<curriculum_id_json.length;i++)
        //                 {
        //                     var data={
        //                         trainee_id:traineeData['id'],
        //                         trainee_user_id:userData['id'],
        //                         curriculum_id:curriculum_id_json[i]['curriculum_id'],
        //                         technology_id:curriculum_id_json[i]['technology_id'],
        //                         language_id:req.body.language_id,
        //                         created_by:req.body.created_by,
        //                         createdAt:responseStrings.currentTime
        //                     }

        //                     await TraineeCurriculum.create({...data}).then(data=>
        //                     {
        //                         console.log("Curriculum Build");
        //                     }).catch(err=>
        //                     {
        //                         console.log("Oops! "+err.message);
        //                     });
        //                 }


        //                 //**update the login id in Trainee Table */
        //                 Trainee.update({...updateId}, {where: {id: traineeData['id']}}).then(success => {

        //                     // res.status(responseCodes.SUCCESS).json({
        //                     //     response_code: 1,
        //                     //     message: "The Trainee have been registered successfully."
        //                     // });

        //                     console.log(l);

        //                 }).catch(err => {
        //                     res.status(responseCodes.INTERNAL_SERVER_ERROR).json({message: "Oops! "+err.message});
        //                 });


        //             }).catch(err => {

        //                 res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

        //             });


        //         }).catch(err => {
        //             res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});
        //         });
        //     }
        //     //TODO If Trainee exist in trainee table but login not ceated 
        //     else if (check_trainee_exits.length != 0 && check_trainee_login_exist.length == 0) {

        //         var user_login_body =
        //             {
        //                 company_id: req.body.company_id,
        //                 email: req.body.email,
        //                 password: req.body.password,
        //                 user_type: 3,
        //                 language: req.body.language,
        //                 created_by: req.body.created_by,
        //                 updated_by: "",
        //                 createdAt: responseStrings.currentTime,
        //                 updatedAt: "",

        //             };

        //         //**Create User Login */
        //         Users.create({...user_login_body}).then(userData => {
        //             const updateId = {
        //                 login_table_id: userData["id"],
        //             };

        //             //**update the login id in Trainee Table */
        //             Trainee.update({...updateId}, {where: {id: check_trainee_exits[0]['id']}}).then(success => {

        //                 // res.status(responseCodes.SUCCESS).json({
        //                 //     response_code: 1,
        //                 //     message: "The Trainee have been registered successfully."
        //                 // });

        //             }).catch(err => {
        //                 res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0,message: "Oops! "+err.message});
        //             })

        //             //res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Trainee Already Exits \n But Login Crediantial Not Found \n Login Crediantial Created" });

        //         }).catch(err => {

        //             res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! "+err.message});

        //         });
        //     } else {
        //         // res.status(responseCodes.BAD_REQUEST).json({
        //         //     response_code: 0,
        //         //     message: "Oops! Email of trainee already exists, please use another one"
        //         // });

        //         console.log("Trainee Exist")
        //     }
        //     }
        //     else
        //     {
        //         if(curriculum_id_json.length > 1)
        //         {
        //             res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Ooops! One or both of your selected subscription has been max out their limit"});
        //         }   
        //         else
        //         {
        //             res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: "Ooops! Your selected subscription has been max out their limit"});
        //         }
                
        //     }

        // }

            


        // } catch (err: any) {
           // }
    }

    async get_trainee_customize_form(req: Request, res: Response) {
        var company_id = req.body.company_id;

        await TraineeCustomizeFormModel.findAll({
            include: {
                required: true,
                model: TraineeFormMasterModel,
                attributes: ['id', 'form_label', 'form_field'],
                where: {
                    isDeleted: 0
                },
            },
            attributes: ['id', 'isValidate'],
            where: {
                company_id: company_id,
                isDeleted: 0,
                isUsed: '1'
            },
            //logging:console.log
        }).then(result => {
            if (result.length != 0) {
                const initialValue = {};

                let fromLabel = result.reduce((obj: any, item: { [x: string]: any; }) => {

                    let ObjData = {
                        id: item['id'],
                        isValidate: item['isValidate'],
                        form_id: item['TraineeFormMasterModel']['form_field']
                    };

                    return {
                        ...obj,
                        [item['TraineeFormMasterModel']['form_label']]: ObjData,
                    };
                }, initialValue);
                res.status(responseCodes.SUCCESS).json({response_code: 0, message: "Form Loading...", form: fromLabel});
            } else {
                res.status(responseCodes.SUCCESS).json({response_code: 0, message: "No Customize form Found"});
            }
        }).catch(err => {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message});
        });

    }

}

export default new TraineeController();
