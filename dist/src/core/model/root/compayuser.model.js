"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class CompanyUser extends sequelize_1.Model {
}
exports.default = CompanyUser;
CompanyUser.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: "Company",
            key: 'id'
        }
    },
    login_table_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        references: {
            model: "Users",
            key: 'id'
        }
    },
    email: {
        type: sequelize_typescript_1.DataType.STRING(100),
    },
    name: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    },
    designation: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    },
    mobile_no: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    canlogin: {
        type: sequelize_typescript_1.DataType.ENUM("1", "0"),
        defaultValue: "0"
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    deleted_by: {
        type: sequelize_typescript_1.DataType.INTEGER
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
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: "company_contacts"
});
// CompanyUser.belongsTo(Users,{
//   foreignKey:"login_table_id"
// });
// CompanyUser.belongsTo(Company,{
//   foreignKey:"company_id",
//   targetKey:"id"
// });
