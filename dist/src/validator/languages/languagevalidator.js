"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class LanguageValidator {
    checkCreateLanguage() {
        return [
            (0, express_validator_1.body)('name')
                .notEmpty()
                .withMessage('name value should not be empty')
        ];
    }
    //App Label value Model
    checkCreateAppLabel() {
        return [
            (0, express_validator_1.body)('f_languageid').notEmpty().withMessage('Language Id should not be empty'),
            (0, express_validator_1.body)('f_labelid').notEmpty().withMessage('Label Id should not be empty'),
            (0, express_validator_1.body)('name').notEmpty().withMessage("name should not be empty")
        ];
    }
}
exports.default = new LanguageValidator();
