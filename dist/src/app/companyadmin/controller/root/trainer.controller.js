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
const response_strings_1 = __importDefault(require("../../../../core/strings/response-strings"));
const trainer_model_1 = __importDefault(require("../../../../core/model/root/trainer.model"));
const users_model_1 = __importDefault(require("../../../../core/model/root/users.model"));
const master_department_model_1 = __importDefault(require("../../../../core/model/root/master_department.model"));
const company_department_model_1 = __importDefault(require("../../../../core/model/root/company_department.model"));
const subcompany_model_1 = __importDefault(require("../../../../core/model/root/subcompany.model"));
const assign_trainee_to_trainer_model_1 = __importDefault(require("../../../../core/model/root/assign_trainee_to_trainer.model"));
const trainee_model_1 = __importDefault(require("../../../../core/model/root/trainee.model"));
class TrainerController {
    getTrainerCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainer_model_1.default.count({
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    },
                }).then(data => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "Trainer count fetched successfully.",
                        count: data
                    });
                }).catch(err => {
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
    registerTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //? check Trainer 
                let trainer = yield trainer_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0,
                    }
                });
                //? check User
                let user = yield users_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0,
                    }
                });
                //?get Trainer and User both of exists
                if (trainer.length != 0 && user.length != 0) {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: response_strings_1.default.EXISTS });
                }
                //?get Trainer exist and User not exist
                else if (trainer.length != 0 && user.length == 0) {
                    //? Create User
                    const login = {
                        company_id: trainer[0].company_id,
                        email: trainer[0].email,
                        password: req.body.password,
                        user_type: response_strings_1.default.UserTypeTrainer,
                        language: 1,
                        created_by: req.body.created_by,
                        createdAt: response_strings_1.default.currentTime,
                        updated_by: ''
                    };
                    yield users_model_1.default.create(Object.assign({}, login)).then((UserData) => __awaiter(this, void 0, void 0, function* () {
                        const updateTrainer = {
                            login_table_id: UserData.id
                        };
                        //? update Trainer Loginid in trainer
                        yield trainer_model_1.default.update(Object.assign({}, updateTrainer), {
                            where: {
                                id: trainer[0].id
                            }
                        }).then((updateData) => {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "The Trainer have been registered successfully.",
                                trainer: trainer,
                                UserData: UserData
                            });
                        }).catch((err) => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    }));
                }
                //?get duplicate email in User but can't get trainer 
                else if (trainer.length == 0 && user.length != 0) {
                    res.status(response_codes_1.default.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Email of user already exists, please use another one"
                    });
                }
                //?  Trainer and User both of not exists
                else {
                    req.body.createdAt = response_strings_1.default.currentTime;
                    req.body.updated_by = '';
                    //? Trainer Create
                    yield trainer_model_1.default.create(Object.assign({}, req.body)).then((data) => __awaiter(this, void 0, void 0, function* () {
                        const login = {
                            company_id: data.company_id,
                            email: data.email,
                            password: req.body.password,
                            user_type: response_strings_1.default.UserTypeTrainer,
                            language: 1,
                            created_by: req.body.created_by,
                            createdAt: response_strings_1.default.currentTime,
                            updated_by: ''
                        };
                        //? User Create
                        yield users_model_1.default.create(Object.assign({}, login)).then((UserData) => __awaiter(this, void 0, void 0, function* () {
                            const updateTrainer = {
                                login_table_id: UserData.id
                            };
                            //? update Trainer Loginid in trainer
                            yield trainer_model_1.default.update(Object.assign({}, updateTrainer), {
                                where: {
                                    id: data.id
                                }
                            }).then((updateData) => {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    message: "The Trainer have been registered successfully.",
                                    trainer: data,
                                    UserData: UserData
                                });
                            }).catch((err) => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err.message
                                });
                            });
                        }));
                    })).catch(function (err) {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
                }
            }
            catch (e) {
                return res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: e.message,
                    data: "",
                });
            }
        });
    }
    updateTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //? CHECK TRAINER 
                yield trainer_model_1.default.findOne({
                    where: {
                        id: req.body.trainer_id,
                        IsDeleted: 0
                    },
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    //? GET TRAINER
                    if (result != null) {
                        let updateTrainer = {};
                        if (req.body.sub_company_id && req.body.department_id) {
                            updateTrainer = {
                                name: req.body.name,
                                password: req.body.password,
                                trainer_expertise: req.body.trainer_expertise,
                                updated_by: req.body.updated_by,
                                updatedAt: response_strings_1.default.currentTime,
                                department_id: req.body.department_id,
                                sub_company_id: req.body.sub_company_id
                            };
                        }
                        else if (req.body.department_id) {
                            updateTrainer = {
                                name: req.body.name,
                                password: req.body.password,
                                trainer_expertise: req.body.trainer_expertise,
                                updated_by: req.body.updated_by,
                                updatedAt: response_strings_1.default.currentTime,
                                department_id: req.body.department_id
                            };
                        }
                        else if (req.body.sub_company_id) {
                            updateTrainer = {
                                name: req.body.name,
                                password: req.body.password,
                                trainer_expertise: req.body.trainer_expertise,
                                updated_by: req.body.updated_by,
                                updatedAt: response_strings_1.default.currentTime,
                                sub_company_id: req.body.sub_company_id
                            };
                        }
                        else {
                            updateTrainer = {
                                name: req.body.name,
                                password: req.body.password,
                                trainer_expertise: req.body.trainer_expertise,
                                updated_by: req.body.updated_by,
                                updatedAt: response_strings_1.default.currentTime
                            };
                        }
                        //? UPDATE TRAINER
                        yield trainer_model_1.default.update(Object.assign({}, updateTrainer), {
                            where: {
                                id: req.body.trainer_id
                            }
                        }).then((update) => __awaiter(this, void 0, void 0, function* () {
                            let updateUser = {
                                password: req.body.password,
                                updated_by: req.body.updated_by,
                                updatedAt: response_strings_1.default.currentTime
                            };
                            //? UPDATE USER
                            yield users_model_1.default.update(Object.assign({}, updateUser), {
                                where: {
                                    id: result.login_table_id
                                }
                            }).then((updateRes) => {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    message: "The Trainer have been updated successfully."
                                });
                            }).catch((err) => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err.message
                                });
                            });
                        })).catch((err) => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    }
                    //? TRAINER NOT EXIST
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! An invalid trainer ID was entered, or this trainer was already deleted"
                        });
                    }
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message,
                        data: "",
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: "",
                });
            }
        });
    }
    getTrainers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let where = {};
                //? CHECK PANAL PLANS
                if (req.body.department_id && req.body.sub_company_id) {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        department_id: req.body.department_id,
                        sub_company_id: req.body.sub_company_id
                    };
                }
                else if (req.body.sub_company_id) {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        sub_company_id: req.body.sub_company_id
                    };
                }
                else if (req.body.department_id) {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        department_id: req.body.department_id,
                    };
                }
                else {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                    };
                }
                //? GET ALL TRAINER BY PANELS
                yield trainer_model_1.default.findAll({
                    include: [
                        {
                            model: users_model_1.default,
                            where: {
                                IsDeleted: 0,
                                company_id: req.body.company_id
                            },
                            required: false
                        },
                        {
                            model: subcompany_model_1.default,
                            where: {
                                IsDeleted: 0,
                                IsBlock: 0
                            },
                            required: false
                        },
                        {
                            model: company_department_model_1.default,
                            include: [{
                                    model: master_department_model_1.default
                                }],
                            where: {
                                IsDeleted: 0,
                                IsBlock: 0
                            },
                            required: false
                        },
                    ],
                    where: where,
                    order: [['id', 'DESC']]
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.GET, data: result });
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message,
                        data: "",
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: "",
                });
            }
        });
    }
    blockTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //** Check Trainee Id Exist */
                const trainer_id = req.body.trainer_id;
                const trainer_exist = yield trainer_model_1.default.findAll({
                    where: {
                        id: trainer_id,
                        IsDeleted: 0
                    }
                });
                //** If trainee Exist */
                if (trainer_exist.length != 0) {
                    let block_trainer_data = {};
                    let message = '';
                    if (trainer_exist[0]['IsBlock'] == 1) {
                        block_trainer_data = {
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime,
                            IsBlock: 0
                        };
                        message = "Trainer Unblocked Successfully.";
                    }
                    if (trainer_exist[0]['IsBlock'] == 0) {
                        block_trainer_data = {
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime,
                            IsBlock: 1
                        };
                        message = "The Trainer have been blocked.";
                    }
                    //* Updated Trainee Table
                    yield trainer_model_1.default.update(Object.assign({}, block_trainer_data), { where: { id: trainer_id } }).then(success => {
                        const block_user_data = {
                            deleted_by: req.body.deleted_by,
                            deletedAt: response_strings_1.default.currentTime,
                            IsBlock: 1
                        };
                        //** update User Table*/
                        users_model_1.default.update(Object.assign({}, block_user_data), { where: { id: trainer_exist[0]['login_table_id'] } }).then(succ => {
                            res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: message });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
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
    deleteTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //? GET TRAINER
                yield trainer_model_1.default.findOne({
                    where: {
                        IsDeleted: 0,
                        id: req.body.trainer_id
                    },
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    //? GET TRAINER
                    if (result != null) {
                        let updateTrainer = {
                            IsDeleted: 1,
                            deleted_by: req.body.deleted_by,
                            deletedAt: response_strings_1.default.currentTime
                        };
                        //? DELETE TRAINER
                        yield trainer_model_1.default.update(Object.assign({}, updateTrainer), {
                            where: {
                                id: req.body.trainer_id
                            }
                        }).then((update) => __awaiter(this, void 0, void 0, function* () {
                            let updateUser = {
                                IsDeleted: 1,
                                deleted_by: req.body.deleted_by,
                                deletedAt: response_strings_1.default.currentTime
                            };
                            //? DELETE USER ALSO
                            yield users_model_1.default.update(Object.assign({}, updateUser), {
                                where: {
                                    id: result.login_table_id
                                }
                            }).then((updateRes) => __awaiter(this, void 0, void 0, function* () {
                                //Un Assigned All Trainees
                                let unassign_all_trainee = {
                                    trainer_id: null
                                };
                                yield trainee_model_1.default.update(Object.assign({}, unassign_all_trainee), { where: { trainer_id: req.body.trainer_id } }).then((unassign) => __awaiter(this, void 0, void 0, function* () {
                                    let unassign_all_trainee2 = {
                                        IsDeleted: 1
                                    };
                                    yield assign_trainee_to_trainer_model_1.default.update(Object.assign({}, unassign_all_trainee2), { where: { trainer_id: req.body.trainer_id } }).then(d => {
                                        res.status(response_codes_1.default.SUCCESS).json({
                                            response_code: 1,
                                            message: "The Trainer have been deleted."
                                        });
                                    }).catch(err => {
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
                            })).catch((err) => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err.message
                                });
                            });
                        })).catch((err) => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    }
                    //? TRAINER NOT EXIST
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: response_strings_1.default.NOT });
                    }
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message,
                        data: "",
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            }
        });
    }
    assign_trainee_to_trainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.trainees_id.length > 0) {
                    let traineeData = JSON.parse(req.body.trainees_id);
                    for (let i = 0; i < traineeData.length; i++) {
                        let insertData = {
                            trainer_id: req.body.trainer_id,
                            trainee_id: traineeData[i]['trainee_id'],
                            created_by: req.body.created_by,
                            createdAt: response_strings_1.default.currentTime
                        };
                        yield assign_trainee_to_trainer_model_1.default.create(insertData)
                            .then((result) => __awaiter(this, void 0, void 0, function* () {
                            yield trainer_model_1.default.findOne({ where: { id: req.body.trainer_id } }).then((data) => __awaiter(this, void 0, void 0, function* () {
                                let updateData = {
                                    trainer_id: req.body.trainer_id,
                                    sub_company_id: data["sub_company_id"],
                                    department_id: data["department_id"],
                                    updated_by: req.body.created_by,
                                    updatedAt: response_strings_1.default.currentTime
                                };
                                yield trainee_model_1.default.update(Object.assign({}, updateData), {
                                    where: {
                                        id: traineeData[i]['trainee_id']
                                    }
                                }).then((updateResult) => {
                                    if ((traineeData.length - 1) == i) {
                                        res.status(response_codes_1.default.SUCCESS).json({
                                            response_code: 1,
                                            message: "The Trainee have been assign successfully.",
                                        });
                                    }
                                }).catch((err) => {
                                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                        response_code: 0,
                                        message: "Oops! " + err.message
                                    });
                                });
                            })).catch(err => {
                            });
                        })).catch((err) => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    }
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Oops! please select atleast one trainee to assign"
                    });
                }
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            }
        });
    }
    unassignTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updateAssign = {
                    IsDeleted: 1,
                    updatedAt: response_strings_1.default.currentTime,
                    updated_by: req.body.updated_by
                };
                yield assign_trainee_to_trainer_model_1.default.update(Object.assign({}, updateAssign), {
                    where: {
                        id: req.body.assignTrainer_id,
                        IsDeleted: 0
                    }
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    let updateTrainee = {
                        trainer_id: null,
                        updatedAt: response_strings_1.default.currentTime,
                        updated_by: req.body.updated_by
                    };
                    yield trainee_model_1.default.update(Object.assign({}, updateTrainee), {
                        where: {
                            id: req.body.trainee_id,
                            IsDeleted: 0
                        }
                    }).then((result) => {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "The Trainee have been unassigned successfully.",
                        });
                    }).catch((err) => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            }
        });
    }
    getTrainersForAssignDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //? GET ALL TRAINER BY PANELS
                yield trainer_model_1.default.findAll({
                    include: [
                        {
                            model: company_department_model_1.default,
                            attributes: ['id', 'name', 'designation', 'email'],
                            include: [{
                                    model: master_department_model_1.default,
                                    attributes: ['id', 'name', 'descripition'],
                                }],
                            where: {
                                IsDeleted: 0,
                                IsBlock: 0
                            },
                            required: false
                        },
                    ],
                    where: {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                    },
                    order: [['id', 'DESC']]
                }).then((result) => {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.GET, data: result });
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message,
                        data: "",
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: "",
                });
            }
        });
    }
    //* This for GOLD Panel
    checkAssignTrainersTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_model_1.default.findAll({
                    where: {
                        trainer_id: req.body.trainer_id,
                        IsDeleted: 0
                    }
                }).then((TraineeData) => __awaiter(this, void 0, void 0, function* () {
                    if (TraineeData.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "This trainer is responsible for some trainees. Would you like to change their department as well?",
                            bit: 1
                        });
                    }
                    else {
                        let updateTrainer = {
                            department_id: req.body.company_department_id,
                            updatedAt: response_strings_1.default.currentTime,
                            updated_by: req.body.updated_by,
                        };
                        yield trainer_model_1.default.update(Object.assign({}, updateTrainer), {
                            where: {
                                id: req.body.trainer_id
                            }
                        }).then((result) => __awaiter(this, void 0, void 0, function* () {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Successfully assign department to trainer.",
                                bit: 0
                            });
                        })).catch((err) => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message,
                            });
                        });
                    }
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message,
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                });
            }
        });
    }
    //* This for GOLD Panel
    assign_department_to_trainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updateTrainer = {
                    department_id: req.body.company_department_id,
                    updatedAt: response_strings_1.default.currentTime,
                    updated_by: req.body.updated_by,
                };
                yield trainer_model_1.default.update(Object.assign({}, updateTrainer), {
                    where: {
                        id: req.body.trainer_id
                    }
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    let updateTrainee;
                    let message = "";
                    if (req.body.bit == 1) {
                        updateTrainee = {
                            department_id: req.body.company_department_id,
                            updatedAt: response_strings_1.default.currentTime,
                            updated_by: req.body.updated_by,
                        };
                        message = "Successfully assign department to trainer with assigned trainee";
                    }
                    else {
                        updateTrainee = {
                            department_id: 0,
                            trainer_id: 0,
                            updatedAt: response_strings_1.default.currentTime,
                            updated_by: req.body.updated_by,
                        };
                        message = "Successfully assign department to trainer only.";
                    }
                    yield trainee_model_1.default.update(Object.assign({}, updateTrainee), {
                        where: {
                            trainer_id: req.body.trainer_id,
                            IsDeleted: 0
                        }
                    }).then((TraineeResult) => __awaiter(this, void 0, void 0, function* () {
                        if (req.body.bit == 1) {
                            let updateTraineeAssign = {
                                IsBlock: 0,
                                updatedAt: response_strings_1.default.currentTime,
                                updated_by: req.body.updated_by
                            };
                            yield assign_trainee_to_trainer_model_1.default.update(Object.assign({}, updateTraineeAssign), {
                                where: {
                                    trainer_id: req.body.trainer_id,
                                    IsDeleted: 0
                                }
                            }).then((TraineeResult) => {
                                res.status(response_codes_1.default.SUCCESS).json({
                                    response_code: 1,
                                    message: message,
                                });
                            }).catch((err) => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                    response_code: 0,
                                    message: "Oops! " + err.message,
                                });
                            });
                        }
                        else {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: message,
                            });
                        }
                    })).catch((err) => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message,
                        });
                    });
                })).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message
                });
            }
        });
    }
}
exports.default = new TrainerController();
