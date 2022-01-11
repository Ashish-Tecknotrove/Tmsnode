"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const language_model_1 = __importDefault(require("../model/language/language.model"));
const company_model_1 = __importDefault(require("../model/root/company.model"));
const compayuser_model_1 = __importDefault(require("../model/root/compayuser.model"));
const subscription_model_1 = __importDefault(require("../model/root/subscription.model"));
const trainee_model_1 = __importDefault(require("../model/root/trainee.model"));
const trainer_model_1 = __importDefault(require("../model/root/trainer.model"));
const users_model_1 = __importDefault(require("../model/root/users.model"));
const isDevelopment = process.env.NODE_ENV === 'development';
const dbinitialized = () => {
    //TODO Root Model START 
    users_model_1.default.sync();
    language_model_1.default.sync();
    company_model_1.default.sync();
    trainee_model_1.default.sync();
    trainer_model_1.default.sync();
    compayuser_model_1.default.sync();
    subscription_model_1.default.sync();
    //TODO Root Model END 
};
exports.default = dbinitialized;
