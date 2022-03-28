"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
const master_department_model_1 = __importDefault(require("./master_department.model"));
const subcompany_model_1 = __importDefault(require("./subcompany.model"));
const trainer_model_1 = __importDefault(require("./trainer.model"));
const users_model_1 = __importDefault(require("./users.model"));
class CompanyDepartment extends sequelize_1.Model {
}
exports.default = CompanyDepartment;
CompanyDepartment.init({
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
            model: company_model_1.default,
            key: "id",
        },
    },
    sub_company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: subcompany_model_1.default,
            key: "id",
        },
    },
    department_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: master_department_model_1.default,
            key: "id",
        },
    },
    login_table_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: users_model_1.default,
            key: "id",
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    contactNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    designation: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
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
    tableName: "company_department",
});
CompanyDepartment.belongsTo(master_department_model_1.default, {
    foreignKey: "department_id",
});
CompanyDepartment.belongsTo(company_model_1.default, {
    foreignKey: "company_id",
});
CompanyDepartment.belongsTo(subcompany_model_1.default, {
    foreignKey: "sub_company_id",
});
subcompany_model_1.default.hasMany(CompanyDepartment, {
    foreignKey: "sub_company_id",
});
CompanyDepartment.hasMany(trainer_model_1.default, {
    foreignKey: "department_id",
});
trainer_model_1.default.belongsTo(CompanyDepartment, {
    foreignKey: "department_id",
});
CompanyDepartment.belongsTo(users_model_1.default, {
    foreignKey: "login_table_id"
});
