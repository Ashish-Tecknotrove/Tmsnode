"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
const company_department_model_1 = __importDefault(require("./company_department.model"));
const subcompany_model_1 = __importDefault(require("./subcompany.model"));
const users_model_1 = __importDefault(require("./users.model"));
class Trainer extends sequelize_1.Model {
}
exports.default = Trainer;
Trainer.init({
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
    sub_company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: subcompany_model_1.default,
            key: 'id'
        }
    },
    department_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: company_department_model_1.default,
            key: 'id'
        }
    },
    name: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true
    },
    email: {
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: true
    },
    password: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true
    },
    trainer_expertise: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true
    },
    simulator: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true
    },
    login_table_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        references: {
            model: users_model_1.default,
            key: 'id'
        }
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
        defaultValue: 0
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'trainers'
});
Trainer.belongsTo(users_model_1.default, {
    foreignKey: 'login_table_id'
});
Trainer.belongsTo(company_model_1.default, {
    foreignKey: 'company_id'
});
