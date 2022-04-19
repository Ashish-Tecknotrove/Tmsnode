
import {Request, Response} from "express";
import responseCodes from "../../../../core/strings/response-codes";
import responseStrings from "../../../../core/strings/response-strings";
import where = require("sequelize");
import sequelize = require('sequelize');


import TraineeCurriculum from "../../../../core/model/root/trainee_curriculum.model";
import Curriculum from "../../../../core/model/root/curriculum.model";
import CurriculumBuilder from "../../../../core/model/root/curriculumbuilder.model";
import CurriculumParentCategoryTest from "../../../../core/model/root/curriculum_parent_category_test.model";
import ElearningMaster from "../../../../core/model/elearning/eLearningmaster.model";
import ElearningResult from "../../../../core/model/elearning/eLearningresult.model";
import ElearningStatus from "../../../../core/model/elearning/elearning_status.model";
import { Op } from "sequelize";
import Trainee from "../../../../core/model/root/trainee.model";


//TODO THIS FILE CREATED TOTALLY FOR TRAINEE DASHBOARD API FOR ELEARNING
class ElearningTrainerController {

    async getElearningProgressDataForTrainer(req: Request, res: Response) {
        try {
            var trainee_id = req.body.trainee_id;

            //TODO GET ALL TRAINEE CURRICULUM DEATAILS
            await TraineeCurriculum.findAll({
                include: [
                    {
                        model: Curriculum,
                        include: [{
                            model: CurriculumBuilder,
                            include: [{
                                model: CurriculumParentCategoryTest,
                                required: true,
                                include: [
                                    {model: ElearningMaster, required: true},
                                    {
                                        model: ElearningResult,
                                        include:[{
                                            model:ElearningStatus,
                                            attributes:['id','status']
                                        }],
                                        required: false,
                                        limit: 1,
                                        order: [['id', 'DESC']],
                                        where: {trainee_id: req.body.trainee_id}
                                    }],
                                where: sequelize.where(sequelize.col('TraineeCurriculum.language_id'), sequelize.col('Curriculum->CurriculumBuilders->CurriculumParentCategoryTest.language_id')),
                            }],

                            where: {
                                //technology_type_id:1,
                                [Op.or]: [
                                    {attempts: {[Op.not]: 'null'}},
                                    {attempts: {[Op.not]: ''}},
                                    {attempts: {[Op.not]: '0'}}
                                ]
                            }
                        }],
                        where: {
                            IsDeleted: 0
                        }

                    }
                ],
                where: {
                    IsDeleted: 0,
                    IsBlock: 0,
                    // language_id:sequelize.col("Curriculum->CurriculumBuilders->CurriculumParentCategoryTest.language_id"),
                    technology_id: 1,
                    trainee_id: trainee_id

                },
                //logging:console.log
            }).then(async (elearningData: any) => {
                //TODO IF DATA IS NULL SHOW ERROR
                if (elearningData.length == 0) {
                    res.status(responseCodes.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Oops! no test found or test have not been allotted to you",
                        data: "Oops! no data found"
                    })
                } else {
                    var trainee_email: any;

                    await
                        Trainee.findOne({
                            where: {id: trainee_id}
                        }).then((data: any) => {
                            trainee_email = data["email"];
                        });

                    //TODO TEST FILE PATH
                    const thumbPath =
                        new URL(req.protocol + '://' + req.get('host') + "/resources/coursethumb/");


                    //TODO FIRST LOOP ALL DATA
                    for (let i = 0; i < elearningData.length; i++) {
                        var j_array = elearningData[i]["Curriculum"]["CurriculumBuilders"];

                        //TODO SECOND LOOP GET DATA FROM CURRICULUM BUILDER
                        for (let j = 0; j < j_array.length; j++)
                        {
                            let imgThumb = j_array[j]["CurriculumParentCategoryTest"]["ElearningMaster"]["dataValues"]['thumbImg'];
                            j_array[j]["CurriculumParentCategoryTest"]["ElearningMaster"]["dataValues"]['thumbImg'] = imgThumb ? thumbPath + imgThumb : null;

                            //?This IS Remainig Attempt
                            var remaining = 0;
                            if (j_array[j]['CurriculumParentCategoryTest']['ElearningResults'].length != 0)
                            {
                                remaining = j_array[j]['attempts'] - j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['attempt_no'];
                                j_array[j]['dataValues']['remaining_attempt'] = remaining;
                                j_array[j]['dataValues']['progress_percentage'] = Math.round((j_array[j]['attempts'] - remaining) / j_array[j]['attempts'] * 100);
                                j_array[j]['dataValues']['lastscore'] = j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['score'];
                                j_array[j]['dataValues']['lastExamStatus'] = j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]["ElearningStatus"]['status'];
                                j_array[j]['dataValues']['lastExamPercentage'] = Math.round(j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['score'] / j_array[j]['total_marks'] * 100);
                                j_array[j]['dataValues']['lastExamStatusbit'] = j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['status'];
                            }
                            else {
                                j_array[j]['dataValues']['remaining_attempt'] = j_array[j]['attempts'];
                                j_array[j]['dataValues']['progress_percentage'] = 0;
                                j_array[j]['dataValues']['lastscore'] = 'false';
                                j_array[j]['dataValues']['lastExamStatus'] = "pending";
                                j_array[j]['dataValues']['lastExamStatusbit'] = 5;
                                j_array[j]['dataValues']['lastExamPercentage'] = 'false';
                            }
                        }
                    }
                    res.status(responseCodes.SUCCESS).json({
                        response_code: 1,
                        message: "All Data fetched", data: elearningData
                    })
                }
            }).catch(err => {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                })
            });
        }
        catch (err: any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: "Oops! " + err.message})
        }
    }


}


export default new ElearningTrainerController();