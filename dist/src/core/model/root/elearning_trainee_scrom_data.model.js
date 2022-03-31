"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const trainee_model_1 = __importDefault(require("./trainee.model"));
class ElearningTraineeScromData extends sequelize_1.Model {
}
exports.default = ElearningTraineeScromData;
ElearningTraineeScromData.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    test_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    trainee_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: trainee_model_1.default,
            key: 'id'
        }
    },
    attempt_no: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    mark: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    createdAt: {
        type: "TIMESTAMP",
    },
    updatedAt: {
        type: "TIMESTAMP",
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: "0"
    }
}, {
    sequelize: sequelize_2.default,
    tableName: "elearning_trainee_scrom_data"
});
