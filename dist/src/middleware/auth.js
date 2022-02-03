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
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const response_strings_1 = __importDefault(require("../strings/response-strings"));
const response_codes_1 = __importDefault(require("../strings/response-codes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Middleware {
    handleValidatorError(req, res, next) {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(response_codes_1.default.BAD_REQUEST).json(error.array()[0]);
        }
        next();
    }
    generateAuth(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, jsonwebtoken_1.sign)(payload, process.env.jwt_secreate, { expiresIn: 172800 });
            // return sign(payload,process.env.jwt_secreate as string,{expiresIn:160*160});
        });
    }
    verifyAuthenticateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authheader = req.header('authorization');
                const token = authheader && authheader.split(" ")[1];
                if (token == null)
                    return res.status(response_codes_1.default.UNAUTHORIZED).json({ response_code: 0, message: response_strings_1.default.tokenExpired });
                yield (0, jsonwebtoken_1.verify)(token, process.env.jwt_secreate, (err, user) => {
                    if (err) {
                        return res.status(response_codes_1.default.UNAUTHORIZED).json({ error: response_strings_1.default.tokenExpired });
                    }
                    else {
                        next();
                    }
                });
            }
            catch (error) {
                res.status(response_codes_1.default.UNAUTHORIZED).send(response_strings_1.default.tokenExpired);
            }
        });
    }
}
exports.default = new Middleware();
