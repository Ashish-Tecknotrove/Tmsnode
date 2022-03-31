"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_model_1 = __importDefault(require("../../model/root/log.model"));
class LogController {
    createLog(id, message) {
        var logdata = {
            user_id: id,
            message: message
        };
        log_model_1.default.create(Object.assign({}, logdata)).then(sucess => {
            console.log("Log generated successfully");
        }).catch(err => {
            console.log("Error Generating Log");
        });
    }
}
exports.default = new LogController();
