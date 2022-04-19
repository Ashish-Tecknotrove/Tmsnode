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
const eLearningmaster_model_1 = __importDefault(require("../../../../core/model/elearning/eLearningmaster.model"));
const curriculum_model_1 = __importDefault(require("../../../../core/model/root/curriculum.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../../../../core/model/root/curriculum_parent_category_test.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../../../core/model/root/trainee_curriculum.model"));
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
const curriculumbuilder_model_1 = __importDefault(require("../../../../core/model/root/curriculumbuilder.model"));
const eLearningresult_model_1 = __importDefault(require("../../../../core/model/elearning/eLearningresult.model"));
const sequelize_1 = require("sequelize");
const elearning_training_session_model_1 = __importDefault(require("../../../../core/model/elearning/elearning_training_session.model"));
const response_strings_1 = __importDefault(require("../../../../core/strings/response-strings"));
const trainee_model_1 = __importDefault(require("../../../../core/model/root/trainee.model"));
const elearning_trainee_scrom_data_model_1 = __importDefault(require("../../../../core/model/elearning/elearning_trainee_scrom_data.model"));
const sequelize_2 = __importDefault(require("sequelize"));
const elearning_status_model_1 = __importDefault(require("../../../../core/model/elearning/elearning_status.model"));
//TODO THIS FILE CREATED TOTALLY FOR TRAINEE DASHBOARD API FOR ELEARNING 
class ElearningTraineeTest {
    //TODO THIS FUNCTION USED TO LOAD THE ELEARNING DATA
    getElearningTestData(req, res) {
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
                                            where: sequelize_2.default.where(sequelize_2.default.col('TraineeCurriculum.language_id'), sequelize_2.default.col('Curriculum->CurriculumBuilders->CurriculumParentCategoryTest.language_id')),
                                        }],
                                    where: {
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
                        const filePath = new URL(req.protocol + '://' + req.get('host') + "/resources/course/");
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
                                //?? SEQUENCING PATTERN
                                if (elearningData[i]['Curriculum']['sequence'] == 1) {
                                    //! Meaning Check of first element
                                    //TODO CEHECK IF RESULT EXIT
                                    if (j_array[j]['CurriculumParentCategoryTest']['ElearningResults'].length != 0) {
                                        var exam_status = j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['status'];
                                        //TODO CHECK FOR FIRST INDEX
                                        if (j == 0) {
                                            if (exam_status != 3 && remaining > 0) {
                                                j_array[j]['dataValues']['startTest'] = 1;
                                            }
                                            else {
                                                j_array[j]['dataValues']['startTest'] = 0;
                                            }
                                        }
                                        else {
                                            var last_index_status = j_array[j - 1]['CurriculumParentCategoryTest']['ElearningResults'][0]['status'];
                                            var last_index_remaining = j_array[j]['attempts'] - j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['attempt_no'];
                                            if (last_index_status == 3) {
                                                if (j_array[j]['CurriculumParentCategoryTest']['ElearningResults'].length != 0) {
                                                    if (j_array[j]['CurriculumParentCategoryTest']['ElearningResults'][0]['status'] == 3
                                                        && remaining > 0) {
                                                        j_array[j]['dataValues']['startTest'] = 0;
                                                    }
                                                    else {
                                                        j_array[j]['dataValues']['startTest'] = 1;
                                                    }
                                                }
                                                else {
                                                    j_array[j]['dataValues']['startTest'] = 1;
                                                }
                                            }
                                            else {
                                                j_array[j]['dataValues']['startTest'] = 0;
                                            }
                                        }
                                    }
                                    else {
                                        //TDOD CHECK IF TEST IS FIRST
                                        if (j == 0) {
                                            j_array[0]['dataValues']['startTest'] = 1;
                                        }
                                        else {
                                            var index = j - 1;
                                            var arrayLength = j_array.length;
                                            //console.log(index);
                                            //TODO CHECK LAST TEST STATUS
                                            if (j_array[index]['CurriculumParentCategoryTest']['ElearningResults'].length != 0) {
                                                var exam_status = j_array[index]['CurriculumParentCategoryTest']['ElearningResults'][0]['status'];
                                                //TODO CHECK LAST STATUS AND ATTEMPT
                                                //console.log(remaining);
                                                if (exam_status == 3) {
                                                    j_array[j]['dataValues']['startTest'] = 1;
                                                }
                                                else {
                                                    j_array[j]['dataValues']['startTest'] = 0;
                                                }
                                            }
                                            else {
                                                j_array[j]['dataValues']['startTest'] = 0;
                                            }
                                        }
                                    }
                                }
                                else {
                                    j_array[j]['dataValues']['startTest'] = 1;
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
    start_training_session(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var test_id = req.body.test_id;
                var builder_id = req.body.builder_id;
                var trainee_id = req.body.trainee_id;
                var folderName = '';
                yield eLearningmaster_model_1.default.findOne({
                    where: {
                        test_id: test_id
                    }
                }).then((data) => {
                    folderName = data["folderName"];
                }, err => {
                    console.log(err);
                });
                var trainee_data = '';
                yield trainee_model_1.default.findOne({
                    where: {
                        id: trainee_id
                    }
                }).then((data) => {
                    trainee_data = data["email"];
                }, err => {
                    console.log(err);
                });
                //TODO THIS FUN MANAGE ATTEMPT COUNT FOR EVERY TEST
                var current_attempt = 1;
                yield eLearningresult_model_1.default.max('attempt_no', {
                    where: {
                        trainee_id: trainee_id,
                        curriculum_test_id: test_id
                    }
                }).then((max) => __awaiter(this, void 0, void 0, function* () {
                    console.log(max);
                    if (max != 0) {
                        yield eLearningresult_model_1.default.findAll({
                            where: {
                                trainee_id: trainee_id,
                                curriculum_test_id: test_id,
                                attempt_no: max,
                                test_start: 1
                            }
                        }).then(inc => {
                            if (inc.length != 0) {
                                current_attempt = max + 1;
                            }
                            else {
                                current_attempt = max;
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                    else {
                        current_attempt = 1;
                    }
                })).catch(err => {
                    console.log(err);
                });
                //TODO CHECK TRAINING SESSION EXIS
                yield elearning_training_session_model_1.default.findAll({
                    where: {
                        trainee_id: req.body.trainee_id,
                        status: '1'
                    },
                    //logging:console.log
                }).then((sessionData) => __awaiter(this, void 0, void 0, function* () {
                    if (sessionData.length == 0) {
                        const TraineeData = {
                            trainee_id: req.body.trainee_id,
                            session_id: '',
                            status: '1',
                            createdAt: response_strings_1.default.currentTime
                        };
                        yield elearning_training_session_model_1.default.create(Object.assign({}, TraineeData)).then((newSession) => __awaiter(this, void 0, void 0, function* () {
                            var session = 'session_' + newSession['id'];
                            const update = {
                                session_id: 'session_' + newSession['id']
                            };
                            let urlHeader = "";
                            if (req.secure == true) {
                                urlHeader = "https";
                            }
                            else {
                                urlHeader = "http";
                            }
                            yield elearning_training_session_model_1.default.update(Object.assign({}, update), { where: { id: newSession['id'] } }).then(completed => {
                                const filePath = new URL(urlHeader + '://' + req.get('host') + "/resources/course/");
                                const exam_url = filePath + folderName + '/index_lms.html' +
                                    "?actor=%7B%22mbox%22%3A%22mailto%3a" + trainee_data + "%22%2C%22" +
                                    "name%22%3A%22Super%22%2C%22objectType%22%3A%22Agent%22%7D&auth=Basic%20Og%3D%3D&test_id=" + test_id +
                                    "&session_id=" + session +
                                    "&attempt=" + current_attempt +
                                    "&builder_id=" + builder_id +
                                    "&endpoint=" + urlHeader + "%3A%2F%2F" + req.get('host') + "%2FTMS" + "%2Ftrainee" + "%2Felearning" + "%2FstoreElearningResult";
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    sessionId: 'session_' + newSession['id'],
                                    message: "Can start test",
                                    startTest: 1,
                                    test_link: exam_url
                                });
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err.message
                                });
                            });
                        }), err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 2,
                            message: "Ooop! you have already open the test and not closed it properly. please reset the test",
                            startTest: 0
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
    reset_training_session(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var test_id = req.body.test_id;
                var builder_id = req.body.builder_id;
                var trainee_id = req.body.trainee_id;
                var folderName = '';
                yield eLearningmaster_model_1.default.findOne({
                    where: {
                        test_id: test_id
                    }
                }).then((data) => {
                    folderName = data["folderName"];
                }, err => {
                    console.log(err);
                });
                var trainee_data = '';
                yield trainee_model_1.default.findOne({
                    where: {
                        id: trainee_id
                    }
                }).then((data) => {
                    trainee_data = data["email"];
                }, err => {
                    console.log(err);
                });
                //TODO THIS FUN MANAGE ATTEMPT COUNT FOR EVERY TEST
                var current_attempt = 1;
                yield eLearningresult_model_1.default.max('attempt_no', {
                    where: {
                        trainee_id: trainee_id,
                        curriculum_test_id: test_id
                    }
                }).then((max) => __awaiter(this, void 0, void 0, function* () {
                    if (max != 0) {
                        yield eLearningresult_model_1.default.findAll({
                            where: {
                                trainee_id: trainee_id,
                                curriculum_test_id: test_id,
                                attempt_no: max,
                                test_start: 1
                            }
                        }).then(inc => {
                            if (inc.length != 0) {
                                current_attempt = max + 1;
                            }
                            else {
                                current_attempt = max;
                            }
                        }).catch(err => {
                        });
                    }
                    else {
                        current_attempt = 1;
                    }
                })).catch(err => {
                });
                var updateData = {
                    status: '0'
                };
                yield elearning_training_session_model_1.default.update(Object.assign({}, updateData), { where: { trainee_id: trainee_id } })
                    .then((clearSession) => __awaiter(this, void 0, void 0, function* () {
                    yield elearning_training_session_model_1.default.findAll({
                        order: [['id', 'DESC']]
                    }).then((lastSessionData) => __awaiter(this, void 0, void 0, function* () {
                        var add = lastSessionData[0]['id'] + 1;
                        var session = 'session_' + add;
                        const TraineeData = {
                            trainee_id: trainee_id,
                            session_id: 'session_' + add,
                            status: "1",
                            createdAt: response_strings_1.default.currentTime
                        };
                        yield elearning_training_session_model_1.default.create(Object.assign({}, TraineeData)).then((newSession) => __awaiter(this, void 0, void 0, function* () {
                            let urlHeader = "";
                            if (req.secure == true) {
                                urlHeader = "https";
                            }
                            else {
                                urlHeader = "http";
                            }
                            const filePath = new URL(urlHeader + '://' + req.get('host') + "/resources/course/");
                            const exam_url = filePath + folderName + '/index_lms.html' +
                                "?actor=%7B%22mbox%22%3A%22mailto%3a" + trainee_data + "%22%2C%22" +
                                "name%22%3A%22Super%22%2C%22objectType%22%3A%22Agent%22%7D&auth=Basic%20Og%3D%3D&test_id=" + test_id +
                                "&session_id=" + session +
                                "&attempt=" + current_attempt +
                                "&builder_id=" + builder_id +
                                "&endpoint=" + urlHeader + "%3A%2F%2F" + req.get('host') + "%2FTMS" + "%2Ftrainee" + "%2Felearning" + "%2FstoreElearningResult";
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_cod: 1,
                                sessionId: newSession['session_id'],
                                message: "Can start test",
                                startTest: 1,
                                test_link: exam_url
                            });
                        }), err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    })).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
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
    close_training_session(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var trainee_id = req.body.trainee_id;
                var updateData = {
                    status: '0'
                };
                yield elearning_training_session_model_1.default.update(Object.assign({}, updateData), { where: { trainee_id: trainee_id } })
                    .then((clearSession) => __awaiter(this, void 0, void 0, function* () {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_cod: 1,
                        message: "Session Closed",
                        startTest: 1
                    });
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
    //TODO THIS METHODS HANDLE SCROM DATA LAST UPDATED ASHISH RHATWAL
    store_trainee_test_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var test_id = req.query.test_id;
                var scrom_data = req.body; //! response We are getting form scrom
                var question_count = 0;
                var builder_id = req.query.builder_id;
                var session_id = req.query.session_id;
                var curremt_attempt = req.query.attempt;
                var traineeData;
                var trainee_email = scrom_data['actor']['mbox'].split(":").pop(); //TODO Spliting Trainee Email
                yield trainee_model_1.default.findOne({ where: { email: trainee_email } }).then((traineeres) => {
                    traineeData = traineeres;
                }).catch(err => {
                    res.status(500).json({ message: err.message });
                });
                var trainee_id = traineeData["id"];
                //TODO START VIDEO WATCHING INPROGRESS
                yield eLearningresult_model_1.default.findAll({
                    where: {
                        trainee_id: traineeData["id"],
                        curriculum_test_id: test_id
                    },
                    order: [["id", "DESC"]]
                }).then((sessionData) => __awaiter(this, void 0, void 0, function* () {
                    //no session data
                    if (sessionData.length != 0) {
                        var lastest_session_id = sessionData[0]["session_id"];
                        var lastest_test_status = sessionData[0]["test_start"];
                        if (lastest_session_id == session_id) {
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
                                    //?? CHECK TRAINEE SELECTED OPTION SO WE CAN GET THE SELECT ANSWER OF THE TRAINEE
                                    var options_loop = scrom_data['object']['definition']['choices'];
                                    var selected_answer_text = "";
                                    for (var i = 0; i < options_loop.length; i++) {
                                        if (options_loop[i]["id"] == trainee_given_answer) {
                                            selected_answer_text = options_loop[i]['description']['und'];
                                        }
                                    }
                                    //??END
                                    //TODO NOW TEST STARTED WE WILL CHANGE THE BIT TO
                                    var test_bit = {
                                        test_start: 1,
                                        score: 0,
                                        status: 1,
                                        created_by: trainee_id,
                                        createdAt: response_strings_1.default.currentTime
                                    };
                                    yield eLearningresult_model_1.default.findOne({
                                        where: {
                                            session_id: session_id
                                        }
                                    }).then((result) => __awaiter(this, void 0, void 0, function* () {
                                        var latesScore = result['score'] + score;
                                        var update_result = {
                                            test_start: 1,
                                            score: latesScore,
                                            status: 4,
                                            created_by: trainee_id,
                                            updatedAt: response_strings_1.default.currentTime
                                        };
                                        yield eLearningresult_model_1.default.update(Object.assign({}, update_result), { where: { session_id: session_id } }).then((success) => __awaiter(this, void 0, void 0, function* () {
                                            var add_elearning_master = {
                                                test_id: test_id,
                                                session_id: session_id,
                                                trainee_id: trainee_id,
                                                attempt_no: curremt_attempt,
                                                question: question,
                                                answer: selected_answer_text,
                                                status: given_answer_status,
                                                mark: score,
                                                created_by: trainee_id,
                                                createdAt: response_strings_1.default.currentTime
                                            };
                                            yield elearning_trainee_scrom_data_model_1.default.create(Object.assign({}, add_elearning_master)).then(done => {
                                                res.status(response_codes_1.default.SUCCESS).json({
                                                    response_code: 1,
                                                    message: "Trainee Data Added Successfully...."
                                                });
                                            }).catch(err => {
                                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                                    response_code: 0,
                                                    message: "Oops!" + err.message
                                                });
                                            });
                                        })).catch(err => {
                                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                                response_code: 0,
                                                message: "Oops!" + err.message
                                            });
                                        });
                                    })).catch(err => {
                                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                            response_code: 0,
                                            message: "Oops!" + err.message
                                        });
                                    });
                                }
                                //TODO This Condition Will Execute when Test Completed
                                else if (scrom_data['result']['duration']) {
                                    var duration = scrom_data['result']['duration'];
                                    var status_d = scrom_data['verb']['display']['en-US'];
                                    //TODO GET PASSING MARKS OF THE TEST
                                    yield curriculumbuilder_model_1.default.findOne({
                                        where: {
                                            id: builder_id
                                        }
                                    }).then((passingMarks) => __awaiter(this, void 0, void 0, function* () {
                                        yield eLearningresult_model_1.default.findOne({
                                            where: { session_id: session_id }
                                        }).then((result) => __awaiter(this, void 0, void 0, function* () {
                                            var status;
                                            if (result["score"] >= passingMarks["passing_marks"]) {
                                                status = 3;
                                            }
                                            else {
                                                status = 2;
                                            }
                                            var update_data = {
                                                duration: duration,
                                                status: status
                                            };
                                            yield eLearningresult_model_1.default.update(Object.assign({}, update_data), { where: {
                                                    session_id: session_id
                                                } }).then(final => {
                                                res.status(response_codes_1.default.SUCCESS).json({
                                                    response_code: 1,
                                                    message: "Final result updated successfully."
                                                });
                                            }).catch(err => {
                                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                                    response_code: 0,
                                                    message: "Oops! " + err
                                                });
                                            });
                                        })).catch(err => {
                                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                                response_code: 0,
                                                message: "Oops! " + err
                                            });
                                        });
                                        // if(passingMarks["passing_marks"] == )
                                    })).catch(err => {
                                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                            response_code: 0,
                                            message: "Oops! " + err
                                        });
                                    });
                                }
                                else {
                                    res.status(response_codes_1.default.SUCCESS).json({
                                        response_code: 0,
                                        message: "Oops! This is not the final result"
                                    });
                                }
                            }
                            else {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 0,
                                    message: "Oops! Trainee is still watching thw video"
                                });
                            }
                        }
                        else {
                            var add_attempt = curremt_attempt;
                            var new_row = {
                                trainee_id: trainee_id,
                                session_id: session_id,
                                test_start: 0,
                                curriculum_test_id: test_id,
                                attempt_no: add_attempt,
                                score: 0,
                                status: 1,
                                created_by: trainee_id,
                                createdAt: response_strings_1.default.currentTime
                            };
                            yield eLearningresult_model_1.default.create(Object.assign({}, new_row)).then(success => {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    message: "New Session Result Added Successfully"
                                });
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err
                                });
                            });
                        }
                    }
                    else {
                        var add_result = {
                            trainee_id: trainee_id,
                            session_id: session_id,
                            test_start: 0,
                            curriculum_test_id: test_id,
                            attempt_no: curremt_attempt,
                            score: 0,
                            status: 1,
                            created_by: trainee_id,
                            createdAt: response_strings_1.default.currentTime
                        };
                        yield eLearningresult_model_1.default.create(Object.assign({}, add_result)).then(success => {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "New Session Result Added Successfully"
                            });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    }
                })).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err });
            }
        });
    }
    store_trainee_test_data_test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var test_id = req.query.test_id;
                var scrom_data = req.body; //! response We are getting form scrom
                var question_count = 0;
                var traineeData;
                var trainee_email = scrom_data['actor']['mbox'].split(":").pop(); //TODO Spliting Trainee Email
                console.log(req.query.session_id);
                yield trainee_model_1.default.findOne({ where: { email: trainee_email } }).then((traineeres) => {
                    traineeData = traineeres;
                }).catch(err => {
                    res.status(500).json({ message: err.message });
                });
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
                        var check_data_exist_elearningData = yield elearning_trainee_scrom_data_model_1.default.findAll({
                            where: {
                                test_id: test_id,
                                trainee_id: traineeData["id"],
                                question: question
                            }
                        });
                        var new_elearning_data_inserted_id;
                        // TODOD If Data Already Exist Maintain Attempt Count 
                        if (check_data_exist_elearningData.length != 0) {
                            var get_last_updated_data = yield elearning_trainee_scrom_data_model_1.default.findAll({
                                where: {
                                    test_id: test_id,
                                    trainee_id: traineeData["id"],
                                    question: question
                                }, order: [['id', 'DESC']]
                            });
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
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err
                                });
                            });
                        }
                        else {
                            var get_trainees_current_attempt = yield elearning_trainee_scrom_data_model_1.default.findAll({
                                where: {
                                    test_id: test_id,
                                    trainee_id: traineeData["id"]
                                }, order: [['attempt_no', 'DESC']]
                            });
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
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err
                                });
                            });
                        }
                        var get_elearning_data_row;
                        yield elearning_trainee_scrom_data_model_1.default.findOne({
                            where: {
                                id: new_elearning_data_inserted_id
                            }
                        }).then((res) => {
                            get_elearning_data_row = res;
                        });
                        //! Store Data in ELearning Result
                        var check_data_exit_in_elearning_result = yield eLearningresult_model_1.default.findAll({
                            where: {
                                curriculum_test_id: test_id,
                                trainee_id: traineeData["id"],
                                attempt_no: get_elearning_data_row["attempt_no"]
                            }, order: [['id', 'DESC']]
                        });
                        //!TODO if Result is Not Null Them Update the Result
                        if (check_data_exit_in_elearning_result.length != 0) {
                            question_count += question_count;
                            var newScore = check_data_exit_in_elearning_result[0]['score'] + score;
                            var update_result_array = {
                                curriculum_test_id: test_id,
                                trainee_id: traineeData["id"],
                                attempt_no: get_elearning_data_row["attempt_no"],
                                //total:question_count,
                                score: newScore,
                                status: 'inprogress',
                                created_by: traineeData["id"],
                                createdAt: response_strings_1.default.currentTime
                            };
                            var id = check_data_exit_in_elearning_result[0]["id"];
                            yield eLearningresult_model_1.default.update(Object.assign({}, update_result_array), { where: { id: id } }).then(update => {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 0,
                                    message: "Test data and result updated successfully."
                                });
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err
                                });
                            });
                        }
                        //TODO Create New Row
                        else {
                            var result_array = {
                                curriculum_test_id: test_id,
                                trainee_id: traineeData["id"],
                                attempt_no: get_elearning_data_row["attempt_no"],
                                //total:'',
                                score: score,
                                status: 'inprogress',
                                created_by: traineeData["id"],
                                createdAt: response_strings_1.default.currentTime
                            };
                            yield eLearningresult_model_1.default.create(Object.assign({}, result_array)).then(done => {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 0,
                                    message: "Test data and result added successfully."
                                });
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "407 Oops! " + err
                                });
                            });
                        }
                    }
                    //TODO This Condition Will Execute when Test Completed
                    else if (scrom_data['result']['duration']) {
                        var duration = scrom_data['result']['duration'];
                        var status_d = scrom_data['verb']['display']['en-US'];
                        var elearning_data = yield eLearningresult_model_1.default.findAll({
                            where: {
                                curriculum_test_id: test_id,
                                trainee_id: traineeData["id"]
                            }, order: [['id', 'DESC']]
                        });
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
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Final result updated successfully."
                            });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err
                            });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 0,
                            message: "Oops! Trainee Response not found"
                        });
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
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Details data fetched successfully.",
                                data: final_Data
                            });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops!" + err
                            });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! no result data found"
                        });
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
    get_elearning_test_result(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result_id = req.body.result_id;
                let trainee_id = req.body.trainee_id;
                yield eLearningresult_model_1.default.findOne({
                    include: [{
                            model: elearning_status_model_1.default,
                            required: false
                        }],
                    where: {
                        id: result_id
                    }
                }).then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data != null) {
                        let latest_attempt = data['attempt_no'];
                        let curriculum_test_id = data['curriculum_test_id'];
                        let trainee_id = data['trainee_id'];
                        yield elearning_trainee_scrom_data_model_1.default.findAll({
                            where: {
                                test_id: curriculum_test_id,
                                trainee_id: trainee_id,
                                attempt_no: latest_attempt
                            }
                        }).then((resData) => __awaiter(this, void 0, void 0, function* () {
                            if (resData.length != 0) {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    message: "Result Fetched Successfully...",
                                    examStatus: data['ElearningStatus']["status"],
                                    data: resData
                                });
                            }
                            else {
                                res.status(response_codes_1.default.BAD_REQUEST).json({
                                    response_code: 0,
                                    message: "Oops! No result found please complete the test."
                                });
                            }
                        }));
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! No result found please complete the test."
                        });
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
