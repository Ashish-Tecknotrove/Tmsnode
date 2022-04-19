"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class ElearningTrainingSession extends sequelize_1.Model {
}
exports.default = ElearningTrainingSession;
ElearningTrainingSession.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    session_id: {
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        unique: true
    },
    trainee_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: 'trainees',
            key: 'id'
        }
    },
    status: {
        type: sequelize_typescript_1.DataType.ENUM('0', '1'),
        defaultValue: "0",
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.DATE
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: "elearning_training_session"
});
