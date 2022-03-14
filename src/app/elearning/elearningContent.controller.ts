import { text } from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import moment from "moment";
import path from "path";
import sequelize from "sequelize";
import { unzip } from "zlib";
import ElearningMaster from "../../model/elearning/eLearningmaster.model";
import CurriculumParentCategoryTest from "../../model/root/curriculum_parent_category_test.model";
import responseCodes from "../../strings/response-codes";
import responseStrings from "../../strings/response-strings";
import TraineeCurriculum from "../../model/root/trainee_curriculum.model";
import Trainee from "../../model/root/trainee.model";
import Curriculum from "../../model/root/curriculum.model";
import CurriculumBuilder from "../../model/root/curriculumbuilder.model";
import ElearningResult from "../../model/elearning/eLearningresult.model";

const AdmZip = require("adm-zip");

class ElearningContent {


    async elearningTestLink(req: Request, res: Response) {

        try {

            const checkExists = await ElearningMaster.findOne({
                where: {
                    test_id: req.body.test_id,
                    IsDeleted: 0
                },
            });

            // console.log("checkExists->",checkExists);

            if (checkExists == null) {
                
                // console.log("obj->",req.file);

                //TODO ZIP FILE PATH
                var filePath="./resources/coursezip/"+req.file?.filename;

                 //TODO ZIP FILE STORING PATH
                var newPath="./resources/course";

                //! GET AND EXTRACT ZIP FILE
                const zip = new AdmZip(filePath);
                zip.extractAllTo(newPath); //TODO EXTRACT TO COURSE FOLDER
                //! GET AND EXTRACT ZIP FILE

                const zipFolderName=zip.getEntries();

                //** Form Data */
                let obj = {
                    test_id: req.body.test_id,
                    zipname: req.file?.filename,
                    folderName:zipFolderName[0]['entryName'].slice(0,-1)
                };

                await ElearningMaster.create(obj).then(function (data) {
                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.ADD, data: data });
                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            } else {
                res.status(responseCodes.CREATED).json({ response_code: 0, message: responseStrings.EXISTS });
            }

        }
        catch (err:any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err.message});
        }


    }

    async getElearnigTestLink(req: Request, res: Response) {
        try {
            await CurriculumParentCategoryTest.findAll({
                include: [
                    {
                        model: ElearningMaster,
                        required: false,
                        where: {
                            IsDeleted: 0,
                        },
                        attributes: ['zipname','folderName' ,'id']
                    }
                ],
                // attributes:[[sequelize.literal('path'), 'virtualColumn']],
                where: {
                    IsDeleted: 0,
                    parent_id: req.body.parent_category_id,
                    technology_type_id: req.body.technology_type_id
                },
                // logging: console.log
            }).then((result: any) => {


                if (result != null) {

                    const filePath = 
                    new URL(req.protocol + '://' + req.get('host') + "/resources/course/");

                    for (let i = 0; i < result.length; i++) 
                    {
                        if(result[i]['ElearningMaster'] != null)
                        {
                        result[i]['dataValues']['ElearningMaster']['link'] = 
                        filePath+result[i]['ElearningMaster']['folderName']+'/index_lms.html'+
                        "?actor=%7B%22mbox%22%3A%22mailto%3ashish@gmail.com%22%2C%22"+
                        "name%22%3A%22Super%22%2C%22objectType%22%3A%22Agent%22%7D&auth=Basic%20Og%3D%3D&test_id="+result[i]['id']+
                        "&endpoint=http%3A%2F%2F"+ req.get('host')+"%2FTMS" +"%2Ftrainee"+"%2Felearning"+"%2FstoreElearningResult";
                        }
                        
                    }

                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.GET, data: result })
                } else {
                    res.status(responseCodes.SUCCESS).json({ response_code: 0, message: responseStrings.NOT })
                }
            })



        } catch (err:any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message })
        }
    }

    async checkUploadElearningLinkFile(req: Request, res: Response, next: NextFunction) {
        try{
            console.log(req.files);
            console.log(req.body);
            res.status(responseCodes.SUCCESS).json({ response_code: 1, message: req.files });
        }catch(err){
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
        }
    }

    async updateElearnigTestLink(req: Request, res: Response) {
        try {

            await ElearningMaster.findOne({
                where: {
                    id: req.body.elearning_id,
                    IsDeleted: 0
                }
            }).then(async (result) => {

                await ElearningMaster.update(
                    {
                        zipname: req.file?.filename
                    }, {
                    where: {
                        id: req.body.elearning_id
                    }
                }
                ).then((updateResult) => {
                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.UPDATED, data: updateResult });
                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }).catch(err => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            });
        }
        catch (err:any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
        }

    }

    async deleteElearningTestLink(req: Request, res: Response) {
        try {

            const checkExists = await ElearningMaster.findOne({
                where: {
                    id: req.body.elearning_id,
                    IsDeleted: 0
                },
            });

            if (checkExists != null) {
                let obj = {
                    IsDeleted: 1,
                    deleteAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                };

                await ElearningMaster.update(obj, {
                    where: { id: req.body.elearning_id },
                }).then(function (data) {
                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.DELETE });
                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                });
            } else {
                res.status(responseCodes.SUCCESS).json({ response_code: 0, message: responseStrings.NOT });
            }

        } catch (err) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err});
        }
    }

    async getElearningCurriculumModuleReport(req: Request, res: Response) {
        try {
            let curriculum_id = req.body.curriculum_id;
            let trainer_id = req.body.trainer_id;
            let Trainees: any = await Trainee.findAll({
                include: [{
                    required: true,
                    model: TraineeCurriculum,
                    where: {
                        curriculum_id: curriculum_id,
                        IsDeleted: 0
                    },
                    attributes: ['id', 'trainee_id', 'trainee_user_id', 'curriculum_id']
                }],
                where: {
                    trainer_id: trainer_id,
                    IsDeleted: 0
                },
                attributes: ['id', 'company_id', 'sub_company_id', 'department_id', 'login_table_id', 'first_name', 'middle_name', 'last_name', 'email', 'trainer_id']
            })

            let CurriculumTest: any = await CurriculumBuilder.findAll({
                include: [{
                    required: true,
                    model: CurriculumParentCategoryTest,
                    where: {
                        IsDeleted: 0
                    },
                    attributes: ['id', 'prefix', 'title', 'parent_id']
                }],
                where: {
                    curriculum_id: curriculum_id,
                    IsDeleted: 0,
                },
                attributes: ['id', 'curriculum_id', 'curriculum_parent_category_id', 'curriculum_parent_category_test_id', 'passing_marks', 'total_marks', 'attempts']
            })

            let xAxisData = Array();
            let FirstAttemptPass = Array();
            let FailedTrainees = Array();
            let AttemptAverage = Array();

            for (let c = 0; c < CurriculumTest.length; c++) {
                xAxisData[c] = 'M' + (c + 1);
                let FirstAttemptPassCount = 0;
                let FailedTraineesCount = 0
                let SumOfFailedTrainees = 0;

                let CurriculumTestId = CurriculumTest[c]['dataValues']['CurriculumParentCategoryTest']['id'];

                for (let i = 0; i < Trainees.length; i++) {
                    // let traineeObj = Trainees[i]['dataValues'];
                    // traineeObj['Sr'] = i + 1;
                    let TraineeId = Trainees[i]['dataValues']['id'];

                    let elearningResultFirstAttemptPass: any = await ElearningResult.findOne({
                        where: {
                            IsDeleted: 0,
                            trainee_id: TraineeId,
                            curriculum_test_id: CurriculumTestId,
                            status: "passed",
                            attempt_no: 1
                        }
                    });
                    if (elearningResultFirstAttemptPass != null) {
                        FirstAttemptPassCount += 1;
                    }

                    let elearningResultFailedTrainees: any = await ElearningResult.findOne({
                        attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']],
                        where: {
                            IsDeleted: 0,
                            trainee_id: TraineeId,
                            curriculum_test_id: CurriculumTestId,
                            status: "failed"
                        }
                    });

                    if (elearningResultFailedTrainees['dataValues']['id'] != null) {
                        FailedTraineesCount += 1;
                    }

                    let elearningResultAllFailedTrainees: any = await ElearningResult.findAll({
                        where: {
                            IsDeleted: 0,
                            trainee_id: TraineeId,
                            curriculum_test_id: CurriculumTestId,
                            status: "failed"
                        }
                    });

                    if (elearningResultAllFailedTrainees.length != 0) {
                        for (let item in elearningResultAllFailedTrainees) {
                            SumOfFailedTrainees += 1;
                        }

                    }
                    // console.log("SumOfFailedTrainees->", SumOfFailedTrainees);
                    // console.log("elearningResult->", elearningResultAllFailedTrainees);

                }

                let NumberOfTrainees: any = await ElearningResult.count({
                    where: {
                        IsDeleted: 0,
                        curriculum_test_id: CurriculumTestId,
                        status: "failed",
                    },
                    group: ['trainee_id']
                });

                // console.log("NumberOfTrainees->", NumberOfTrainees)
                let Avg = 0;
                if (NumberOfTrainees.length != 0) {
                    Avg = SumOfFailedTrainees / NumberOfTrainees.length;
                }

                FirstAttemptPass.push(FirstAttemptPassCount);
                FailedTrainees.push(FailedTraineesCount);
                AttemptAverage.push(Avg);
                CurriculumTest[c]['dataValues']['Trainees'] = Trainees;
            }


            let echartOptions = {
                color: ['#5470C6', '#91CC75', '#ee6666'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    // formatter: '{b0}: {c0}<br />{b1}: {c1}'
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['FirstAttemptPass', 'FailedTrainees', 'AttemptAverage']
                },
                xAxis: [
                    {
                        // type: 'Curriculum Module Test',
                        axisTick: {
                            alignWithLabel: true
                        },
                        // prettier-ignore
                        data: xAxisData
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'count',
                        min: 0,
                        max: Trainees.length,
                        position: 'left',
                        axisLine: {
                            show: true
                        }
                    }
                ],
                series: [
                    {
                        name: 'FirstAttemptPass',
                        type: 'bar',
                        data: FirstAttemptPass
                    },
                    {
                        name: 'FailedTrainees',
                        type: 'bar',
                        data: FailedTrainees
                    },
                    {
                        name: 'AttemptAverage',
                        type: 'bar',
                        data: AttemptAverage
                    }
                ]
            };

            res.status(responseCodes.SUCCESS).json({response_code: 1, data: echartOptions});
            // res.status(responseCodes.SUCCESS).json({response_code: 0, data: CurriculumTest});

        } catch (err) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
        }
    }
}


export default new ElearningContent();