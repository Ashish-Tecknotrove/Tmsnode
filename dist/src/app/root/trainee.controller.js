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
const trainee_model_1 = __importDefault(require("../../model/root/trainee.model"));
const users_model_1 = __importDefault(require("../../model/root/users.model"));
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
const assign_trainee_to_trainer_model_1 = __importDefault(require("../../model/root/assign_trainee_to_trainer.model"));
const language_model_1 = __importDefault(require("../../model/language/language.model"));
const company_department_model_1 = __importDefault(require("../../model/root/company_department.model"));
const master_department_model_1 = __importDefault(require("../../model/root/master_department.model"));
const subcompany_model_1 = __importDefault(require("../../model/root/subcompany.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../model/root/trainee_curriculum.model"));
const curriculum_model_1 = __importDefault(require("../../model/root/curriculum.model"));
const sequelize_1 = require("sequelize");
const technology_model_1 = __importDefault(require("../../model/root/technology.model"));
const sequelize_2 = __importDefault(require("sequelize"));
const subscription_model_1 = __importDefault(require("../../model/root/subscription.model"));
class TraineeController {
    getTraineeCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_model_1.default.count({
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    },
                }).then(data => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "Trainee count fetched successfully.",
                        count: data
                    });
                }).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    registerNewTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var curriculum_id_json = JSON.parse(req.body.curriculum_id);
                var curriculum_count = curriculum_id_json.length;
                var license_number_valid = 0;
                for (let i = 0; i < curriculum_id_json.length; i++) {
                    var curriculum = curriculum_id_json[i]['curriculum_id'];
                    var company_id = req.body.company_id;
                    yield trainee_model_1.default.count({
                        include: [{
                                model: trainee_curriculum_model_1.default,
                                where: {
                                    trainee_id: sequelize_2.default.col("Trainee.id"),
                                    curriculum_id: curriculum
                                },
                            }],
                        where: { company_id: company_id },
                        group: ["TraineeCurriculums.trainee_id", "TraineeCurriculums.curriculum_id"],
                        //logging:console.log
                    }).then((Totalcount) => __awaiter(this, void 0, void 0, function* () {
                        var count = Totalcount.length;
                        //console.log(count.length);
                        yield subscription_model_1.default.findOne({
                            where: {
                                curriculum_id: curriculum
                            }
                        }).then((sub) => {
                            if (sub["licence_no"] <= count) {
                                license_number_valid++;
                            }
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    })).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                if (license_number_valid == 0) {
                    //!TODO Check Trainee Exist In Trainee Table
                    //!TODO Check Trainee Exist In Trainee Table
                    let check_trainee_exits = yield trainee_model_1.default.findAll({
                        where: {
                            email: req.body.email,
                            IsDeleted: 0
                        }
                    });
                    //!TODO Check Trainee login Exist In User Table
                    let check_trainee_login_exist = yield users_model_1.default.findAll({
                        where: {
                            email: req.body.email,
                            IsDeleted: 0
                        }
                    });
                    //**IF No */
                    if (check_trainee_exits.length == 0 && check_trainee_login_exist.length == 0) {
                        //* Create Trainee Crediantails
                        req.body.createdAt = response_strings_1.default.currentTime;
                        yield trainee_model_1.default.create(Object.assign({}, req.body)).then(traineeData => {
                            var user_login_body = {
                                company_id: req.body.company_id,
                                email: req.body.email,
                                password: req.body.password,
                                user_type: 4,
                                language: req.body.language,
                                portal_language: req.body.language,
                                createdAt: response_strings_1.default.currentTime,
                                updated_by: "",
                                updatedAt: '',
                                created_by: req.body.created_by
                            };
                            //**On Success create User Login */
                            users_model_1.default.create(Object.assign({}, user_login_body)).then((userData) => __awaiter(this, void 0, void 0, function* () {
                                const updateId = {
                                    login_table_id: userData["id"],
                                };
                                //*ADD CURRICULUM IN CURRICULUM TABLE
                                for (let i = 0; i < curriculum_id_json.length; i++) {
                                    var data = {
                                        trainee_id: traineeData['id'],
                                        trainee_user_id: userData['id'],
                                        curriculum_id: curriculum_id_json[i]['curriculum_id'],
                                        technology_id: curriculum_id_json[i]['technology_id'],
                                        language_id: req.body.language_id,
                                        created_by: req.body.created_by,
                                        createdAt: response_strings_1.default.currentTime
                                    };
                                    yield trainee_curriculum_model_1.default.create(Object.assign({}, data)).then(data => {
                                        console.log("done");
                                    }).catch(err => {
                                        console.log("Oops! " + err.message);
                                    });
                                }
                                //**update the login id in Trainee Table */
                                trainee_model_1.default.update(Object.assign({}, updateId), { where: { id: traineeData['id'] } }).then(success => {
                                    res.status(response_codes_1.default.SUCCESS).json({
                                        response_code: 1,
                                        message: "The Trainee have been registered successfully."
                                    });
                                }).catch(err => {
                                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: "Oops! " + err.message });
                                });
                            })).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                            });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    }
                    //TODO If Trainee exist in trainee table but login not ceated 
                    else if (check_trainee_exits.length != 0 && check_trainee_login_exist.length == 0) {
                        var user_login_body = {
                            company_id: req.body.company_id,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 3,
                            language: req.body.language,
                            created_by: req.body.created_by,
                            updated_by: "",
                            createdAt: response_strings_1.default.currentTime,
                            updatedAt: "",
                        };
                        //**Create User Login */
                        users_model_1.default.create(Object.assign({}, user_login_body)).then(userData => {
                            const updateId = {
                                login_table_id: userData["id"],
                            };
                            //**update the login id in Trainee Table */
                            trainee_model_1.default.update(Object.assign({}, updateId), { where: { id: check_trainee_exits[0]['id'] } }).then(success => {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    message: "The Trainee have been registered successfully."
                                });
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                            });
                            //res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Trainee Already Exits \n But Login Crediantial Not Found \n Login Crediantial Created" });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! Email of trainee already exists, please use another one"
                        });
                    }
                }
                else {
                    if (curriculum_id_json.length > 1) {
                        res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Ooops! One or both of your selected subscription has been max out their limit" });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Ooops! Your selected subscription has been max out their limit" });
                    }
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    getTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    };
                }
                else if (req.body.sub_company_id) {
                    where_condition = {
                        company_id: req.body.company_id,
                        sub_company_id: req.body.sub_company_id,
                        // IsBlock:0,
                        IsDeleted: 0
                    };
                }
                else if (req.body.department_id) {
                    where_condition = {
                        company_id: req.body.company_id,
                        department_id: req.body.department_id,
                        // IsBlock:0,
                        IsDeleted: 0
                    };
                }
                else {
                    where_condition = {
                        company_id: req.body.company_id,
                        // IsBlock:0,
                        IsDeleted: 0
                    };
                }
                yield trainee_model_1.default.findAll({
                    include: [{
                            model: company_department_model_1.default,
                            include: [{
                                    model: master_department_model_1.default,
                                    where: {
                                        IsDeleted: 0
                                    },
                                    required: false,
                                    attributes: ['id', 'company_id', 'name', 'descripition']
                                }],
                            where: {
                                IsDeleted: 0
                            },
                            required: false,
                            attributes: ['id', 'company_id', 'sub_company_id', 'department_id', 'name']
                        }, {
                            model: subcompany_model_1.default,
                            where: {
                                IsDeleted: 0
                            },
                            required: false,
                            attributes: ['id', 'company_id', 'name', 'description', 'designation']
                        }],
                    where: where_condition
                }).then(success => {
                    // await Trainee.findAll({where:where_condition}).then(success=>
                    // {
                    if (success.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: 'Trainee have been fetched successfully.',
                            data: success
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0,
                            message: 'No trainee were found.', data: success });
                    }
                }).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    bulkInsertTrainee(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            //var course_id = req.body.course_id;
            // console.log(req.file?.filename);
            try {
                const csv_file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                console.log(csv_file);
                // const header = ['first_name', 'last_name'];
                // parse(csv_file!, {
                //     delimiter: ',',
                //     columns: header,
                // }, (error, result) => {
                //     if (error) {
                //         console.error(error);
                //     }
                //     console.log("Result", result);
                // });
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 1, message: csv_file });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    updateTraineeDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //** Check Trainee Id Exist */
                const trainee_id = req.body.trainee_id;
                const trainee_exist = yield trainee_model_1.default.findAll({
                    where: {
                        id: trainee_id,
                        IsDeleted: 0
                    }
                });
                //** If trainee Exist*/
                if (trainee_id.length != 0) {
                    req.body.updatedAt = response_strings_1.default.currentTime;
                    //* Updated Trainee Table
                    yield trainee_model_1.default.update(Object.assign({}, req.body), { where: { id: trainee_id } }).then(success => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "The Trainee have been update successfully."
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Oops! An invalid trainee ID was entered, or this trainee was already deleted" });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
            ;
        });
    }
    deleteTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //** Check Trainee Id Exist */
                const trainee_id = req.body.trainee_id;
                const trainee_exist = yield trainee_model_1.default.findAll({
                    where: {
                        id: trainee_id,
                        IsDeleted: 0
                    }
                });
                //** If trainee Exist*/
                if (trainee_exist.length != 0) {
                    const delete_trainee_data = {
                        deleted_by: req.body.deleted_by,
                        deletedAt: response_strings_1.default.currentTime,
                        IsDeleted: 1
                    };
                    //* Updated Trainee Table
                    yield trainee_model_1.default.update(Object.assign({}, delete_trainee_data), { where: { id: trainee_id } }).then(success => {
                        const delete_user_data = {
                            deleted_by: req.body.deleted_by,
                            deletedAt: response_strings_1.default.currentTime,
                            IsDeleted: 1
                        };
                        //** update User Table*/
                        users_model_1.default.update(Object.assign({}, delete_user_data), { where: { id: trainee_exist[0]['login_table_id'] } }).then(succ => {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "The Trainee have been deleted successfully."
                            });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Oops! An invalid trainee ID was entered, or this trainee was already deleted"
                    });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
            ;
        });
    }
    blockTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //** Check Trainee Id Exist */
                const trainee_id = req.body.trainee_id;
                const trainee_exist = yield trainee_model_1.default.findAll({
                    where: {
                        id: trainee_id,
                        IsDeleted: 0
                    }
                });
                //** If trainee Exist*/
                if (trainee_exist.length != 0) {
                    let block_trainee_data = {};
                    let message = '';
                    if (trainee_exist[0]['IsBlock'] == "1") {
                        block_trainee_data = {
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime,
                            IsBlock: 0
                        };
                        message = "Trainee Unblocked Successfully.";
                    }
                    if (trainee_exist[0]['IsBlock'] == "0") {
                        block_trainee_data = {
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime,
                            IsBlock: 1
                        };
                        message = "The Trainee have been blocked.";
                    }
                    //* Updated Trainee Table
                    yield trainee_model_1.default.update(Object.assign({}, block_trainee_data), { where: { id: trainee_id } }).then(success => {
                        const block_user_data = {
                            deleted_by: req.body.deleted_by,
                            deletedAt: response_strings_1.default.currentTime,
                            IsBlock: 1
                        };
                        //** update User Table*/
                        users_model_1.default.update(Object.assign({}, block_user_data), { where: { id: trainee_exist[0]['login_table_id'] } }).then(succ => {
                            res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: message });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Oops! An invalid trainee ID was entered, or this trainee was already deleted"
                    });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
            ;
        });
    }
    getUnassignedTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_model_1.default.findAll({
                    include: [{
                            model: trainee_curriculum_model_1.default,
                            include: [{
                                    model: curriculum_model_1.default
                                }],
                            where: {
                                IsDeleted: 0
                            }
                        }],
                    where: {
                        company_id: req.body.company_id,
                        // IsBlock:0,
                        IsDeleted: 0,
                        IsBlock: 0,
                        [sequelize_1.Op.or]: [{ trainer_id: null }, { trainer_id: '' }]
                    }
                }).then((success) => {
                    if (success.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: 'Trainee Get Successfully.',
                            data: success
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: 'No trainee found' });
                    }
                }).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    //!TODO FUNCTION USED TO GET ASSIGN TRAINEE TO TRAINER 
    getAssignTraineeOfTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield assign_trainee_to_trainer_model_1.default.findAll({
                    include: [{
                            model: trainee_model_1.default,
                            required: false,
                            where: {
                                IsDeleted: 0,
                            },
                            include: [{
                                    model: users_model_1.default,
                                    required: false,
                                    where: {
                                        IsDeleted: 0,
                                    },
                                    include: [{
                                            model: language_model_1.default,
                                            required: false,
                                            as: "TraineeLanguage",
                                            where: {
                                                IsDeleted: 0,
                                            },
                                            attributes: ['id', 'name']
                                        }, {
                                            model: language_model_1.default,
                                            required: false,
                                            as: "portalLanguage",
                                            where: {
                                                IsDeleted: 0,
                                            },
                                            attributes: ['id', 'name']
                                        }],
                                    attributes: ['id', 'company_id', 'email', 'aadhar_no', 'mobile_no', 'user_type', 'language', 'portal_language']
                                }, {
                                    model: trainee_curriculum_model_1.default,
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
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: 'Get Assign Trainee', data: result });
                }).catch((err) => {
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
    getAssignTraineeToTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield assign_trainee_to_trainer_model_1.default.findAll({
                    include: [{
                            model: trainee_model_1.default,
                            required: false,
                            where: {
                                IsDeleted: 0,
                            },
                            include: [{
                                    model: users_model_1.default,
                                    required: false,
                                    where: {
                                        IsDeleted: 0,
                                    },
                                    attributes: ['id', 'company_id', 'email', 'aadhar_no', 'mobile_no', 'user_type', 'language', 'portal_language']
                                }],
                            attributes: ['id', 'first_name', 'middle_name', 'last_name', 'email', 'contact', 'address', 'city', 'trainer_id']
                        }],
                    where: {
                        IsDeleted: 0,
                        trainer_id: req.body.trainer_id
                    },
                    attributes: ['id', 'trainer_id', 'trainee_id']
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: 'Get Assign Trainee', data: result });
                }).catch((err) => {
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
    getAssignTraineeCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_curriculum_model_1.default.findAll({
                    include: [
                        {
                            model: curriculum_model_1.default,
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
                    attributes: ['id', 'trainee_id', 'trainee_user_id', 'curriculum_id', 'technology_id']
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: 'Get Trainee Assign Curriculum',
                        data: result
                    });
                }).catch((err) => {
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
    //! THIS API USE IN TRAINEE DASHBOARD 
    getTechnologiesAllotedToTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_curriculum_model_1.default.findAll({
                    include: [{
                            model: technology_model_1.default,
                            attributes: ['id', 'name'],
                            where: { IsDeleted: 0 }
                        }],
                    where: {
                        trainee_id: req.body.trainee_id,
                        IsBlock: 0,
                        IsDeleted: 0
                    },
                    attributes: ['TechnologyCategory.name'],
                    group: ['TraineeCurriculum.technology_id']
                }).then((techData) => {
                    if (techData.length != 0) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, message: "Technologies Loaded", data: techData });
                    }
                    else {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 0, message: "Oops! no curriculum has been alloted to you." });
                    }
                }, err => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
}
exports.default = new TraineeController();
