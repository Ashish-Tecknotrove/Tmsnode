"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const technology_model_1 = __importDefault(require("./technology.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("./curriculum_parent_category_test.model"));
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
        references: {
            model: technology_model_1.default,
            key: "id"
        }
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        type: "TIMESTAMP"
    },
    updatedAt: {
        type: "TIMESTAMP"
    },
    deletedAt: {
        type: "TIMESTAMP"
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: 'curriculum_parent_category'
});
CurriculumParentCategory.belongsTo(technology_model_1.default, {
    foreignKey: "technology_type_id"
});
CurriculumParentCategory.hasMany(curriculum_parent_category_test_model_1.default, {
    foreignKey: "parent_id"
});
