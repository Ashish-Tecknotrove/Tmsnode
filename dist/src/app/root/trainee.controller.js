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
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Trainee count fetched successfully...", count: data });
                }).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
    registerNewTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                            user_type: 3,
                            language: req.body.language,
                            createdAt: response_strings_1.default.currentTime,
                            updated_by: "",
                            updatedAt: '',
                            created_by: req.body.created_by
                        };
                        //**On Success create User Login */
                        users_model_1.default.create(Object.assign({}, user_login_body)).then(userData => {
                            const updateId = {
                                login_table_id: userData["id"],
                            };
                            //**update the login id in Trainee Table */
                            trainee_model_1.default.update(Object.assign({}, updateId), { where: { id: traineeData['id'] } }).
                                then(success => {
                                res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Trainee added successfully..." });
                            }).catch(err => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: err.message });
                            });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
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
                        trainee_model_1.default.update(Object.assign({}, updateId), { where: { id: check_trainee_exits[0]['id'] } }).
                            then(success => {
                            res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Trainee added successfully..." });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: err.message });
                        });
                        //res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Trainee Already Exits \n But Login Crediantial Not Found \n Login Crediantial Created" });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Trainee With Same Email Already Exist" });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
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
                yield trainee_model_1.default.findAll({ where: where_condition }).then(success => {
                    if (success.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: 'Trainee Get Successfully...', data: success });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: 'No trainee found' });
                    }
                }).catch(err => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
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
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
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
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Trainee Update Successfully..." });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Invalid Trainee Id" });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
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
                            res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Trainee Deleted Successfully..." });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Invalid Trainee Id or Trainee Already deleted" });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
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
                        message = "Trainee Unblocked Successfully...";
                    }
                    if (trainee_exist[0]['IsBlock'] == "0") {
                        block_trainee_data = {
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime,
                            IsBlock: 1
                        };
                        message = "Trainee blocked Successfully...";
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
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Invalid Trainee Id or Trainee Already deleted" });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
            ;
        });
    }
}
exports.default = new TraineeController();
