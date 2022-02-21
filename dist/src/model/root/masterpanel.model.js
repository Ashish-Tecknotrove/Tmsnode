"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const mastermenu_model_1 = __importDefault(require("./mastermenu.model"));
class MasterPanel extends sequelize_1.Model {
}
exports.default = MasterPanel;
MasterPanel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    panel: {
        type: sequelize_1.DataTypes.STRING(100),
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
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'master_panel'
});
MasterPanel.hasMany(mastermenu_model_1.default, {
    foreignKey: 'panel_id'
});
