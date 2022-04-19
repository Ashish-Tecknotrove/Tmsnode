"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
class MasterDepartment extends sequelize_1.Model {
}
exports.default = MasterDepartment;
MasterDepartment.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: company_model_1.default,
            key: 'id'
        }
    },
    name: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true
    },
    descripition: {
        type: sequelize_typescript_1.DataType.STRING(200)
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
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
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: 'master_department'
});
