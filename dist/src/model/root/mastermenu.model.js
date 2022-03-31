"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const masterpanel_model_1 = __importDefault(require("./masterpanel.model"));
class Mastermenu extends sequelize_1.Model {
}
exports.default = Mastermenu;
Mastermenu.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    parent_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    panel_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: masterpanel_model_1.default,
            key: 'id'
        },
        allowNull: false
    },
    menu_id: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    menu_label: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    router_link: {
        type: sequelize_1.DataTypes.STRING,
    },
    icon: {
        type: sequelize_1.DataTypes.STRING
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
    },
    sequence: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    created_by: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        type: "TIMESTAMP"
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'master_menu'
});
