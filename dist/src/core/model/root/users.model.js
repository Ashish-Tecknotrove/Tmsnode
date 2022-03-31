"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const language_model_1 = __importDefault(require("../language/language.model"));
const company_model_1 = __importDefault(require("./company.model"));
const compayuser_model_1 = __importDefault(require("./compayuser.model"));
const usertype_model_1 = __importDefault(require("./usertype.model"));
class Users extends sequelize_1.Model {
}
exports.default = Users;
Users.init({
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
    email: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true
    },
    aadhar_no: {
        type: sequelize_typescript_1.DataType.STRING
    },
    mobile_no: {
        type: sequelize_typescript_1.DataType.STRING
    },
    email_verified_at: {
        type: sequelize_typescript_1.DataType.STRING
    },
    is_admin: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: '0'
    },
    password: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    password_wordpress: {
        type: sequelize_typescript_1.DataType.STRING
    },
    user_type: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        references: {
            model: usertype_model_1.default,
            key: 'id'
        }
    },
    activation_date: {
        type: sequelize_typescript_1.DataType.DATE
    },
    deactivation_date: {
        type: sequelize_typescript_1.DataType.DATE
    },
    language: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: language_model_1.default,
            key: 'id'
        },
        allowNull: false
    },
    portal_language: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 1,
        references: {
            model: language_model_1.default,
            key: 'id'
        },
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
    tableName: 'users'
});
//TODO Association with Language
Users.belongsTo(language_model_1.default, {
    foreignKey: "language",
    as: "TraineeLanguage"
});
Users.belongsTo(language_model_1.default, {
    foreignKey: "language",
    as: ""
});
Users.belongsTo(language_model_1.default, {
    foreignKey: "portal_language",
    as: "portalLanguage"
});
Users.belongsTo(company_model_1.default, {
    foreignKey: "company_id",
    targetKey: "id",
});
compayuser_model_1.default.belongsTo(Users, {
    foreignKey: "login_table_id",
    targetKey: "id"
});
