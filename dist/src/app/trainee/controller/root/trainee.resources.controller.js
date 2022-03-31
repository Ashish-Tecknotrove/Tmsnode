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
const trainee_curriculum_model_1 = __importDefault(require("../../../../core/model/root/trainee_curriculum.model"));
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
const technology_model_1 = __importDefault(require("../../../../core/model/root/technology.model"));
//TODO THIS FILE CREATED TOTALLY FOR TRAINEE DASHBOARD API FOR ELEARNING 
class TraineeResources {
    getTechnologiesAllotedToTrainee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield trainee_curriculum_model_1.default.findAll({
                    include: [{
                            model: technology_model_1.default,
                            attributes: ['id', 'name'],
                            where: { IsDeleted: 0 }
                        }],
                    where: {
                        trainee_id: req.body.trainee_id,
                        IsBlock: 0,
                        IsDeleted: 0
                    },
                    attributes: ['TechnologyCategory.name'],
                    group: ['TraineeCurriculum.technology_id']
                }).then((techData) => {
                    if (techData.length != 0) {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 1, message: "Technologies Loaded", data: techData });
                    }
                    else {
                        res
                            .status(response_codes_1.default.SUCCESS)
                            .json({ response_code: 0, message: "Oops! no curriculum has been alloted to you." });
                    }
                }, err => {
                    res
                        .status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                        .json({ response_code: 0, message: "Oops! " + err.message });
                });
            }
            catch (err) {
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: "Oops! " + err.message });
            }
        });
    }
}
exports.default = new TraineeResources();
