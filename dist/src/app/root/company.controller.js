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
class CompanyController {
    registerCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var company_name = req.body.company_name;
                const checkName = yield company_model_1.default.findOne({
                    where: {
                        company_name: company_name,
                    },
                });
                if (checkName == null) {
                    req.body.updated_by = "";
                    req.body.createdAt = response_strings_1.default.currentTime;
                    yield company_model_1.default.create(Object.assign({}, req.body))
                        .then(function (response) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({
                            response_code: 1,
                            message: response_strings_1.default.ADD,
                            data: response,
                        });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.CREATED)
                        .json({
                        response_code: 0,
                        message: "company with same name already exits",
                    });
                }
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: error.message });
            }
        });
    }
    total_companies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var company_count = yield company_model_1.default.count({
                    where: {
                        IsDeleted: 0,
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
                        .json({ response_code: 0, message: error.message });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: error.message });
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
                        .json({ response_code: 0, message: err.message });
                });
                if (check_company_is_valid != null) {
                    req.body.updatedAt = response_strings_1.default.currentTime;
                    yield company_model_1.default.update(Object.assign({}, req.body), { where: { id: company_id } })
                        .then(function (data) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, message: response_strings_1.default.UPDATED });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.BAD_REQUEST)
                        .json({
                        response_code: 0,
                        message: "Invalid Company please check company id or company is deleted",
                    });
                }
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: error.message });
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
                    logging: console.log,
                }).catch((err) => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err });
                });
                if (check_company_is_valid != null) {
                    let updateData = {
                        IsDeleted: 1,
                        deletedAt: response_strings_1.default.currentTime,
                        deleted_by: req.body.deleted_by,
                    };
                    yield company_model_1.default.update(Object.assign({}, updateData), { where: { id: company_id } })
                        .then(function (data) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, message: response_strings_1.default.DELETE });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.BAD_REQUEST)
                        .json({
                        response_code: 0,
                        message: "Invalid Company please check company id or company is deleted",
                    });
                }
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: error.message });
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
                    where_condition = { id: company_id, IsDeleted: 0 };
                    include_condition = {};
                }
                //TODO Get All Company
                else {
                    where_condition = { IsDeleted: 0 };
                }
                const getCompany = yield company_model_1.default.findAll({
                    where: where_condition,
                    order: [["id", "DESC"]],
                })
                    .then((data) => {
                    if (data.length != 0) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({
                            response_code: 1,
                            message: response_strings_1.default.GET,
                            data: data,
                        });
                    }
                    else {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 0, message: "no data found" });
                    }
                })
                    .catch((err) => {
                    console.log(err);
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: error.message });
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
                            attributes: ['id', 'name', 'department', 'mobile_no', 'canlogin'],
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
                    logging: console.log,
                    where: {
                        id: req.body.company_id,
                        IsDeleted: 0
                    }
                }).then((result) => {
                    if (result != null) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({
                            response_code: 1,
                            message: response_strings_1.default.GET,
                            data: result,
                        });
                    }
                    else {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 0, message: response_strings_1.default.NOT });
                    }
                });
            }
            catch (err) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
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
                        message: "company user added",
                        data: data,
                    });
                })
                    .catch(function (err) {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: err.message });
                });
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: error.message });
            }
        });
    }
    add_company_login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Table Fields for Company Contact
                const company_contact = {
                    company_id: req.body.company_id,
                    name: req.body.name,
                    department: req.body.department,
                    mobile_no: req.body.mobile_no,
                    canlogin: 1,
                    created_by: req.body.created_by,
                    updated_by: "",
                    createdAt: response_strings_1.default.currentTime
                };
                const checkUserExist = yield compayuser_model_1.default.findAll({
                    where: {
                        name: req.body.name,
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    }
                });
                if (checkUserExist.length == 0) {
                    yield compayuser_model_1.default.create(Object.assign({}, company_contact))
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
                                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: err.message });
                            });
                            res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: response_strings_1.default.ADD });
                            response_codes_1.default;
                        })
                            .catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    })
                        .catch(function (err) {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.BAD_REQUEST).json({ response_code: 0, message: "Contact with same name already exist" });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: error.message });
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
                        .json({ response_code: 0, message: err.message });
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
                            department: req.body.department,
                            updated_by: req.body.updated_by,
                            updatedAt: response_strings_1.default.currentTime
                        };
                        users_model_1.default.update(user_table_update, { where: { id: user_login_id } }).then(function (data) {
                            res
                                .status(response_codes_1.default.SUCCESS)
                                .json({ response_code: 1, message: response_strings_1.default.UPDATED });
                        }).catch((err) => {
                            res
                                .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 1, message: err.message });
                        });
                    })
                        .catch(function (err) {
                        res
                            .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                            .json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res
                        .status(response_codes_1.default.BAD_REQUEST)
                        .json({
                        response_code: 0,
                        message: "Invalid Company User  please check user id or user is deleted",
                    });
                }
            }
            catch (error) {
                return res
                    .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: error.message });
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
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                });
                if (company_user_data) {
                    res
                        .status(response_codes_1.default.SUCCESS)
                        .json({
                        response_code: 0,
                        message: "company user fetched successfully...",
                        data: company_user_data,
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "no data found" });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: error.message });
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
                                message: response_strings_1.default.DELETE,
                            });
                        }).catch(function (err) {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    })
                        .catch(function (err) {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else {
                    res.status(response_codes_1.default.SUCCESS).json({ response_code: 0, message: "User Id is not valid" });
                }
            }
            catch (error) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: error.message });
            }
        });
    }
}
exports.default = new CompanyController();
