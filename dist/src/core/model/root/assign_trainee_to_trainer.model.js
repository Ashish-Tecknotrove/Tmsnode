"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const trainer_model_1 = __importDefault(require("./trainer.model"));
const trainee_model_1 = __importDefault(require("./trainee.model"));
const sequelize_typescript_1 = require("sequelize-typescript");
class Assign_trainee_to_trainer extends sequelize_1.Model {
}
exports.default = Assign_trainee_to_trainer;
Assign_trainee_to_trainer.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    trainer_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: trainer_model_1.default,
            key: 'id'
        },
        allowNull: false
    },
    trainee_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: trainee_model_1.default,
            key: 'id'
        },
        allowNull: false
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    deleted_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    updatedAt: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    deletedAt: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    IsBlock: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: 'assign_trainee_to_trainer'
});
Assign_trainee_to_trainer.belongsTo(trainee_model_1.default, {
    foreignKey: 'trainee_id'
});
