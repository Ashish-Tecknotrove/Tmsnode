"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class CurriculumParentCategory extends sequelize_1.Model {
}
exports.default = CurriculumParentCategory;
CurriculumParentCategory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    technology_type_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: 'curriculum_parent_category'
});
