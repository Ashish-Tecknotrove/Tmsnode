import {text} from "body-parser";
import express, {NextFunction, Request, Response} from "express";
import {body} from "express-validator";
import moment from "moment";
import path from "path";
import sequelize from "sequelize";
import {unzip} from "zlib";
import ElearningMaster from "../../../../core/model/elearning/eLearningmaster.model";
import CurriculumParentCategoryTest from "../../../../core/model/root/curriculum_parent_category_test.model";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import Trainee from "../../../../core/model/root/trainee.model";
import CurriculumBuilder from "../../../../core/model/root/curriculumbuilder.model";
import ElearningResult from "../../../../core/model/elearning/eLearningresult.model";

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
                var newPath = "./resources/course";

                //! GET AND EXTRACT ZIP FILE
                const zip = new AdmZip(filePath);
                zip.extractAllTo(newPath); //TODO EXTRACT TO COURSE FOLDER
                //! GET AND EXTRACT ZIP FILE

                const zipFolderName = zip.getEntries();

                //** Form Data */
                let obj = {
                    test_id: req.body.test_id,
                    zipname: req.file?.filename,
                    folderName:zipFolderName[0]['entryName'].slice(0,-1)
                };

                await ElearningMaster.create(obj).then(function (data) {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: responseStrings.ADD,
                        data: data
                    });
                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err.message});
                });
            } else {
                res.status(responseCodes.CREATED).json({response_code: 0, message: responseStrings.EXISTS});
            }
        } catch (err: any) {
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
                        attributes: ['zipname', 'folderName', 'id', 'thumbImg']
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
                    const thumbPath =
                        new URL(req.protocol + '://' + req.get('host') + "/resources/coursethumb/");


                    for (let i = 0; i < result.length; i++) {
                        if (result[i]['ElearningMaster'] != null) {
                            result[i]['dataValues']['ElearningMaster']['link'] =
                                filePath + result[i]['ElearningMaster']['folderName'] + '/index_lms.html' +
                                "?actor=%7B%22mbox%22%3A%22mailto%3ashish@gmail.com%22%2C%22" +
                                "name%22%3A%22Super%22%2C%22objectType%22%3A%22Agent%22%7D&auth=Basic%20Og%3D%3D&test_id=" + result[i]['id'] +
                                "&endpoint=http%3A%2F%2F" + req.get('host') + "%2FTMS" + "%2Ftrainee" + "%2Felearning" + "%2FstoreElearningResult";

                            let imgThumb = result[i]['ElearningMaster']['thumbImg'];

                            result[i]['dataValues']['ElearningMaster']['thumbImg'] = imgThumb ? thumbPath + imgThumb : null;
                        }

                    }

                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: responseStrings.GET,
                        data: result
                    })
                } else {
                    res.status(responseCodes.SUCCESS).json({response_code: 0, message: responseStrings.NOT})
                }
            })


        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err.message})
        }
    }

    async checkUploadElearningLinkFile(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.files);
            console.log(req.body);
            res.status(responseCodes.SUCCESS).json({response_code: 1, message: req.files});
        } catch (err) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err});
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

                let testFileName = req.file?.filename;

                //TODO ZIP FILE PATH
                var filePath = "./resources/coursezip/" + testFileName;

                //TODO ZIP FILE STORING PATH
                var newPath = "./resources/course";

                //! GET AND EXTRACT ZIP FILE
                const zip = new AdmZip(filePath);
                zip.extractAllTo(newPath); //TODO EXTRACT TO COURSE FOLDER
                //! GET AND EXTRACT ZIP FILE

                const zipFolderName = zip.getEntries();

                await ElearningMaster.update(
                    {
                        zipname: testFileName,
                        folderName: zipFolderName[0]['entryName'].slice(0, -1)
                    }, {
                        where: {
                            id: req.body.elearning_id
                        }
                    }
                ).then((updateResult) => {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: responseStrings.UPDATED,
                        data: updateResult
                    });
                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err.message});
                });
            }).catch(err => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err.message});
            });
        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err.message});
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
                    where: {id: req.body.elearning_id},
                }).then(function (data) {
                    res.status(responseCodes.SUCCESS).json({response_code: 1, message: responseStrings.DELETE});
                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err});
                });
            } else {
                res.status(responseCodes.SUCCESS).json({response_code: 0, message: responseStrings.NOT});
            }

        } catch (err) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err});
        }
    }

    async elearningTestThumbnail(req: Request, res: Response) {

        try {

            const checkExists = await ElearningMaster.findOne({
                where: {
                    id: req.body.elearning_id,
                    IsDeleted: 0
                },
            });

            if (checkExists != null) {

                await ElearningMaster.update(
                    {
                        thumbImg: req.file?.filename
                    }, {
                        where: {
                            id: req.body.elearning_id
                        }
                    }).then(function (data) {
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: responseStrings.UPDATED
                    });
                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err.message});
                });
            } else {
                res.status(responseCodes.BAD_REQUEST).json({response_code: 0, message: responseStrings.NOT});
            }

        } catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err.message});
        }


    }

}


export default new ElearningContent();