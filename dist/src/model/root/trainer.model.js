"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
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
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    email_verified_at: {
        type: sequelize_1.DataTypes.STRING(100),
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
    user_type: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    simulator: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    created_at: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    updated_at: {
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
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: 'trainers'
});
Trainer.belongsTo(users_model_1.default, {
    foreignKey: 'login_table_id'
});
Trainer.belongsTo(company_model_1.default, {
    foreignKey: 'company_id'
});
