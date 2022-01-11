"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const language_model_1 = __importDefault(require("../language/language.model"));
const company_model_1 = __importDefault(require("./company.model"));
const usertype_model_1 = __importDefault(require("./usertype.model"));
class Users extends sequelize_1.Model {
}
exports.default = Users;
Users.init({
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    aadhar_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    mobile_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    department: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    email_verified_at: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    is_admin: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: '0',
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password_wordpress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    user_type: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: usertype_model_1.default,
            key: 'id'
        }
    },
    product_purchased: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    activation_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    deactivation_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    language: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: language_model_1.default,
            key: 'id'
        },
        allowNull: false
    },
    portal_language: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    },
    is_user_active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: true
    },
    disable_user: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: true
    },
    trainee_license_limit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    sequence_test: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    deleted_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: 'users'
});
//TODO Association with Language
Users.belongsTo(language_model_1.default, {
    foreignKey: "portal_language",
    as: ""
});
//TODO Accociation with Company
Users.belongsTo(company_model_1.default, {
    foreignKey: "company_id",
    as: ""
});
//TODO Assciaction with Trainee Table
