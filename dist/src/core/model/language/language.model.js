"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const app_label_value_1 = __importDefault(require("./app.label.value"));
class Languages extends sequelize_1.Model {
}
exports.default = Languages;
Languages.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true
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
    tableName: 'languages'
});
Languages.hasMany(app_label_value_1.default, {
    sourceKey: "id",
    foreignKey: 'f_languageid',
    as: 'app_label_value'
});
app_label_value_1.default.belongsTo(Languages, {
    foreignKey: "f_languageid",
    targetKey: "id"
});
