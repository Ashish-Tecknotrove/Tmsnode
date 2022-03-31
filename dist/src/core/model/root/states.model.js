"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class States extends sequelize_1.Model {
}
exports.default = States;
States.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    },
    slug: {
        type: sequelize_typescript_1.DataType.STRING
    },
    state_code: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    },
    country_id: {
        type: sequelize_typescript_1.DataType.INTEGER
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
    tableName: 'states'
});
