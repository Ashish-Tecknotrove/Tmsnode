import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');
import moment from "moment";


import Company from "../../../../core/model/root/company.model";
import TraineeFormMasterModel from "../../../../core/model/root/traineeFormMaster.model";
import MasterPanel from "../../../../core/model/root/masterpanel.model";
import CompanyUser from "../../../../core/model/root/compayuser.model";
import Subscription from "../../../../core/model/root/subscription.model";
import Curriculum from "../../../../core/model/root/curriculum.model";
import Countries from "../../../../core/model/resources/countries.model";
import States from "../../../../core/model/resources/states.model";
import Cities from "../../../../core/model/resources/cities.model";
import Users from "../../../../core/model/root/users.model";
import TraineeCustomizeFormModel from "../../../../core/model/root/traineeFormCustomize.model";
import Trainee from "../../../../core/model/root/trainee.model";
import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import SubCompany from "../../../../core/model/root/subcompany.model";
import CurriculumBuilder from "../../../../core/model/root/curriculumbuilder.model";
import ElearningResult from "../../../../core/model/elearning/eLearningresult.model";
import CompanyDepartment from "../../../../core/model/root/company_department.model";
import MasterDepartment from "../../../../core/model/root/master_department.model";
import Trainer from "../../../../core/model/root/trainer.model";



class CompanyController {

    async get_company_details_by_id(req: Request, res: Response) {

        try {

            await Company.findOne({
                include: [
                    {
                        model: CompanyUser,
                        attributes: ['id', 'name', 'designation', 'mobile_no', 'canlogin'],
                        where: {
                            IsDeleted: 0
                        },
                        required: false
                    },
                    {
                        model: Subscription,
                        include: [{
                            model: Curriculum,
                            attributes: ['id', 'name'],
                            where: {
                                IsDeleted: 0
                            },
                            required: false
                        }],
                        where: {
                            IsDeleted: 0,
                            company_id: req.body.company_id
                        },
                        required: false
                    },
                    {
                        model: MasterPanel,
                        attributes: ['panel']
                    },
                    {
                        model: Countries,
                        attributes: ['title', 'slug'],
                        required: false
                    },
                    {
                        model: States,
                        attributes: ['title', 'slug'],
                        required: false
                    },
                    {
                        model: Cities,
                        attributes: ['title', 'slug'],
                        required: false
                    }
                ],
                //logging: console.log,
                where: {
                    id: req.body.company_id,
                    IsDeleted: 0
                }
            }).then((result: any) => {

                if (result != null) {

                    let logo = new URL(req.protocol + '://' + req.get('host')) + "resources/company_logo/" + result['picture'];
                    res
                        .status(responseCodes.SUCCESS)
                        .json({
                            response_code: 1,
                            logo: logo,
                            message: responseStrings.GET,
                            data: result,
                        });
                } else {
                    res
                        .status(responseCodes.SUCCESS)
                        .json({response_code: 0, message: "No data were found."});
                }
            })
        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({response_code: 0, message: "Oops! " + err.message});
        }
    }

    async add_company_login(req: Request, res: Response) {
        try {
            //Table Fields for Company Contac
            req.body.canlogin = 1;
            req.body.updated_by = "";
            req.body.createdAt = responseStrings.currentTime;

            const checkemailExist = await CompanyUser.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0
                }
            });

            const checkemailExist_in_user_table = await Users.findAll({
                where: {
                    email: req.body.email,
                    IsDeleted: 0
                }
            })

            if (checkemailExist.length == 0 && checkemailExist_in_user_table.length == 0) {

                await CompanyUser.create({...req.body})
                    .then((userdata) => {
                        //Add login in User table
                        const userLoginData = {
                            company_id: req.body.company_id,
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 2,
                            language: 1,
                            createdAt: responseStrings.currentTime,
                            created_by: req.body.created_by,
                            updated_by: "",
                        };

                        Users.create({...userLoginData})
                            .then((data) => {
                                const updateId = {
                                    login_table_id: data["id"],
                                };
                                CompanyUser.update(
                                    {...updateId},
                                    {where: {id: userdata["id"]}}
                                ).catch((err: any) => {
                                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({message: "Oops! " + err.message});
                                });

                                res.status(responseCodes.SUCCESS).json({
                                    response_code: 1,
                                    message: "Added company user successfully, and login created"
                                });
                                responseCodes;
                            })
                            .catch(function (err: any) {
                                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err.message
                                });
                            });
                    })
                    .catch(function (err: any) {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: "Oops! Another user with this email already exists"
                });
            }


        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async updated_company_user(req: Request, res: Response) {
        try {
            let user_id = req.body.user_id;

            let check_company_user_is_valid = await CompanyUser.findOne({
                where: {
                    id: user_id,
                    IsDeleted: 0,
                }
            }).catch((err: any) => {
                res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({response_code: 0, message: "Oops! " + err.message});
            });

            if (check_company_user_is_valid != null) {

                req.body.updatedAt = responseStrings.currentTime;
                const user_login_id = check_company_user_is_valid['login_table_id'];

                await CompanyUser.update({...req.body}, {where: {id: user_id}})
                    .then(function (data) {

                        const user_table_update = {
                            name: req.body.name,
                            email: req.body.email,
                            mobile_no: req.body.mobile_no,
                            password: req.body.password,
                            designation: req.body.designation,
                            updated_by: req.body.updated_by,
                            updatedAt: responseStrings.currentTime
                        };

                        Users.update(user_table_update, {where: {id: user_login_id}}).then(function (data) {
                            res
                                .status(responseCodes.SUCCESS)
                                .json({response_code: 1, message: "Company user updated successfully."});
                        }).catch((err: any) => {
                            res
                                .status(responseCodes.INTERNAL_SERVER_ERROR)
                                .json({response_code: 0, message: "Oops! " + err.message});
                        });

                    })
                    .catch(function (err: any) {
                        res
                            .status(responseCodes.INTERNAL_SERVER_ERROR)
                            .json({response_code: 0, message: "Oops! " + err.message});
                    });
            } else {
                res
                    .status(responseCodes.BAD_REQUEST)
                    .json({
                        response_code: 0,
                        message: "Oops! An invalid company user ID was entered, or this user was already deleted",
                    });
            }
        } catch (error: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async get_company_user(req: Request, res: Response) {

        try {
            const company_id = req.body.company_id;

            const company_user_data = await CompanyUser.findAll({
                include: [
                    {
                        model: Users,
                    }
                ],
                where: {
                    company_id: company_id,
                    canlogin: 1,
                    IsDeleted: 0,
                },
            }).catch((err: any) => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            });

            if (company_user_data) {
                res
                    .status(responseCodes.SUCCESS)
                    .json({
                        response_code: 1,
                        message: "data have been fetched successfully.",
                        data: company_user_data,
                    });
            } else {
                res.status(responseCodes.SUCCESS).json({response_code: 0, message: "No data were found."});
            }
        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + error.message});
        }

    }

    async delete_company_user(req: Request, res: Response) {
        try {
            const user_id = req.body.user_id;

            const UserData = await CompanyUser.findOne({
                where: {
                    id: user_id,
                    IsDeleted: 0
                }
            });

            if (UserData != null) {
                //* This Array has been used to update two table check before any change
                let updateData = {
                    IsDeleted: 1,
                    deleted_by: req.body.deleted_by,
                    deletedAt: responseStrings.currentTime
                };

                //! Delete the User from Company Contacts table
                await CompanyUser.update({...updateData}, {where: {id: user_id}})
                    .then(function (data) {
                        //! Delete the User from user table
                        const login_table_id = UserData['login_table_id'];

                        Users.update({...updateData}, {where: {id: login_table_id}}).then(function (data) {
                            res.status(responseCodes.SUCCESS)
                                .json({
                                    response_code: 1,
                                    message: "Company user deleted successfully.",
                                });
                        }).catch(function (err: any) {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });


                    })
                    .catch(function (err: any) {
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
            } else {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 0,
                    message: "Oops! An invalid company user ID was entered, or this user was already deleted"
                });

            }


        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + error.message});
        }

    }

  


    async get_company_card1_data(req: Request, res: Response) {
        try {

            const TraineesData = await Trainee.findAll({
                where: {
                    company_id: req.body.company_id,
                    IsDeleted: 0,
                    IsBlock: 0
                }
            });

            let currentMonth = moment().format("YYYY-MM");
            let currentMonthText = moment().format("MMMM");
            let currentYearText = moment().format("YYYY");

            if (TraineesData.length != 0) {

                let TraineeCurrentMonth = TraineesData.filter((element) => {


                    var elementMonth = moment(element['createdAt'], "YYYY-MM-DD").format("YYYY-MM");

                    if (currentMonth == elementMonth) {
                        return element
                    }
                })

                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: responseStrings.GET,
                    currentYearText: currentYearText,
                    currentMonthText: currentMonthText,
                    currentMonthTraineesCount: TraineeCurrentMonth.length,
                    allTraineesCount: TraineesData.length
                });

            } else {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 0,
                    message: "Oops! Trainees not register yet.",
                    currentYearText: currentYearText,
                    currentMonthText: currentMonthText,
                    currentMonthTraineesCount: 0,
                    allTraineesCount: 0
                });

            }
        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async get_company_card2_data(req: Request, res: Response) {
        try {

            let where = {};

            if (req.body.trainer_id) {
                where = {
                    IsDeleted: 0,
                    company_id: req.body.company_id,
                    trainer_id: req.body.trainer_id
                }
            } else {
                where = {
                    company_id: req.body.company_id,
                    IsDeleted: 0
                }
            }

            const TraineesData = await Trainee.findAll({
                include: [
                    {
                        model: TraineeCurriculum,
                        where: {
                            IsDeleted: 0
                        }
                    }
                ],
                where: where
            });

            if (TraineesData.length != 0) {

                //Get Block Trainees Filter
                let BlockTrainees = TraineesData.filter((element) => {
                    if (element['IsBlock'] == "1") {
                        return element
                    }
                });

                //Get Unblock Trainees Filter
                let UnBlockTrainees: any = TraineesData.filter((element) => {
                    if (element['IsBlock'] == "0") {
                        return element
                    }
                });


                let YetToStart = 0;
                let Completed = 0;
                let InProgress = 0;


                for (let i = 0; i < UnBlockTrainees.length; i++) {

                    let TraineeCurriculums = UnBlockTrainees[i]['dataValues']['TraineeCurriculums'];
                    let TotalCurriculum = TraineeCurriculums.length;
                    let CurriculumNotAttempt = 0;
                    let CurriculumAttempt = 0;
                    let CurriculumPass = 0;

                    for (let j = 0; j < TraineeCurriculums.length; j++) {

                        await CurriculumBuilder.findAll({
                            where: {
                                curriculum_id: TraineeCurriculums[j]['dataValues']['curriculum_id'],
                                IsDeleted: 0
                            }
                        }).then(async (CurriculumBuilderData: any) => {

                            let TotalTest = CurriculumBuilderData.length;
                            let ElearningResultTestNotAttempt = 0;
                            let ElearningResultTestAttempt = 0;
                            let ElearningResultTestPassed = 0;
                            let ElearningResultTestFailed = 0;


                            for (let k = 0; k < CurriculumBuilderData.length; k++) {
                                await ElearningResult.findOne({
                                    attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']],
                                    where: {
                                        curriculum_test_id: CurriculumBuilderData[k]['dataValues']['curriculum_parent_category_test_id'],
                                        trainee_id: UnBlockTrainees[i]['dataValues']['id'],
                                        test_start: 1,
                                        IsDeleted: 0
                                    },
                                    // logging:console.log
                                }).then((ElearningResultData: any) => {

                                    // if (ElearningResultData == null) {
                                    if (ElearningResultData['id'] == null) {
                                        ElearningResultTestNotAttempt += 1;
                                    } else {
                                        if (ElearningResultData['status'] == '3') {
                                            ElearningResultTestPassed += 1;
                                        } else if (ElearningResultData['status'] == '2') {
                                            ElearningResultTestFailed += 1;
                                        }

                                        ElearningResultTestAttempt += 1;
                                    }

                                    CurriculumBuilderData[k]['dataValues']['ElearningResult'] = ElearningResultData;

                                    TraineeCurriculums[j]['dataValues']['TotalTest'] = TotalTest;
                                    TraineeCurriculums[j]['dataValues']['CurriculumBuilder'] = CurriculumBuilderData;
                                })
                            }


                            if (ElearningResultTestNotAttempt == TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestNotAttempt'] = true;
                                CurriculumNotAttempt += 1;
                            }

                            if (ElearningResultTestPassed == TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestPassed'] = true;
                                CurriculumPass += 1;
                            }

                            if (ElearningResultTestAttempt > 0 && ElearningResultTestAttempt <= TotalTest && ElearningResultTestPassed != TotalTest) {
                                TraineeCurriculums[j]['dataValues']['AllCurriculumsTestAttempt'] = true;
                                CurriculumAttempt += 1;
                            }


                        });


                    }

                    UnBlockTrainees[i]['dataValues']['TotalCurriculum'] = TotalCurriculum;
                    if (CurriculumNotAttempt == TotalCurriculum) {
                        UnBlockTrainees[i]['dataValues']['AllCurriculumNotAttempt'] = true;
                        YetToStart += 1;
                    }

                    if (CurriculumPass == TotalCurriculum) {
                        UnBlockTrainees[i]['dataValues']['AllCurriculumsPassed'] = true;
                        Completed += 1;
                    }

                    // console.log("CurriculumAttempt->",CurriculumAttempt);
                    if (CurriculumAttempt == TotalCurriculum) {
                        UnBlockTrainees[i]['dataValues']['AllCurriculumAttempt'] = true;
                        InProgress += 1;
                    }


                }

                // console.log("UnBlockTrainees->",UnBlockTrainees)

                let SuccessRatio = (Completed / UnBlockTrainees.length) * 100;


                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: responseStrings.GET,
                    TotalTraineesRegister: UnBlockTrainees.length,
                    TotalBlockTrainees: BlockTrainees.length,
                    YetToStart: YetToStart,
                    Completed: Completed,
                    InProgress: InProgress,
                    SuccessRatio: Math.round(SuccessRatio)
                    // TotalTraineesData: UnBlockTrainees,
                });

            } else {
                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: "Oops! Trainees not register or assign yet.",
                    TotalTraineesRegister: 0,
                    TotalBlockTrainees: 0,
                    YetToStart: 0,
                    Completed: 0,
                    InProgress: 0,
                    SuccessRatio: 0
                });

            }
        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + error.message});
        }
    }

    async get_company_card3_data(req: Request, res: Response) {
        try {
            let company_id = req.body.company_id;
            let panel_id = req.body.panel_id;

            let seriesData = Array();
            let xAxisData = Array();

            let TraineesData: any = await Trainee.findAll({
                where: {
                    company_id: req.body.company_id,
                    IsDeleted: 0
                }
            });

            if (TraineesData.length != 0) {
                if (panel_id == 3) {
                    const BranchData: any = await SubCompany.findAll({
                        where: {
                            company_id: company_id,
                            IsDeleted: 0
                        }
                    });

                    if (BranchData.length != 0) {
                        for (let i = 0; i < BranchData.length; i++) {
                            xAxisData[i] = BranchData[i]['name'];


                            let branchTrainees: any = TraineesData.filter((element: any) => {
                                if (element['sub_company_id'] == BranchData[i]['id']) {
                                    return element
                                }
                            });

                            seriesData[i] = branchTrainees.length;
                        }
                    } else {
                        res.status(responseCodes.SUCCESS).json({
                            response_code: 0,
                            message: responseStrings.NOT
                        });
                    }
                }
                else if (panel_id == 2) {
                    const DepartmentData: any = await CompanyDepartment.findAll({
                        include: [
                            {
                                model: MasterDepartment,
                                where: {
                                    IsDeleted: 0,
                                    company_id: company_id
                                }
                            }
                        ],
                        where: {
                            company_id: company_id,
                            IsDeleted: 0
                        }
                    });

                    if (DepartmentData.length != 0) {
                        for (let i = 0; i < DepartmentData.length; i++) {
                            xAxisData[i] = DepartmentData[i]['MasterDepartment']['name'];

                            let departmentTrainees: any = TraineesData.filter((element: any) => {
                                if (element['department_id'] == DepartmentData[i]['id']) {
                                    return element
                                }
                            });

                            seriesData[i] = departmentTrainees.length;
                        }
                    } else {
                        res.status(responseCodes.SUCCESS).json({
                            response_code: 0,
                            message: responseStrings.NOT
                        });
                    }
                }
                else {
                    const TrainerData: any = await Trainer.findAll({
                        where: {
                            company_id: company_id,
                            IsDeleted: 0
                        }
                    });

                    if (TrainerData.length != 0) {
                        for (let i = 0; i < TrainerData.length; i++) {
                            xAxisData[i] = TrainerData[i]['name'];

                            let trainerTrainees: any = TraineesData.filter((element: any) => {
                                if (element['trainer_id'] == TrainerData[i]['id']) {
                                    return element
                                }
                            });

                            seriesData[i] = trainerTrainees.length;
                        }
                    } else {
                        res.status(responseCodes.SUCCESS).json({
                            response_code: 0,
                            message: responseStrings.NOT
                        });
                    }

                }

                let options = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                        },
                    },
                    grid: {
                        right: '5%',
                    },

                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true,
                            },
                            // prettier-ignore
                            data: xAxisData,
                            axisLabel: {
                                interval: 0,
                                //rotate: 30 //If the label names are too long you can manage this by rotating the label.
                            }
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: 'count',
                            min: 0,
                            max: TraineesData.length,
                            position: 'left',
                            axisLine: {
                                show: true,
                            },
                        },
                    ],
                    series: [
                        {
                            type: 'bar',
                            barMaxWidth: 50,
                            // showBackground: true,
                            data: seriesData,
                        },
                    ],
                };

                res.status(responseCodes.SUCCESS).json({
                    response_code: 1,
                    message: responseStrings.GET,
                    echartOption: options
                });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({
                    response_code: 0,
                    message: responseStrings.NOT
                });
            }


        } catch (error: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + error.message});
        }

    }

}

export default new CompanyController();
