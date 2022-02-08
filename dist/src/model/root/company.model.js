"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const companycontacts_model_1 = __importDefault(require("./companycontacts.model"));
const curriculum_model_1 = __importDefault(require("./curriculum.model"));
const subscription_model_1 = __importDefault(require("./subscription.model"));
class Company extends sequelize_1.Model {
}
exports.default = Company;
Company.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    company_type: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    gst: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    picture: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    simulator_count: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    pincode: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    city_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    state_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    country_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    contact_person_count: {
        type: sequelize_1.DataTypes.STRING,
    },
    trainee_unique_login: {
        type: sequelize_1.DataTypes.ENUM('email', 'mobile', 'aadhar'),
        defaultValue: 'email',
        allowNull: false,
    },
    adp_decider: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    api_decider: {
        type: sequelize_1.DataTypes.STRING,
    },
    registration_type: {
        type: sequelize_1.DataTypes.STRING,
    },
    day_no: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    calender_type: {
        type: sequelize_1.DataTypes.STRING,
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
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
    }
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: 'companies'
});
// Company.hasMany(Users,{
//     sourceKey:"id",
//     foreignKey:'company_id',
//     as:'companies'
// })
Company.hasMany(companycontacts_model_1.default, {
    foreignKey: 'company_id'
});
Company.hasMany(subscription_model_1.default, {
    foreignKey: 'company_id'
});
Company.hasMany(curriculum_model_1.default, {
    foreignKey: 'company_id',
});
