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
const simulator_model_1 = __importDefault(require("../../../../core/model/root/simulator.model"));
const trainer_model_1 = __importDefault(require("../../../../core/model/root/trainer.model"));
const sequelize_1 = require("sequelize");
class SimulatorController {
    getSimulator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.created_at = response_strings_1.default.currentTime;
                let where_condition = {};
                if (req.body.company_id) {
                    where_condition = {
                        company_id: req.body.company_id,
                        IsDeleted: 0,
                    };
                }
                else {
                    where_condition = {
                        IsDeleted: 0,
                    };
                }
                yield simulator_model_1.default.findAll({
                    where: where_condition,
                })
                    .then((response) => __awaiter(this, void 0, void 0, function* () {
                    if (response.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "Simulator fetched  successfully.",
                            data: response,
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 0,
                            message: "Oops! No Simulator found",
                            data: [],
                        });
                    }
                }))
                    .catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message,
                        data: [],
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: [],
                });
            }
        });
    }
    assignSimulator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // req.body.updatedAt = responseStrings.currentTime;
                yield simulator_model_1.default.findAll({
                    where: {
                        id: req.body.simulator_id,
                        [sequelize_1.Op.or]: [{ trainer_id: null }, { trainer_id: "" }],
                        IsDeleted: 0,
                    },
                    logging: console.log
                }).then((response) => __awaiter(this, void 0, void 0, function* () {
                    if (response.length != 0) {
                        var update_body = {
                            trainer_id: req.body.trainer_id,
                            updatedAt: response_strings_1.default.currentTime,
                            updated_by: response_strings_1.default.currentTime
                        };
                        yield simulator_model_1.default.update(Object.assign({}, update_body), { where: { id: req.body.simulator_id } })
                            .then((data) => {
                            res.status(response_codes_1.default.SUCCESS).json({
                                response_code: 1,
                                message: "Simulator Assigned Successfully.",
                                data: "",
                            });
                        })
                            .catch((err) => {
                            res.status(response_codes_1.default.BAD_REQUEST).json({
                                response_code: 0,
                                message: "Oops! " + err.message,
                                data: "",
                            });
                        });
                    }
                    else {
                        res.status(response_codes_1.default.BAD_REQUEST).json({
                            response_code: 0,
                            message: "Oops! Simulator has been assigned to another trainer",
                            data: "",
                        });
                    }
                }))
                    .catch((err) => {
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
    unassignSimulator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // req.body.updatedAt = responseStrings.currentTime;
                var update_body = {
                    trainer_id: null,
                    updatedAt: response_strings_1.default.currentTime,
                    updated_by: response_strings_1.default.currentTime
                };
                yield simulator_model_1.default.update(Object.assign({}, update_body), { where: { id: req.body.simulator_id } })
                    .then((data) => {
                    res.status(response_codes_1.default.SUCCESS).json({
                        response_code: 1,
                        message: "Simulator Unassigned Successfully.",
                        data: "",
                    });
                })
                    .catch((err) => {
                    res.status(response_codes_1.default.BAD_REQUEST).json({
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
    get_company_simulator_list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield simulator_model_1.default.findAll({
                    include: [{
                            model: trainer_model_1.default,
                            required: false,
                            where: {
                                IsDeleted: 0,
                                IsBlock: 0
                            }
                        }],
                    where: {
                        company_id: req.body.company_id,
                        IsDeleted: 0
                    },
                })
                    .then((response) => __awaiter(this, void 0, void 0, function* () {
                    if (response.length != 0) {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 1,
                            message: "Simulator fetched  successfully.",
                            data: response,
                        });
                    }
                    else {
                        res.status(response_codes_1.default.SUCCESS).json({
                            response_code: 0,
                            message: "Oops! No Simulator found",
                            data: [],
                        });
                    }
                }))
                    .catch((err) => {
                    res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        response_code: 0,
                        message: "Oops! " + err.message,
                        data: [],
                    });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: "Oops! " + err.message,
                    data: [],
                });
            }
        });
    }
}
exports.default = new SimulatorController();
