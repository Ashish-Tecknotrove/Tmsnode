"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
class Curriculum extends sequelize_1.Model {
}
exports.default = Curriculum;
Curriculum.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: company_model_1.default,
            key: "id"
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    sequence: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: "1"
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    deleted_by: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        type: "TIMESTAMP",
    },
    updatedAt: {
        type: "TIMESTAMP",
    },
    deletedAt: {
        type: "TIMESTAMP"
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: true,
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
