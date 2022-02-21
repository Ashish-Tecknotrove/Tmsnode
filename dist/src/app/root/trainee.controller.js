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
const csv_parse_1 = require("csv-parse");
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
                let check_trainee_exits = yield trainee_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0
                    }
                });
                let check_trainee_login_exist = yield users_model_1.default.findAll({
                    where: {
                        email: req.body.email,
                        IsDeleted: 0
                    }
                });
                if (check_trainee_exits.length != 0 && check_trainee_login_exist.length != 0) {
                    yield trainee_model_1.default.create(Object.assign({}, req.body)).then(data => {
                        var user_login_body = {
                            email: req.body.email,
                            password: req.body.password,
                            user_type: 3,
                            language: req.body.language,
                            createdAt: response_strings_1.default.currentTime,
                            updatedAt: '',
                            created_by: req.body.created_by
                        };
                        users_model_1.default.create(Object.assign({}, req.body)).then(data => {
                            res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Trainee added successfully..." });
                        }).catch(err => {
                            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                        });
                    }).catch(err => {
                        res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
                    });
                }
                else if (check_trainee_exits.length != 0 && check_trainee_login_exist.length == 0) {
                    var user_login_body = {
                        email: req.body.email,
                        password: req.body.password,
                        user_type: 3,
                        language: req.body.language,
                        createdAt: response_strings_1.default.currentTime,
                        updatedAt: '',
                        created_by: req.body.created_by
                    };
                    users_model_1.default.create(Object.assign({}, req.body)).then(data => {
                        res.status(response_codes_1.default.SUCCESS).json({ response_code: 1, message: "Trainee Already Exits \n But Login Crediantial Not Found \n Login Crediantial Created" });
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
    bulkInsertTrainee(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            //var course_id = req.body.course_id;
            // console.log(req.file?.filename);
            try {
                const csv_file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                const header = ['first_name', 'last_name'];
                (0, csv_parse_1.parse)(csv_file, {
                    delimiter: ',',
                    columns: header,
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                    }
                    console.log("Result", result);
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
            }
        });
    }
}
exports.default = new TraineeController();
