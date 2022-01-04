"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../model/root/users.model"));
const isDevelopment = process.env.NODE_ENV === 'development';
const dbinitialized = () => {
    users_model_1.default.sync({ alter: isDevelopment });
};
exports.default = dbinitialized;
