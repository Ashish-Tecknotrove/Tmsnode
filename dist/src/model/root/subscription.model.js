"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
const curriculum_model_1 = __importDefault(require("./curriculum.model"));
class Subscription extends sequelize_1.Model {
}
exports.default = Subscription;
Subscription.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    curriculum_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: curriculum_model_1.default,
            key: "id"
        }
    },
    company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: company_model_1.default,
            key: 'id'
        }
    },
    technology_type: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    course: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    day_no: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    calender_type: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    licence_no: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    no_of_licence: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    payment_type: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    activation_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    expiry_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    payment_note: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('0', '1'),
        defaultValue: 0,
        allowNull: false
    },
    note: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: 'subscriptions'
});
//TODO Association With Company
Subscription.belongsTo(company_model_1.default, {
    foreignKey: 'company_id'
});
