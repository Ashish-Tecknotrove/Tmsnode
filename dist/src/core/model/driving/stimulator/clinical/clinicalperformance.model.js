"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../database/sequelize"));
const company_model_1 = __importDefault(require("../../../root/company.model"));
const trainee_model_1 = __importDefault(require("../../../root/trainee.model"));
const trainer_model_1 = __importDefault(require("../../../root/trainer.model"));
class ClinicalPerformance extends sequelize_1.Model {
}
exports.default = ClinicalPerformance;
ClinicalPerformance.init({
    Id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: company_model_1.default,
            key: "id"
        }
    },
    trainer_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: trainer_model_1.default,
            key: "id"
        }
    },
    trainee_enrollmentId: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: trainee_model_1.default,
            key: "enrollmentId"
        }
    },
    LanguageCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    VehicleTypeCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    VehicleTypeCTOtherLang: {
        type: sequelize_typescript_1.DataType.STRING
    },
    TransmissionCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    TransmissionCTOtherLang: {
        type: sequelize_typescript_1.DataType.STRING
    },
    ModuleCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    ModuleCTOtherLang: {
        type: sequelize_typescript_1.DataType.STRING
    },
    ReactionTimeCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    DateTimeCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    OccurenceCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    PrePostCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    FaultsCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    TotalScoreCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    ResultCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    ResultCTOtherLang: {
        type: sequelize_typescript_1.DataType.STRING
    },
    RemarksCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    RemarksCTOtherLang: {
        type: sequelize_typescript_1.DataType.STRING
    },
    SessionStatusCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    SessionStatusCTOtherLang: {
        type: sequelize_typescript_1.DataType.STRING
    },
    CurriculumNameCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    CurriculumNameCTOtherLang: {
        type: sequelize_typescript_1.DataType.STRING
    },
    CurriculumStartDateCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    CBOccurenceCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    NotesCT: {
        type: sequelize_typescript_1.DataType.STRING
    },
    ScenarioType: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Sync: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 1
    },
    created_by: {
        type: sequelize_typescript_1.DataType.STRING
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.STRING
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    },
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: 'clinicaltestperformance'
});
ClinicalPerformance.belongsTo(trainer_model_1.default, {
    foreignKey: 'trainer_id'
});
