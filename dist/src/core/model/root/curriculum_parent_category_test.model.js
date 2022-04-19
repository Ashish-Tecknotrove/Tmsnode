"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const eLearningmaster_model_1 = __importDefault(require("../elearning/eLearningmaster.model"));
const language_model_1 = __importDefault(require("../language/language.model"));
const curriculum_parent_category_model_1 = __importDefault(require("./curriculum_parent_category.model"));
const technology_model_1 = __importDefault(require("./technology.model"));
class CurriculumParentCategoryTest extends sequelize_1.Model {
}
exports.default = CurriculumParentCategoryTest;
CurriculumParentCategoryTest.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    prefix: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    title: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    description: {
        type: sequelize_typescript_1.DataType.STRING(200)
    },
    parent_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: curriculum_parent_category_model_1.default,
            key: "id"
        }
    },
    technology_type_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: technology_model_1.default,
            key: "id"
        }
    },
    language_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: language_model_1.default,
            key: "id"
        }
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
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
        type: sequelize_typescript_1.DataType.STRING(50)
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: 'curriculum_parent_category_test'
});
//TODO ASSOCATION Curriculum Parent Category
// CurriculumParentCategoryTest.belongsTo(CurriculumParentCategory,{
// foreignKey:'technology_type_id'
// })
//TODO ASSOCATION Technology Category
CurriculumParentCategoryTest.belongsTo(technology_model_1.default, {
    foreignKey: 'technology_type_id'
});
//TODO ASSOCATION LANGUAGE
CurriculumParentCategoryTest.belongsTo(language_model_1.default, {
    foreignKey: 'language_id'
});
CurriculumParentCategoryTest.hasOne(eLearningmaster_model_1.default, {
    foreignKey: "test_id"
});
