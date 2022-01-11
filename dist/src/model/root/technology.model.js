"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class TechnologyCategory extends sequelize_1.Model {
}
exports.default = TechnologyCategory;
TechnologyCategory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'technology_type'
});