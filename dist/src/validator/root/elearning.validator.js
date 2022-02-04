"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ElearningValidator {
    checkElearning() {
        return [
            (0, express_validator_1.body)('test_id').notEmpty().withMessage('parameter is missing')
        ];
    }
}
exports.default = new ElearningValidator();
