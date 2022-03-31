"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../root/curriculum_parent_category_test.model"));
class ElearningMaster extends sequelize_1.Model {
}
exports.default = ElearningMaster;
ElearningMaster.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    test_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: curriculum_parent_category_test_model_1.default,
            key: "id"
        }
    },
    zipname: {
        type: sequelize_typescript_1.DataType.STRING
    },
    folderName: {
        type: sequelize_typescript_1.DataType.STRING
    },
    link: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    thumbImg: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    delete_by: {
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
        defaultValue: "0"
    }
}, {
    tableName: 'elearning_master',
    sequelize: sequelize_2.default
});
// ElearningMaster.belongsTo(CurriculumParentCategoryTest, {
//   foreignKey: "test_id",
//   as:""
// });
