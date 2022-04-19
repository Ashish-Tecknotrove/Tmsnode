"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class ElearningStatus extends sequelize_1.Model {
}
exports.default = ElearningStatus;
ElearningStatus.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER,
        //allowNull: false
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
    active: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    }
}, {
    timestamps: false,
    tableName: 'elearning_status',
    sequelize: sequelize_2.default
});
