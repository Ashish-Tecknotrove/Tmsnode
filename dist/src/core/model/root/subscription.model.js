"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
const curriculum_model_1 = __importDefault(require("./curriculum.model"));
class Subscription extends sequelize_1.Model {
}
exports.default = Subscription;
Subscription.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    curriculum_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: curriculum_model_1.default,
            key: "id"
        }
    },
    company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: company_model_1.default,
            key: 'id'
        }
    },
    technology_type: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    course: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    day_no: {
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false
    },
    calender_type: {
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false
    },
    licence_no: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    },
    licenceType: {
        type: sequelize_typescript_1.DataType.STRING(100),
    },
    payment_type: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    },
    activation_date: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    },
    expiry_date: {
        type: sequelize_typescript_1.DataType.STRING(100),
    },
    payment_note: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    status: {
        type: sequelize_typescript_1.DataType.ENUM('0', '1'),
        defaultValue: "1",
    },
    note: {
        type: sequelize_typescript_1.DataType.STRING(50),
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
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'subscriptions'
});
// // //TODO Association With Company
Subscription.belongsTo(curriculum_model_1.default, {
    foreignKey: 'curriculum_id',
    targetKey: "id"
});
// Subscription.hasMany(Curriculum,{
//     foreignKey:'curriculum_id',
// })
