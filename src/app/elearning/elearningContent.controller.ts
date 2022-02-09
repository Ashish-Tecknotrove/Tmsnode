import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import moment from "moment";
import sequelize from "sequelize";
import { where } from "sequelize/types";
import ElearningMaster from "../../model/elearning/eLearningmaster.model";
import CurriculumParentCategoryTest from "../../model/root/curriculum_parent_category_test.model";
import responseCodes from "../../strings/response-codes";
import responseStrings from "../../strings/response-strings";

class ElearningContent {


    async elearningTestLink(req: Request, res: Response) {

        try {

            const checkExists = await ElearningMaster.findOne({
                where: {
                    test_id: req.body.test_id,
                    IsDeleted: 0
                },
                logging: console.log
            });

            // console.log("checkExists->",checkExists);

            if (checkExists == null) {
                let obj = {
                    test_id: req.body.test_id,
                    zipname: req.file?.filename
                };

                await ElearningMaster.create(obj).then(function (data) {
                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.ADD, data: data });
                }).catch(err => {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                });
            } else {
                res.status(responseCodes.SUCCESS).json({ response_code: 0, message: responseStrings.EXISTS });
            }

        }
        catch (err) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
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
                        attributes: ['zipname', 'id']
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

                    const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/test/");

                    for (let i = 0; i < result.length; i++) {
                        result[i]['dataValues']['filePath'] = filePath;
                    }

                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: responseStrings.GET, data: result })
                } else {
                    res.status(responseCodes.SUCCESS).json({ response_code: 0, message: responseStrings.NOT })
                }
            })



        } catch (err) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err })
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
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                });
            }).catch(err => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            });
        }
        catch (err) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
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

        }
        catch (err) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
        }
    }
}


export default new ElearningContent();