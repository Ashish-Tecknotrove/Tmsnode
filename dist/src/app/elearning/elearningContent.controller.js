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
const eLearningmaster_model_1 = __importDefault(require("../../model/elearning/eLearningmaster.model"));
class ElearningContent {
    elearningTestLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //var createdBy=req.body.createdBy;
            try {
                yield eLearningmaster_model_1.default.create(Object.assign({}, req.body)).then(function (data) {
                    res.status(200).json({ response_code: 1, message: "Elearning Content Uploaded", data: data });
                    //logController.createLog(createdBy,"New Elearning Content Updated");
                }).catch(err => {
                    res.status(500).json({ response_code: 0, message: err });
                });
            }
            catch (err) {
                res.status(500).json({ response_code: 0, message: err });
            }
            res.status(500).json({ response_code: 0, message: "Done" });
        });
    }
}
exports.default = new ElearningContent();
