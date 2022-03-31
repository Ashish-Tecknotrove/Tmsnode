"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: company_model_1.default,
            key: 'id'
        }
    },
    sub_company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: subcompany_model_1.default,
            key: 'id'
        }
    },
    department_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: company_department_model_1.default,
            key: 'id'
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    trainer_expertise: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    simulator: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    login_table_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: users_model_1.default,
            key: 'id'
        }
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
    },
    IsBlock: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: 'trainers'
});
Trainer.belongsTo(users_model_1.default, {
    foreignKey: 'login_table_id'
});
Trainer.belongsTo(company_model_1.default, {
    foreignKey: 'company_id'
});
