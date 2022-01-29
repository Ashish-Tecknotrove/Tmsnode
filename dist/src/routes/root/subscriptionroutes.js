"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const subscription_validator_1 = __importDefault(require("../../validator/root/subscription.validator"));
const subscription_controller_1 = __importDefault(require("../../app/root/subscription.controller"));
const Router = express.Router();
var multer = require('multer');
var formData = multer();
//TODO Create Subscription
Router.post('/createSubscription', formData.none(), auth_1.default.verifyAuthenticateToken, subscription_validator_1.default.newSubscriptionParameter(), auth_1.default.handleValidatorError, subscription_controller_1.default.createNewSubscription);
Router.post('/updateSubscription', formData.none(), auth_1.default.verifyAuthenticateToken, subscription_validator_1.default.updateSubscriptionParameter(), auth_1.default.handleValidatorError, subscription_controller_1.default.updateSubscription);
Router.post('/deleteSubscription', formData.none(), auth_1.default.verifyAuthenticateToken, subscription_validator_1.default.deleteSubscriptionParameter(), auth_1.default.handleValidatorError, subscription_controller_1.default.deleteSubscription);
Router.get('/subscriptionCount', subscription_controller_1.default.total_subscription);
Router.post('/getSubscription', formData.none(), auth_1.default.verifyAuthenticateToken, subscription_controller_1.default.getSubscription);
exports.default = Router;
