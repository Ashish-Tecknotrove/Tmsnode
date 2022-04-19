"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
const sequelize = require("sequelize");
const trainee_curriculum_model_1 = __importDefault(require("../../../../core/model/root/trainee_curriculum.model"));
const curriculum_model_1 = __importDefault(require("../../../../core/model/root/curriculum.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../../../core/model/root/curriculumbuilder.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../../../core/model/root/curriculum_parent_category_test.model"));
const eLearningmaster_model_1 = __importDefault(require("../../../../core/model/elearning/eLearningmaster.model"));
const eLearningresult_model_1 = __importDefault(require("../../../../core/model/elearning/eLearningresult.model"));
const elearning_status_model_1 = __importDefault(require("../../../../core/model/elearning/elearning_status.model"));
const sequelize_1 = require("sequelize");
const trainee_model_1 = __importDefault(require("../../../../core/model/root/trainee.model"));
//TODO THIS FILE CREATED TOTALLY FOR TRAINEE DASHBOARD API FOR ELEARNING
class ElearningTrainerController {
    getElearningProgressDataForTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var trainee_id = req.body.trainee_id;
                //TODO GET ALL TRAINEE CURRICULUM DEATAILS
                yield trainee_curriculum_model_1.default.findAll({
                    include: [
                        {
                            model: curriculum_model_1.default,
                            include: [{
                                    model: curriculumbuilder_model_1.default,
                                    include: [{
                                            model: curriculum_parent_category_test_model_1.default,
                                            required: true,
                                            include: [
                                                { model: eLearningmaster_model_1.default, required: true },
                                                {
                                                    model: eLearningresult_model_1.default,
                                                    include: [{
                                                            model: elearning_status_model_1.default,
                                                            attributes: ['id', 'status']
                                                        }],
                                                    required: false,
                                                    limit: 1,
                                                    order: [['id', 'DESC']],
                                                    where: { trainee_id: req.body.trainee_id }
                                                }
                                            ],
                                            where: sequelize.where(sequelize.col('TraineeCurriculum.language_id'), sequelize.col('Curriculum->CurriculumBuilders->CurriculumParentCategoryTest.language_id')),
                                        }],
                                    where: {
                                        //technology_type_id:1,
                                        [sequelize_1.Op.or]: [
                                            { attempts: { [sequelize_1.Op.not]: 'null' } },
                                            { attempts: { [sequelize_1.Op.not]: '' } },
                                            { attempts: { [sequelize_1.Op.not]: '0' } }
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
                }).then((elearningData) => __awaiter(this, void 0, void 0, function* () {
                    //TODO IF DATA IS NULL SHOW ERROR
                    if (elearningData.length == 0) {
                        res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! no test found or test have not been allotted to you",
                            data: "Oops! no data found"
                        });
                    }
                    else {
                        var trainee_email;
                        yield trainee_model_1.default.findOne({
                            where: { id: trainee_id }
                        }).then((data) => {
                            trainee_email = data["email"];
                        });
                        //TODO TEST FILE PATH
                        const thumbPath = new URL(req.protocol + '://' + req.get('host') + "/resources/coursethumb/");
                        //TODO FIRST LOOP ALL DATA
                        for (let i = 0; i < elearningData.length; i++) {
                            var j_array = elearningData[i]["Curriculum"]["CurriculumBuilders"];
                            //TODO SECOND LOOP GET DATA FROM CURRICULUM BUILDER
                            for (let j = 0; j < j_array.length; j++) {
                                let imgThumb = j_array[j]["CurriculumParentCategoryTest"]["ElearningMaster"]["dataValues"]['thumbImg'];
                                j_array[j]["CurriculumParentCategoryTest"]["ElearningMaster"]["dataValues"]['thumbImg'] = imgThumb ? thumbPath + imgThumb : null;
                                //?This IS Remainig Attempt
                                var remaining = 0;
                                if (j_array[j]['CurriculumParentCategoryTest']['ElearningResults'].length != 0) {
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
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "All Data fetched", data: elearningData
                        });
                    }
                })).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
}
exports.default = new ElearningTrainerController();
