"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const language_model_1 = __importDefault(require("../language/language.model"));
const company_model_1 = __importDefault(require("./company.model"));
const compayuser_model_1 = __importDefault(require("./compayuser.model"));
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
            model: "Company",
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
        type: sequelize_1.DataTypes.STRING
    },
    mobile_no: {
        type: sequelize_1.DataTypes.STRING
    },
    department: {
        type: sequelize_1.DataTypes.INTEGER
    },
    email_verified_at: {
        type: sequelize_1.DataTypes.STRING
    },
    is_admin: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: '0'
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password_wordpress: {
        type: sequelize_1.DataTypes.STRING
    },
    user_type: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "UserType",
            key: 'id'
        }
    },
    product_purchased: {
        type: sequelize_1.DataTypes.STRING
    },
    activation_date: {
        type: sequelize_1.DataTypes.DATE
    },
    deactivation_date: {
        type: sequelize_1.DataTypes.DATE
    },
    language: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "Languages",
            key: 'id'
        },
        allowNull: false
    },
    portal_language: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    },
    is_user_active: {
        type: sequelize_1.DataTypes.TINYINT
    },
    disable_user: {
        type: sequelize_1.DataTypes.TINYINT
    },
    trainee_license_limit: {
        type: sequelize_1.DataTypes.STRING
    },
    sequence_test: {
        type: sequelize_1.DataTypes.STRING
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
    }
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: 'users'
});
//TODO Association with Language
Users.belongsTo(language_model_1.default, {
    foreignKey: "language",
    as: ""
});
Users.belongsTo(company_model_1.default, {
    foreignKey: "company_id",
    targetKey: "id",
});
compayuser_model_1.default.belongsTo(Users, {
    foreignKey: "login_table_id",
    targetKey: "id"
});
