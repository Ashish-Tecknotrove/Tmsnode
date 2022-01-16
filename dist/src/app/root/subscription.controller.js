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
const subscription_model_1 = __importDefault(require("../../model/root/subscription.model"));
class SubscriptionController {
    createNewSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var checkSubscriptionExist = yield subscription_model_1.default.findOne({
                where: {
                    curriculum_id: req.body.curriculum_id,
                    company_id: req.body.company_id,
                    status: "0"
                },
                logging: console.log
            });
            if (checkSubscriptionExist == null) {
                yield subscription_model_1.default.create(Object.assign({}, req.body)).then(function (data) {
                    res.status(200).json({ response_code: 1, message: "New Subscription Created" });
                }).catch(function (err) {
                    res.status(500).json({ response_code: 0, message: err });
                });
            }
            else {
                res.status(500).json({ response_code: 0, message: "Subscription Already Exist" });
            }
        });
    }
}
exports.default = new SubscriptionController();
