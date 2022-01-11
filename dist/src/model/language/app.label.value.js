"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class ApplabelValue extends sequelize_1.Model {
}
exports.default = ApplabelValue;
ApplabelValue.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    f_languageid: {
        type: sequelize_1.DataTypes.INTEGER
    },
    f_labelid: {
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    createdBy: {
        type: sequelize_1.DataTypes.STRING
    },
    updatedBy: {
        type: sequelize_1.DataTypes.STRING
    },
    active: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    }
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: "app_label_value"
});
