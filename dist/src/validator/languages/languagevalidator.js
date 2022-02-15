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
    //* LabelsModule 
    // Last Work #(Vipul) 
    chechCreateAppLabel() {
        return [
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').custom((value) => {
                if ((/\s/).test(value)) {
                    throw new Error('Label should be without whitespace');
                }
                // Indicates the success of this synchronous custom validator
                return true;
            }),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    chechUpdateAppLabel() {
        return [
            (0, express_validator_1.body)('appLabelId').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').custom((value) => {
                if ((/\s/).test(value)) {
                    throw new Error('Label should be without whitespace');
                }
                // Indicates the success of this synchronous custom validator
                return true;
            }),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    chechDeleteAppLabel() {
        return [
            (0, express_validator_1.body)('appLabelId').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('deleted_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    //* End LabelsModule 
    checkCreateAppLabelValue() {
        return [
            (0, express_validator_1.body)('name').notEmpty().withMessage("parameter is missing"),
            (0, express_validator_1.body)('f_languageid').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('f_labelid').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    checkupdateAppLabelValue() {
        return [
            (0, express_validator_1.body)('applabelvalueid').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('name').notEmpty().withMessage("parameter is missing"),
            (0, express_validator_1.body)('updated_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    chechDeleteAppLabelValue() {
        return [
            (0, express_validator_1.body)('applabelvalueid').notEmpty().withMessage('parameter is missing'),
            (0, express_validator_1.body)('deleted_by').notEmpty().withMessage('parameter is missing')
        ];
    }
    chechGetAppLabelValue() {
        return [
            (0, express_validator_1.body)('f_labelid').notEmpty().withMessage('parameter is missing'),
        ];
    }
}
exports.default = new LanguageValidator();
