"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
const compayuser_model_1 = __importDefault(require("./compayuser.model"));
class CompanyContact extends sequelize_1.Model {
}
exports.default = CompanyContact;
CompanyContact.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: company_model_1.default,
            key: 'id'
        }
    },
    name: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    },
    department: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    },
    mobile_no: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    created_by: {
        type: sequelize_typescript_1.DataType.STRING
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.STRING
    },
    active: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 1
    }
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: 'company_contacts'
});
//TODO Company User
compayuser_model_1.default.belongsTo(company_model_1.default, {
    foreignKey: 'company_id'
});
