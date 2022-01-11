"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class LoginValidator {
    checkLoginParameters() {
        return [
            (0, express_validator_1.body)('username').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('password').notEmpty().withMessage('parameter is missing')
        ];
    }
}
exports.default = new LoginValidator();
