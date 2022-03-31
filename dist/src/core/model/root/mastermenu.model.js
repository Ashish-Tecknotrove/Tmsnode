"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const masterpanel_model_1 = __importDefault(require("./masterpanel.model"));
class Mastermenu extends sequelize_1.Model {
}
exports.default = Mastermenu;
Mastermenu.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    parent_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    panel_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: masterpanel_model_1.default,
            key: 'id'
        },
        allowNull: false
    },
    menu_id: {
        type: sequelize_typescript_1.DataType.STRING(100),
    },
    menu_label: {
        type: sequelize_typescript_1.DataType.STRING(100),
    },
    router_link: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    icon: {
        type: sequelize_typescript_1.DataType.STRING
    },
    type: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    sequence: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    created_by: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'master_menu'
});
