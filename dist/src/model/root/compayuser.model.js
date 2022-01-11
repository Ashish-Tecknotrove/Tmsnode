"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
class CompanyUser extends sequelize_1.Model {
}
exports.default = CompanyUser;
CompanyUser.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: company_model_1.default,
            key: 'id'
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    department: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    mobile_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: sequelize_1.DataTypes.STRING
    },
    updated_by: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: "companyUser"
});
//TODO Association with Company
CompanyUser.belongsTo(company_model_1.default, {
    foreignKey: "company_id"
});
