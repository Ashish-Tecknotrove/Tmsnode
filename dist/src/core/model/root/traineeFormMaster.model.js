"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class TraineeFormMasterModel extends sequelize_1.Model {
}
exports.default = TraineeFormMasterModel;
TraineeFormMasterModel.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    form_field: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    form_label: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    custom: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    updatedAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: 'trainee_form_master'
});
