"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
class Curriculum extends sequelize_1.Model {
}
exports.default = Curriculum;
Curriculum.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: company_model_1.default,
            key: "id"
        }
    },
    name: {
        type: sequelize_typescript_1.DataType.STRING(100),
    },
    sequence: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: "1"
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
    tableName: 'curriculum'
});
// Curriculum.hasMany(CurriculumBuilder,{
//     foreignKey:"curriculum_id",
//     //as:"UsedSubscription"
// })
// CurriculumBuilder.belongsTo(Curriculum, {
//     foreignKey: "curriculum_id"
// })
//
// Curriculum.hasMany(TraineeCurriculum,{
//     foreignKey:"curriculum_id",
//     as:""
// })
// Curriculum.belongsTo(Company,{
//     foreignKey:"company_id"
// })
// Curriculum.belongsTo(Subscription,{
//     foreignKey:'curriculum_id'
// })
