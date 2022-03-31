"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const trainer_model_1 = __importDefault(require("./trainer.model"));
const users_model_1 = __importDefault(require("./users.model"));
class SubCompany extends sequelize_1.Model {
}
exports.default = SubCompany;
SubCompany.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "companies",
            key: "id",
        },
    },
    login_table_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id",
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    designation: {
        type: sequelize_1.DataTypes.STRING,
    },
    contact_no: {
        type: sequelize_1.DataTypes.STRING,
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    deleted_by: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    createdAt: {
        type: "TIMESTAMP",
    },
    updatedAt: {
        type: "TIMESTAMP",
    },
    deletedAt: {
        type: "TIMESTAMP",
    },
    IsBlock: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0,
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "sub_company",
});
SubCompany.belongsTo(users_model_1.default, {
    foreignKey: "login_table_id",
});
SubCompany.hasMany(trainer_model_1.default, {
    foreignKey: "sub_company_id",
});
trainer_model_1.default.belongsTo(SubCompany, {
    foreignKey: "sub_company_id",
});
