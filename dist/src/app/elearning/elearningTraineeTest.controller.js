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
const eLearningmaster_model_1 = __importDefault(require("../../model/elearning/eLearningmaster.model"));
const curriculum_model_1 = __importDefault(require("../../model/root/curriculum.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../model/root/curriculum_parent_category_test.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../model/root/trainee_curriculum.model"));
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const curriculumbuilder_model_1 = __importDefault(require("../../model/root/curriculumbuilder.model"));
const eLearningresult_model_1 = __importDefault(require("../../model/elearning/eLearningresult.model"));
const sequelize_1 = require("sequelize");
const elearning_training_session_model_1 = __importDefault(require("../../model/root/elearning_training_session.model"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
const trainee_model_1 = __importDefault(require("../../model/root/trainee.model"));
const elearning_trainee_scrom_data_model_1 = __importDefault(require("../../model/root/elearning_trainee_scrom_data.model"));
const sequelize_2 = __importDefault(require("sequelize"));
//TODO THIS FILE CREATED TOTALLY FOR TRAINEE DASHBOARD API FOR ELEARNING 
class ElearningTraineeTest {
    //TODO THIS FUNCTION USED TO LOAD THE ELEARNING DATA
    getElearningTestData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var trainee_id = req.body.trainee_id;
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
                                                    required: false,
                                                    limit: 1,
                                                    order: [['id', 'DESC']],
                                                    where: { trainee_id: req.body.trainee_id }
                                                }
                                            ],
                                            where: sequelize_2.default.where(sequelize_2.default.col('TraineeCurriculum.language_id'), sequelize_2.default.col('Curriculum->CurriculumBuilders->CurriculumParentCategoryTest.language_id')),
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
                    if (elearningData.length != 0) {
                        var trainee_email;
                        yield trainee_model_1.default.findOne({
                            where: { id: trainee_id }
                        }).then((data) => { trainee_email = data["email"]; });
                        const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/course/");
                        for (let i = 0; i < elearningData.length; i++) {
                            var j_array = elearningData[i]["Curriculum"]["CurriculumBuilders"];
                            for (let j = 0; j < j_array.length; j++) {
                                var master = j_array[j]["CurriculumParentCategoryTest"]["ElearningMaster"];
                                j_array[j]["CurriculumParentCategoryTest"]["ElearningMaster"]["dataValues"]["test_link"]
                                    = filePath + master["folderName"] + '/index_lms.html' +
                                        "?actor=%7B%22mbox%22%3A%22mailto%3a" + trainee_email + "%22%2C%22" +
                                        "name%22%3A%22Super%22%2C%22objectType%22%3A%22Agent%22%7D&auth=Basic%20Og%3D%3D&test_id=" + master['test_id'] +
                                        "&endpoint=http%3A%2F%2F" + req.get('host') + "%2FTMS" + "%2Ftrainee" + "%2Felearning" + "%2FstoreElearningResult";
                                //?This IS Remainig Attempt
                                var remaining = 0;
                                if (j_array[j]['CurriculumParentCategoryTest']['ElearningResults'].length != 0) {
                                    remaining = j_array[j]['attempts'] - j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['attempt_no'];
                                    j_array[j]['dataValues']['remaining_attempt'] = remaining;
                                    j_array[j]['dataValues']['lastscore'] = j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['score'];
                                    j_array[j]['dataValues']['lastExamStatus'] = j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['status'];
                                    j_array[j]['dataValues']['lastExamPercentage'] = j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['score'] / j_array[j]['total_marks'] * 100;
                                }
                                else {
                                    j_array[j]['dataValues']['remaining_attempt'] = j_array[j]['attempts'];
                                    j_array[j]['dataValues']['lastscore'] = '-';
                                    j_array[j]['dataValues']['lastExamStatus'] = false;
                                    j_array[j]['dataValues']['lastExamPercentage'] = false;
                                }
                                //?? SEQUENCING PATTERN
                                if (elearningData[i]['Curriculum']['sequence'] == 1) {
                                    //! Meaning Check of first element 
                                    if (j_array[j]['CurriculumParentCategoryTest']['ElearningResults'].length != 0) {
                                        var exam_status = j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['status'];
                                        if (j == 0) {
                                            if (exam_status != "passed" && remaining >= 0) {
                                                j_array[j]['dataValues']['startTest'] = 1;
                                            }
                                            else {
                                                j_array[j]['dataValues']['startTest'] = 0;
                                            }
                                        }
                                        else {
                                            var last_index_status = j_array[j - 1]['CurriculumParentCategoryTest']['ElearningResults'][0]['status'];
                                            var last_index_remaining = j_array[j]['attempts'] - j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['attempt_no'];
                                            if (last_index_status == "passed") {
                                                j_array[j]['dataValues']['startTest'] = 1;
                                            }
                                            else {
                                                j_array[j]['dataValues']['startTest'] = 0;
                                            }
                                        }
                                    }
                                    else {
                                        j_array[j]['dataValues']['startTest'] = 1;
                                    }
                                }
                                else {
                                    j_array[j]['dataValues']['startTest'] = 1;
                                }
                            }
                        }
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1,
                            message: "All Data fetched", data: elearningData });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0,
                            message: "Oops! no test found or test have not been allotted to you", data: "Oops! no data found" });
                    }
                })).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    start_training_session(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //TODO CHECK TRAINING SESSION EXIS
                yield elearning_training_session_model_1.default.findAll({
                    where: {
                        trainee_id: req.body.trainee_id,
                        status: '1'
                    },
                    logging: console.log
                }).then((sessionData) => __awaiter(this, void 0, void 0, function* () {
                    if (sessionData.length == 0) {
                        const TraineeData = {
                            trainee_id: req.body.trainee_id,
                            session_id: '',
                            status: '1',
                            createdAt: response_strings_1.default.currentTime
                        };
                        yield elearning_training_session_model_1.default.create(Object.assign({}, TraineeData)).then((newSession) => __awaiter(this, void 0, void 0, function* () {
                            const update = {
                                session_id: 'session_' + newSession['id']
                            };
                            yield elearning_training_session_model_1.default.update(Object.assign({}, update), { where: { id: newSession['id'] } }).then(completed => {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    responseCodes: 1,
                                    sessionId: 'session_' + newSession['id'],
                                    message: "Can start test",
                                    startTest: 1
                                });
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                            });
                        }), err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({
                            responseCodes: 0,
                            message: "Ooop! you have already open the test and not closed it properly. please reset the test",
                            startTest: 0
                        });
                    }
                })).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    reset_training_session(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var trainee_id = req.body.trainee_id;
                var updateData = {
                    status: '0'
                };
                yield elearning_training_session_model_1.default.update(Object.assign({}, updateData), { where: { trainee_id: trainee_id } })
                    .then((clearSession) => __awaiter(this, void 0, void 0, function* () {
                    yield elearning_training_session_model_1.default.findAll({
                        order: [['id', 'DESC']]
                    }).then((lastSessionData) => __awaiter(this, void 0, void 0, function* () {
                        var add = lastSessionData[0]['id'] + 1;
                        const TraineeData = {
                            trainee_id: trainee_id,
                            session_id: 'session_' + add,
                            status: "1",
                            createdAt: response_strings_1.default.currentTime
                        };
                        yield elearning_training_session_model_1.default.create(Object.assign({}, TraineeData)).then((newSession) => __awaiter(this, void 0, void 0, function* () {
                            res.status(response_codes_1.default.SUCCESS).json({
                                responseCodes: 1,
                                sessionId: newSession['session_id'],
                                message: "Can start test",
                                startTest: 1
                            });
                        }), err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    })).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                    });
                })).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    store_trainee_test_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var test_id = req.query.test_id;
                var scrom_data = req.body; //! response We are getting form scrom
                var question_count = 10;
                var traineeData;
                var trainee_email = scrom_data['actor']['mbox'].split(":").pop(); //TODO Spliting Trainee Email
                yield trainee_model_1.default.findOne({ where: { email: trainee_email } }).then((traineeres) => { traineeData = traineeres; }).catch(err => { res.status(500).json({ message: err.message }); });
                //! This Condition Will Execute When result is not null
                if (scrom_data['result']) {
                    //!TODO CHECK USER HAS GIVEN THE RESPONSE
                    if (scrom_data['object']['definition']['correctResponsesPattern']) {
                        var question = scrom_data['object']['definition']['name']['und'];
                        var correct_answer = scrom_data['object']['definition']['correctResponsesPattern'][0];
                        var trainee_given_answer = scrom_data['result']['response'];
                        var score = scrom_data['result']['score']['raw'];
                        // console.log(question);
                        //TODO ADD STATUS IF TRAINEE ANSWER IS CORRECT
                        var given_answer_status = "";
                        if (correct_answer == trainee_given_answer) {
                            given_answer_status = "Correct";
                        }
                        else {
                            given_answer_status = "Incorrect";
                        }
                        //?? CHECK TRAIINEE SELECTED OPTION SO WE CAN GET THE SELECT ANSWER OF THE TRAINEE
                        var options_loop = scrom_data['object']['definition']['choices'];
                        var selected_answer_text = "";
                        for (var i = 0; i < options_loop.length; i++) {
                            if (options_loop[i]["id"] == trainee_given_answer) {
                                selected_answer_text = options_loop[i]['description']['und'];
                            }
                        }
                        //??END
                        var check_data_exist_elearningData = yield elearning_trainee_scrom_data_model_1.default.findAll({ where: {
                                test_id: test_id,
                                trainee_id: traineeData["id"],
                                question: question
                            } });
                        var new_elearning_data_inserted_id;
                        // TODOD If Data Already Exist Maintain Attempt Count 
                        if (check_data_exist_elearningData.length != 0) {
                            var get_last_updated_data = yield elearning_trainee_scrom_data_model_1.default.findAll({ where: {
                                    test_id: test_id,
                                    trainee_id: traineeData["id"],
                                    question: question
                                }, order: [['id', 'DESC']] });
                            var increment_attempt = get_last_updated_data[0]['attempt_no'] + 1;
                            var insert_array = {
                                test_id: test_id,
                                trainee_id: traineeData["id"],
                                attempt_no: increment_attempt,
                                question: question,
                                answer: selected_answer_text,
                                status: given_answer_status,
                                mark: score,
                                created_by: traineeData["id"],
                                createdAt: response_strings_1.default.currentTime
                            };
                            yield elearning_trainee_scrom_data_model_1.default.create(Object.assign({}, insert_array)).then(createSuccess => {
                                new_elearning_data_inserted_id = createSuccess['id'];
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err });
                            });
                        }
                        else {
                            var get_trainees_current_attempt = yield elearning_trainee_scrom_data_model_1.default.findAll({ where: {
                                    test_id: test_id,
                                    trainee_id: traineeData["id"]
                                }, order: [['attempt_no', 'DESC']] });
                            var createarray;
                            if (get_trainees_current_attempt.length != 0) {
                                createarray = {
                                    test_id: test_id,
                                    trainee_id: traineeData["id"],
                                    attempt_no: get_trainees_current_attempt[0]["attempt_no"],
                                    question: question,
                                    answer: selected_answer_text,
                                    status: given_answer_status,
                                    mark: score,
                                    created_by: traineeData["id"],
                                    createdAt: response_strings_1.default.currentTime
                                };
                            }
                            else {
                                createarray = {
                                    test_id: test_id,
                                    trainee_id: traineeData["id"],
                                    attempt_no: 1,
                                    question: question,
                                    answer: selected_answer_text,
                                    status: given_answer_status,
                                    mark: score,
                                    created_by: traineeData["id"],
                                    createdAt: response_strings_1.default.currentTime
                                };
                            }
                            yield elearning_trainee_scrom_data_model_1.default.create(Object.assign({}, createarray)).then(createSuccess => {
                                new_elearning_data_inserted_id = createSuccess['id'];
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err });
                            });
                        }
                        var get_elearning_data_row;
                        yield elearning_trainee_scrom_data_model_1.default.findOne({ where: {
                                id: new_elearning_data_inserted_id
                            } }).then((res) => { get_elearning_data_row = res; });
                        //! Store Data in ELearning Result
                        var check_data_exit_in_elearning_result = yield eLearningresult_model_1.default.findAll({ where: {
                                curriculum_test_id: test_id,
                                trainee_id: traineeData["id"],
                                attempt_no: get_elearning_data_row["attempt_no"]
                            }, order: [['id', 'DESC']] });
                        //!TODO if Result is Not Null Them Update the Result
                        if (check_data_exit_in_elearning_result.length != 0) {
                            question_count += question_count;
                            var newScore = check_data_exit_in_elearning_result[0]['score'] + score;
                            var update_result_array = {
                                curriculum_test_id: test_id,
                                trainee_id: traineeData["id"],
                                attempt_no: get_elearning_data_row["attempt_no"],
                                total: question_count,
                                score: newScore,
                                status: 'pending',
                                created_by: traineeData["id"],
                                createdAt: response_strings_1.default.currentTime
                            };
                            var id = check_data_exit_in_elearning_result[0]["id"];
                            yield eLearningresult_model_1.default.update(Object.assign({}, update_result_array), { where: { id: id } }).then(update => {
                                res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Test data and result updated successfully." });
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err });
                            });
                        }
                        //TODO Create New Row
                        else {
                            var result_array = {
                                curriculum_test_id: test_id,
                                trainee_id: traineeData["id"],
                                attempt_no: get_elearning_data_row["attempt_no"],
                                total: '',
                                score: score,
                                status: 'pending',
                                created_by: traineeData["id"],
                                createdAt: response_strings_1.default.currentTime
                            };
                            yield eLearningresult_model_1.default.create(Object.assign({}, result_array)).then(done => {
                                res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Test data and result added successfully." });
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "407 Oops! " + err });
                            });
                        }
                    }
                    //?? This Condition Will Execute when Test Completed
                    else if (scrom_data['result']['duration']) {
                        var duration = scrom_data['result']['duration'];
                        var status_d = scrom_data['verb']['display']['en-US'];
                        var elearning_data = yield eLearningresult_model_1.default.findAll({ where: {
                                curriculum_test_id: test_id,
                                trainee_id: traineeData["id"]
                            }, order: [['id', 'DESC']] });
                        var status;
                        if (scrom_data["result"]["success"] == true) {
                            status = "passed";
                        }
                        else {
                            status = "failed";
                        }
                        var update_data = {
                            duration: duration,
                            status: status
                        };
                        yield eLearningresult_model_1.default.update(Object.assign({}, update_data), { where: { id: elearning_data[0]["id"] } }).then(final => {
                            res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Final result updated successfullty." });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Oops! Trainee Response not found" });
                    }
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Oops! Trainee Response not found" });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err });
            }
        });
    }
    handle_scrom_activities_state(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Handling Scrom" });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err });
            }
        });
    }
    get_trainee_test_details(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var trainee_id = req.body.trainee_id;
                var test_id = req.body.test_id;
                yield eLearningresult_model_1.default.findAll({
                    where: {
                        trainee_id: trainee_id,
                        curriculum_test_id: test_id
                    },
                    order: [["id", "DESC"]]
                }).then((elearningData) => __awaiter(this, void 0, void 0, function* () {
                    if (elearningData.length != 0) {
                        yield elearning_trainee_scrom_data_model_1.default.findAll({
                            where: {
                                trainee_id: trainee_id,
                                test_id: test_id,
                                attempt_no: elearningData[0]["attempt_no"]
                            },
                            order: [["id", "ASC"]]
                        }).then(finalData => {
                            var final_Data = {
                                attempt_no: elearningData[0]["attempt_no"],
                                score: elearningData[0]["attempt_no"],
                                status: elearningData[0]["status"],
                                duration: elearningData[0]["duration"],
                                cratedAt: elearningData[0]["createdAt"],
                                detailInfo: finalData
                            };
                            res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Details data fetched successfully.", data: final_Data });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops!" + err });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Oops! no result data found" });
                    }
                })).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err });
            }
        });
    }
}
exports.default = new ElearningTraineeTest();
