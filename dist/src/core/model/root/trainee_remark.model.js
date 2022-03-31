"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const curriculumbuilder_model_1 = __importDefault(require("./curriculumbuilder.model"));
const trainee_model_1 = __importDefault(require("./trainee.model"));
const trainer_model_1 = __importDefault(require("./trainer.model"));
const curriculum_model_1 = __importDefault(require("./curriculum.model"));
class TraineeRemarks extends sequelize_1.Model {
}
exports.default = TraineeRemarks;
TraineeRemarks.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    trainee_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: trainee_model_1.default,
            key: 'id'
        }
    },
    trainer_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: trainer_model_1.default,
            key: 'id'
        }
    },
    curriculum_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: curriculum_model_1.default,
            key: 'id'
        }
    },
    curriculum_builder_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: curriculumbuilder_model_1.default,
            key: 'id'
        }
    },
    remarks: {
        type: sequelize_typescript_1.DataType.STRING
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    deleted_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    updatedAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    deletedAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'trainee_remark'
});
