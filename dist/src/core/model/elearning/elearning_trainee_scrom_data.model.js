"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const trainee_model_1 = __importDefault(require("../root/trainee.model"));
class ElearningTraineeScromData extends sequelize_1.Model {
}
exports.default = ElearningTraineeScromData;
ElearningTraineeScromData.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    session_id: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    test_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    trainee_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: trainee_model_1.default,
            key: 'id'
        }
    },
    attempt_no: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    question: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    answer: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    mark: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    updatedAt: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: "0"
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: "elearning_trainee_scrom_data"
});
