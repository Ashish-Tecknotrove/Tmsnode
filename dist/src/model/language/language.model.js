"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const app_label_value_1 = __importDefault(require("./app.label.value"));
class Languages extends sequelize_1.Model {
}
exports.default = Languages;
Languages.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    created_by: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1
    }
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: 'languages'
});
Languages.hasMany(app_label_value_1.default, {
    sourceKey: "id",
    foreignKey: 'f_languageid',
    as: 'app_label_value'
});
app_label_value_1.default.belongsTo(Languages, { foreignKey: "f_languageid", targetKey: "id" });
