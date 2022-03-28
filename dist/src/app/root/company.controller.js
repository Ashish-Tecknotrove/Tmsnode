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
const company_model_1 = __importDefault(require("../../model/root/company.model"));
const compayuser_model_1 = __importDefault(require("../../model/root/compayuser.model"));
const curriculum_model_1 = __importDefault(require("../../model/root/curriculum.model"));
const subscription_model_1 = __importDefault(require("../../model/root/subscription.model"));
const users_model_1 = __importDefault(require("../../model/root/users.model"));
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const response_strings_1 = __importDefault(require("../../strings/response-strings"));
const countries_model_1 = __importDefault(require("../../model/resources/countries.model"));
const states_model_1 = __importDefault(require("../../model/resources/states.model"));
const cities_model_1 = __importDefault(require("../../model/resources/cities.model"));
const traineeFormCustomize_model_1 = __importDefault(require("../../model/root/traineeFormCustomize.model"));
const traineeFormMaster_model_1 = __importDefault(require("../../model/root/traineeFormMaster.model"));
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const masterpanel_model_1 = __importDefault(require("../../model/root/masterpanel.model"));
const trainee_model_1 = __importDefault(require("../../model/root/trainee.model"));
const trainee_curriculum_model_1 = __importDefault(require("../../model/root/trainee_curriculum.model"));
const subcompany_model_1 = __importDefault(require("../../model/root/subcompany.model"));
const company_department_model_1 = __importDefault(require("../../model/root/company_department.model"));
const master_department_model_1 = __importDefault(require("../../model/root/master_department.model"));
const trainer_model_1 = __importDefault(require("../../model/root/trainer.model"));
const curriculumbuilder_model_1 = __importDefault(require("../../model/root/curriculumbuilder.model"));
const eLearningresult_model_1 = __importDefault(require("../../model/elearning/eLearningresult.model"));
const sequelize = require("sequelize");
class CompanyController {
    registerCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var company_name = req.body.company_name;
                const checkName = yield company_model_1.default.findOne({
                    where: {
                        company_name: company_name,
                        IsDeleted: 0
                    },
                });
                if (checkName == null) {
                    req.body.updated_by = "";
                    req.body.createdAt = response_strings_1.default.currentTime;
                    req.body.enrollment_id = "COM_";
                    yield company_model_1.default.create(Object.assign({}, req.body))
                        .then(function (response) {
                        return __awaiter(this, void 0, void 0, function* () {
                            //! UPDATE COMPANY ENROLLMENT ID
                            var updateData = {
                                enrollment_id: "COMP_" + response['id']
                            };
                            company_model_1.default.update(Object.assign({}, updateData), { where: { id: response['id'] } }).catch(err => {
                                console.log(err);
                            });
                            //! UPDATE COMPANY ENROLLMENT ID
                            //* Add trainee form field to this company/
                            var company_id = response['id'];
                            const master_form_fileds = yield traineeFormMaster_model_1.default.findAll({ where: { IsDeleted: 0 } });
                            for (let i = 0; i < master_form_fileds.length; i++) {
                                var formarray = {
                                    company_id: company_id,
                                    form_master_id: master_form_fileds[i]['id'],
                                    created_by: req.body.created_by,
                                    isValidate: 0
                                };
                                yield traineeFormCustomize_model_1.default.create(Object.assign({}, formarray)).catch(err => {
                                    console.log("Oops! " + err.message);
                                });
                            }
                            //* Add trainee form field to this company ----END/
                            res
                                .status(response_codes_1.default.SUCCESS)
                                .json({
                                response_code: 1,
                                message: "The company have been successfully registered.",
                                data: response,
                            });
                        });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.CREATED)
                        .json({
                        response_code: 0,
                        message: "Another user with this company name already exists. Please use another name",
                    });
                }
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    total_companies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var company_count = yield company_model_1.default.count({
                    include: [{
                            model: masterpanel_model_1.default,
                            //required:false,
                            where: { IsDeleted: 0 }
                        }],
                    where: {
                        IsDeleted: 0,
                        company_type: 0
                    },
                })
                    .then((success) => {
                    res
                        .status(response_codes_1.default.SUCCESS)
                        .json({
                        response_code: 1,
                        message: response_strings_1.default.GET,
                        count: success,
                    });
                })
                    .catch((error) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + error.message });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    updateCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let company_id = req.body.company_id;
                let check_company_is_valid = yield company_model_1.default.findOne({
                    where: {
                        id: company_id,
                        IsDeleted: 0,
                    }
                }).catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
                if (check_company_is_valid != null) {
                    req.body.updatedAt = response_strings_1.default.currentTime;
                    yield company_model_1.default.update(Object.assign({}, req.body), { where: { id: company_id } })
                        .then(function (data) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, message: "Company updated successfully" });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.BAD_REQUEST)
                        .json({
                        response_code: 0,
                        message: "Oops! An invalid company ID was entered, or this company was already deleted",
                    });
                }
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    deleteCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let company_id = req.body.company_id;
                let check_company_is_valid = yield company_model_1.default.findOne({
                    where: {
                        id: company_id,
                        IsDeleted: 0,
                    },
                    // logging: console.log,
                }).catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
                if (check_company_is_valid != null) {
                    let updateData = {
                        IsDeleted: 1,
                        deletedAt: response_strings_1.default.currentTime,
                        deleted_by: req.body.deleted_by,
                    };
                    //Check Subscription Expired
                    var currentDate = response_strings_1.default.currentDate;
                    yield subscription_model_1.default.findAll({
                        where: {
                            expiry_date: { [sequelize_1.Op.gte]: currentDate },
                            IsDeleted: 0,
                            company_id: company_id
                        }
                    }).then(data => {
                        if (data.length == 0) {
                            company_model_1.default.update(Object.assign({}, updateData), { where: { id: company_id } })
                                .then(function (data) {
                                res
                                    .status(response_codes_1.default.SUCCESS)
                                    .json({ response_code: 1, message: "The Company have been deleted successfully." });
                            })
                                .catch(function (err) {
                                res
                                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                    .json({ response_code: 0, message: data.length });
                            });
                        }
                        else {
                            res
                                .status(response_codes_1.default.BAD_REQUEST)
                                .json({
                                response_code: 0,
                                message: "Oops! you cannot delete this company because it have an active Subscription please Deactivate the Subscription anf try again"
                            });
                        }
                    }, err => {
                        res
                            .status(response_codes_1.default.BAD_REQUEST)
                            .json({
                            response_code: 0,
                            message: "Oops!" + err
                        });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.BAD_REQUEST)
                        .json({
                        response_code: 0,
                        message: "Oops! An invalid company ID was entered, or this company was already deleted",
                    });
                }
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    getCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let company_id = "";
                let where_condition = {};
                let include_condition = {};
                //TODOD Get Company By
                if (req.body.company_id) {
                    company_id = req.body.company_id;
                    where_condition = { id: company_id, IsDeleted: 0, company_type: 0 };
                    include_condition = {};
                }
                //TODO Get All Company
                else {
                    where_condition = { IsDeleted: 0, company_type: 0 };
                }
                const getCompany = yield company_model_1.default.findAll({
                    include: [{
                            model: masterpanel_model_1.default,
                            //required:false,
                            where: { IsDeleted: 0 }
                        }],
                    where: where_condition,
                    order: [["id", "DESC"]],
                })
                    .then((data) => {
                    if (data.length != 0) {
                        for (var i = 0; i < data.length; i++) {
                            data[i]['logo'] = new URL(req.protocol + '://' + req.get('host')) + "resources/company_logo/" + data[i]['picture'];
                        }
                        //let logo =
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({
                            response_code: 1,
                            //logo:logo,
                            message: response_strings_1.default.GET,
                            data: data,
                        });
                    }
                    else {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 0, message: "No data were found." });
                    }
                })
                    .catch((err) => {
                    console.log(err);
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    get_company_details_by_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield company_model_1.default.findOne({
                    include: [
                        {
                            model: compayuser_model_1.default,
                            attributes: ['id', 'name', 'designation', 'mobile_no', 'canlogin'],
                            where: {
                                IsDeleted: 0
                            },
                            required: false
                        },
                        {
                            model: subscription_model_1.default,
                            include: [{
                                    model: curriculum_model_1.default,
                                    attributes: ['id', 'name'],
                                    where: {
                                        IsDeleted: 0
                                    },
                                    required: false
                                }],
                            where: {
                                IsDeleted: 0,
                                company_id: req.body.company_id
                            },
                            required: false
                        },
                        {
                            model: masterpanel_model_1.default,
                            attributes: ['panel']
                        },
                        {
                            model: countries_model_1.default,
                            attributes: ['title', 'slug'],
                            required: false
                        },
                        {
                            model: states_model_1.default,
                            attributes: ['title', 'slug'],
                            required: false
                        },
                        {
                            model: cities_model_1.default,
                            attributes: ['title', 'slug'],
                            required: false
                        }
                    ],
                    //logging: console.log,
                    where: {
                        id: req.body.company_id,
                        IsDeleted: 0
                    }
                }).then((result) => {
                    if (result != null) {
                        let logo = new URL(req.protocol + '://' + req.get('host')) + "resources/company_logo/" + result['picture'];
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({
                            response_code: 1,
                            logo: logo,
                            message: response_strings_1.default.GET,
                            data: result,
                        });
                    }
                    else {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 0, message: "No data were found." });
                    }
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
    //TODO Company Login Calls
    add_company_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.createdAt = response_strings_1.default.currentTime;
                yield compayuser_model_1.default.create(Object.assign({}, req.body))
                    .then(function (data) {
                    res
                        .status(response_codes_1.default.SUCCESS)
                        .json({
                        response_code: 1,
                        message: "company user added successfully.",
                        data: data,
                    });
                })
                    .catch(function (err) {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    add_company_login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Table Fields for Company Contac
                req.body.canlogin = 1;
                req.body.updated_by = "";
                req.body.createdAt = response_strings_1.default.currentTime;
                const checkemailExist = yield compayuser_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0
                    }
                });
                const checkemailExist_in_user_table = yield users_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0
                    }
                });
                if (checkemailExist.length == 0 && checkemailExist_in_user_table.length == 0) {
                    yield compayuser_model_1.default.create(Object.assign({}, req.body))
                        .then((userdata) => {
                        //Add login in User table
                        const userLoginData = {
                            company_id: req.body.company_id,
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 2,
                            language: 1,
                            createdAt: response_strings_1.default.currentTime,
                            created_by: req.body.created_by,
                            updated_by: "",
                        };
                        users_model_1.default.create(Object.assign({}, userLoginData))
                            .then((data) => {
                            const updateId = {
                                login_table_id: data["id"],
                            };
                            compayuser_model_1.default.update(Object.assign({}, updateId), { where: { id: userdata["id"] } }).catch((err) => {
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: "Oops! " + err.message });
                            });
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Added company user successfully, and login created"
                            });
                            response_codes_1.default;
                        })
                            .catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    })
                        .catch(function (err) {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({
                        response_code: 0,
                        message: "Oops! Another user with this email already exists"
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    updated_company_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_id = req.body.user_id;
                let check_company_user_is_valid = yield compayuser_model_1.default.findOne({
                    where: {
                        id: user_id,
                        IsDeleted: 0,
                    }
                }).catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
                if (check_company_user_is_valid != null) {
                    req.body.updatedAt = response_strings_1.default.currentTime;
                    const user_login_id = check_company_user_is_valid['login_table_id'];
                    yield compayuser_model_1.default.update(Object.assign({}, req.body), { where: { id: user_id } })
                        .then(function (data) {
                        const user_table_update = {
                            name: req.body.name,
                            email: req.body.email,
                            mobile_no: req.body.mobile_no,
                            password: req.body.password,
                            designation: req.body.designation,
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime
                        };
                        users_model_1.default.update(user_table_update, { where: { id: user_login_id } }).then(function (data) {
                            res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 1, message: "Company user updated successfully." });
                        }).catch((err) => {
                            res
                                .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: "Oops! " + err.message });
                        });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: "Oops! " + err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.BAD_REQUEST)
                        .json({
                        response_code: 0,
                        message: "Oops! An invalid company user ID was entered, or this user was already deleted",
                    });
                }
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    get_company_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company_id = req.body.company_id;
                const company_user_data = yield compayuser_model_1.default.findAll({
                    include: [
                        {
                            model: users_model_1.default,
                        }
                    ],
                    where: {
                        company_id: company_id,
                        canlogin: 1,
                        IsDeleted: 0,
                    },
                }).catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message
                    });
                });
                if (company_user_data) {
                    res
                        .status(response_codes_1.default.SUCCESS)
                        .json({
                        response_code: 1,
                        message: "data have been fetched successfully.",
                        data: company_user_data,
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "No data were found." });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    delete_company_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.user_id;
                const UserData = yield compayuser_model_1.default.findOne({
                    where: {
                        id: user_id,
                        IsDeleted: 0
                    }
                });
                if (UserData != null) {
                    //* This Array has been used to update two table check before any change
                    let updateData = {
                        IsDeleted: 1,
                        deleted_by: req.body.deleted_by,
                        deletedAt: response_strings_1.default.currentTime
                    };
                    //! Delete the User from Company Contacts table
                    yield compayuser_model_1.default.update(Object.assign({}, updateData), { where: { id: user_id } })
                        .then(function (data) {
                        //! Delete the User from user table
                        const login_table_id = UserData['login_table_id'];
                        users_model_1.default.update(Object.assign({}, updateData), { where: { id: login_table_id } }).then(function (data) {
                            res.status(response_codes_1.default.SUCCESS)
                                .json({
                                response_code: 1,
                                message: "Company user deleted successfully.",
                            });
                        }).catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                                response_code: 0,
                                message: "Oops! " + err.message
                            });
                        });
                    })
                        .catch(function (err) {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            response_code: 0,
                            message: "Oops! " + err.message
                        });
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 0,
                        message: "Oops! An invalid company user ID was entered, or this user was already deleted"
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    get_trainee_customize_form(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var company_id = req.body.company_id;
            yield traineeFormCustomize_model_1.default.findAll({
                include: {
                    required: true,
                    model: traineeFormMaster_model_1.default,
                    attributes: ['id', 'form_label', 'form_field'],
                    where: {
                        isDeleted: 0
                    },
                },
                attributes: ['id', 'isValidate'],
                where: {
                    company_id: company_id,
                    isDeleted: 0
                },
                //logging:console.log
            }).then(result => {
                if (result.length != 0) {
                    const initialValue = {};
                    let fromLabel = result.reduce((obj, item) => {
                        let ObjData = {
                            id: item['id'],
                            isValidate: item['isValidate'],
                            form_id: item['TraineeFormMasterModel']['form_field']
                        };
                        return Object.assign(Object.assign({}, obj), { [item['TraineeFormMasterModel']['form_label']]: ObjData });
                    }, initialValue);
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "Form Loading...", form: fromLabel });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "No Customize form Found" });
                }
            }).catch(err => {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + err.message });
            });
        });
    }
    get_company_card1_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TraineesData = yield trainee_model_1.default.findAll({
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0,
                        IsBlock: 0
                    }
                });
                let currentMonth = (0, moment_1.default)().format("YYYY-MM");
                let currentMonthText = (0, moment_1.default)().format("MMMM");
                let currentYearText = (0, moment_1.default)().format("YYYY");
                if (TraineesData.length != 0) {
                    let TraineeCurrentMonth = TraineesData.filter((element) => {
                        var elementMonth = (0, moment_1.default)(element['createdAt'], "YYYY-MM-DD").format("YYYY-MM");
                        if (currentMonth == elementMonth) {
                            return element;
                        }
                    });
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.GET,
                        currentYearText: currentYearText,
                        currentMonthText: currentMonthText,
                        currentMonthTraineesCount: TraineeCurrentMonth.length,
                        allTraineesCount: TraineesData.length
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 0,
                        message: "Oops! Trainees not register yet.",
                        currentYearText: currentYearText,
                        currentMonthText: currentMonthText,
                        currentMonthTraineesCount: 0,
                        allTraineesCount: 0
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    get_company_card2_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let where = {};
                if (req.body.trainer_id) {
                    where = {
                        IsDeleted: 0,
                        company_id: req.body.company_id,
                        trainer_id: req.body.trainer_id
                    };
                }
                else {
                    where = {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    };
                }
                const TraineesData = yield trainee_model_1.default.findAll({
                    include: [
                        {
                            model: trainee_curriculum_model_1.default,
                            where: {
                                IsDeleted: 0
                            }
                        }
                    ],
                    where: where
                });
                if (TraineesData.length != 0) {
                    //Get Block Trainees Filter
                    let BlockTrainees = TraineesData.filter((element) => {
                        if (element['IsBlock'] == "1") {
                            return element;
                        }
                    });
                    //Get Unblock Trainees Filter
                    let UnBlockTrainees = TraineesData.filter((element) => {
                        if (element['IsBlock'] == "0") {
                            return element;
                        }
                    });
                    let YetToStart = 0;
                    let Completed = 0;
                    let InProgress = 0;
                    for (let i = 0; i < UnBlockTrainees.length; i++) {
                        let TraineeCurriculums = UnBlockTrainees[i]['dataValues']['TraineeCurriculums'];
                        let TotalCurriculum = TraineeCurriculums.length;
                        let CurriculumNotAttempt = 0;
                        let CurriculumAttempt = 0;
                        let CurriculumPass = 0;
                        for (let j = 0; j < TraineeCurriculums.length; j++) {
                            yield curriculumbuilder_model_1.default.findAll({
                                where: {
                                    curriculum_id: TraineeCurriculums[j]['dataValues']['curriculum_id'],
                                    IsDeleted: 0
                                }
                            }).then((CurriculumBuilderData) => __awaiter(this, void 0, void 0, function* () {
                                let TotalTest = CurriculumBuilderData.length;
                                let ElearningResultTestNotAttempt = 0;
                                let ElearningResultTestAttempt = 0;
                                let ElearningResultTestPassed = 0;
                                let ElearningResultTestFailed = 0;
                                for (let k = 0; k < CurriculumBuilderData.length; k++) {
                                    yield eLearningresult_model_1.default.findOne({
                                        attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']],
                                        where: {
                                            curriculum_test_id: CurriculumBuilderData[k]['dataValues']['curriculum_parent_category_test_id'],
                                            trainee_id: UnBlockTrainees[i]['dataValues']['id'],
                                            IsDeleted: 0
                                        },
                                        // logging:console.log
                                    }).then((ElearningResultData) => {
                                        // if (ElearningResultData == null) {
                                        if (ElearningResultData['id'] == null) {
                                            ElearningResultTestNotAttempt += 1;
                                        }
                                        else {
                                            if (ElearningResultData['status'] == 'passed') {
                                                ElearningResultTestPassed += 1;
                                            }
                                            else if (ElearningResultData['status'] == 'failed') {
                                                ElearningResultTestFailed += 1;
                                            }
                                            ElearningResultTestAttempt += 1;
                                        }
                                        CurriculumBuilderData[k]['dataValues']['ElearningResult'] = ElearningResultData;
                                        TraineeCurriculums[j]['dataValues']['TotalTest'] = TotalTest;
                                        TraineeCurriculums[j]['dataValues']['CurriculumBuilder'] = CurriculumBuilderData;
                                    });
                                }
                                if (ElearningResultTestNotAttempt == TotalTest) {
                                    TraineeCurriculums[j]['dataValues']['AllCurriculumsTestNotAttempt'] = true;
                                    CurriculumNotAttempt += 1;
                                }
                                if (ElearningResultTestPassed == TotalTest) {
                                    TraineeCurriculums[j]['dataValues']['AllCurriculumsTestPassed'] = true;
                                    CurriculumPass += 1;
                                }
                                if (ElearningResultTestAttempt > 0 && ElearningResultTestAttempt <= TotalTest && ElearningResultTestPassed != TotalTest) {
                                    TraineeCurriculums[j]['dataValues']['AllCurriculumsTestAttempt'] = true;
                                    CurriculumAttempt += 1;
                                }
                            }));
                        }
                        UnBlockTrainees[i]['dataValues']['TotalCurriculum'] = TotalCurriculum;
                        if (CurriculumNotAttempt == TotalCurriculum) {
                            UnBlockTrainees[i]['dataValues']['AllCurriculumNotAttempt'] = true;
                            YetToStart += 1;
                        }
                        if (CurriculumPass == TotalCurriculum) {
                            UnBlockTrainees[i]['dataValues']['AllCurriculumsPassed'] = true;
                            Completed += 1;
                        }
                        // console.log("CurriculumAttempt->",CurriculumAttempt);
                        if (CurriculumAttempt == TotalCurriculum) {
                            UnBlockTrainees[i]['dataValues']['AllCurriculumAttempt'] = true;
                            InProgress += 1;
                        }
                    }
                    // console.log("UnBlockTrainees->",UnBlockTrainees)
                    let SuccessRatio = (Completed / UnBlockTrainees.length) * 100;
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.GET,
                        TotalTraineesRegister: UnBlockTrainees.length,
                        TotalBlockTrainees: BlockTrainees.length,
                        YetToStart: YetToStart,
                        Completed: Completed,
                        InProgress: InProgress,
                        SuccessRatio: Math.round(SuccessRatio)
                        // TotalTraineesData: UnBlockTrainees,
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "Oops! Trainees not register or assign yet.",
                        TotalTraineesRegister: 0,
                        TotalBlockTrainees: 0,
                        YetToStart: 0,
                        Completed: 0,
                        InProgress: 0,
                        SuccessRatio: 0
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
    get_company_card3_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let company_id = req.body.company_id;
                let panel_id = req.body.panel_id;
                let seriesData = Array();
                let xAxisData = Array();
                let TraineesData = yield trainee_model_1.default.findAll({
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    }
                });
                if (TraineesData.length != 0) {
                    if (panel_id == 3) {
                        const BranchData = yield subcompany_model_1.default.findAll({
                            where: {
                                company_id: company_id,
                                IsDeleted: 0
                            }
                        });
                        if (BranchData.length != 0) {
                            for (let i = 0; i < BranchData.length; i++) {
                                xAxisData[i] = BranchData[i]['name'];
                                let branchTrainees = TraineesData.filter((element) => {
                                    if (element['sub_company_id'] == BranchData[i]['id']) {
                                        return element;
                                    }
                                });
                                seriesData[i] = branchTrainees.length;
                            }
                        }
                        else {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 0,
                                message: response_strings_1.default.NOT
                            });
                        }
                    }
                    else if (panel_id == 2) {
                        const DepartmentData = yield company_department_model_1.default.findAll({
                            include: [
                                {
                                    model: master_department_model_1.default,
                                    where: {
                                        IsDeleted: 0,
                                        company_id: company_id
                                    }
                                }
                            ],
                            where: {
                                company_id: company_id,
                                IsDeleted: 0
                            }
                        });
                        if (DepartmentData.length != 0) {
                            for (let i = 0; i < DepartmentData.length; i++) {
                                xAxisData[i] = DepartmentData[i]['MasterDepartment']['name'];
                                let departmentTrainees = TraineesData.filter((element) => {
                                    if (element['department_id'] == DepartmentData[i]['id']) {
                                        return element;
                                    }
                                });
                                seriesData[i] = departmentTrainees.length;
                            }
                        }
                        else {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 0,
                                message: response_strings_1.default.NOT
                            });
                        }
                    }
                    else {
                        const TrainerData = yield trainer_model_1.default.findAll({
                            where: {
                                company_id: company_id,
                                IsDeleted: 0
                            }
                        });
                        if (TrainerData.length != 0) {
                            for (let i = 0; i < TrainerData.length; i++) {
                                xAxisData[i] = TrainerData[i]['name'];
                                let trainerTrainees = TraineesData.filter((element) => {
                                    if (element['trainer_id'] == TrainerData[i]['id']) {
                                        return element;
                                    }
                                });
                                seriesData[i] = trainerTrainees.length;
                            }
                        }
                        else {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 0,
                                message: response_strings_1.default.NOT
                            });
                        }
                    }
                    let options = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                            },
                        },
                        grid: {
                            right: '5%',
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true,
                                },
                                // prettier-ignore
                                data: xAxisData,
                                axisLabel: {
                                    interval: 0,
                                    //rotate: 30 //If the label names are too long you can manage this by rotating the label.
                                }
                            },
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: 'count',
                                min: 0,
                                max: TraineesData.length,
                                position: 'left',
                                axisLine: {
                                    show: true,
                                },
                            },
                        ],
                        series: [
                            {
                                type: 'bar',
                                barMaxWidth: 50,
                                // showBackground: true,
                                data: seriesData,
                            },
                        ],
                    };
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: response_strings_1.default.GET,
                        echartOption: options
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({
                        response_code: 0,
                        message: response_strings_1.default.NOT
                    });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Oops! " + error.message });
            }
        });
    }
}
exports.default = new CompanyController();
