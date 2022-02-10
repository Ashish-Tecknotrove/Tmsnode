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
    },
    course: {
        type: sequelize_1.DataTypes.STRING(50),
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
    licenceType: {
        type: sequelize_1.DataTypes.STRING(100),
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
    },
    payment_note: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('0', '1'),
        defaultValue: "1",
    },
    note: {
        type: sequelize_1.DataTypes.STRING(50),
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
