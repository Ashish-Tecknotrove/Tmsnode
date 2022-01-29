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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Middleware {
    handleValidatorError(req, res, next) {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array()[0]);
        }
        next();
    }
    generateAuth(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, jsonwebtoken_1.sign)(payload, process.env.jwt_secreate, { expiresIn: 160 * 160 });
        });
    }
    verifyAuthenticateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authheader = req.header('authorization');
                const token = authheader && authheader.split(" ")[1];
                if (token == null)
                    return res.status(401).json({ response_code: 0, message: "Invalid Token" });
                yield (0, jsonwebtoken_1.verify)(token, process.env.jwt_secreate, (err, user) => {
                    if (err) {
                        return res.status(401).json({ error: err });
                    }
                    else {
                        next();
                    }
                });
            }
            catch (error) {
                res.status(401).send("Invalid token");
            }
        });
    }
}
exports.default = new Middleware();
