"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class ElearningMaster extends sequelize_1.Model {
}
exports.default = ElearningMaster;
ElearningMaster.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    test_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "curriculum_parent_category_test",
            key: "id"
        }
    },
    zipname: {
        type: sequelize_1.DataTypes.STRING
    },
    link: {
        type: sequelize_1.DataTypes.STRING,
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER
    },
    delete_by: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: 'elearning_master',
    sequelize: sequelize_2.default
});
