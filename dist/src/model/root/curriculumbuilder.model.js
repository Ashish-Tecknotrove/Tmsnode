"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const curriculum_model_1 = __importDefault(require("./curriculum.model"));
const curriculum_parent_category_model_1 = __importDefault(require("./curriculum_parent_category.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("./curriculum_parent_category_test.model"));
class CurriculumBuilder extends sequelize_1.Model {
}
exports.default = CurriculumBuilder;
CurriculumBuilder.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    curriculum_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: curriculum_model_1.default,
            key: "id"
        }
    },
    vehicle_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    curriculum_parent_category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: curriculum_parent_category_model_1.default,
            key: "id"
        }
    },
    curriculum_parent_category_test_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: curriculum_parent_category_test_model_1.default,
            key: "id"
        }
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: 'trainees'
});
