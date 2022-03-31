"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const trainer_model_1 = __importDefault(require("./trainer.model"));
const users_model_1 = __importDefault(require("./users.model"));
const company_model_1 = __importDefault(require("./company.model"));
class SubCompany extends sequelize_1.Model {
}
exports.default = SubCompany;
SubCompany.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: company_model_1.default,
            key: "id",
        },
    },
    login_table_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: users_model_1.default,
            key: "id",
        },
    },
    name: {
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
    },
    email: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    description: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    username: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    designation: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    contact_no: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    deleted_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    updatedAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    deletedAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    },
    IsBlock: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0,
    }
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
