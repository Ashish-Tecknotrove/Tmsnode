"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = __importDefault(require("../../database/sequelize"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../root/curriculum_parent_category_test.model"));
class ElearningMaster extends sequelize_2.Model {
}
exports.default = ElearningMaster;
ElearningMaster.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    test_id: {
        type: sequelize_2.DataTypes.INTEGER,
        references: {
            model: curriculum_parent_category_test_model_1.default,
            key: "id"
        }
    },
    zipname: {
        type: sequelize_2.DataTypes.STRING
    },
    folderName: {
        type: sequelize_2.DataTypes.STRING
    },
    link: {
        type: sequelize_2.DataTypes.STRING,
    },
    created_by: {
        type: sequelize_2.DataTypes.INTEGER
    },
    updated_by: {
        type: sequelize_2.DataTypes.INTEGER
    },
    delete_by: {
        type: sequelize_2.DataTypes.INTEGER
    },
    deleteAt: {
        type: sequelize_2.DataTypes.STRING
    },
    IsDeleted: {
        type: sequelize_1.TINYINT,
        defaultValue: "0"
    }
}, {
    tableName: 'elearning_master',
    sequelize: sequelize_3.default
});
// ElearningMaster.belongsTo(CurriculumParentCategoryTest, {
//   foreignKey: "test_id",
//   as:""
// });
