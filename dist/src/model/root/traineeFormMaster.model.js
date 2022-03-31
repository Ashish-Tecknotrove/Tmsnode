"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class TraineeFormMasterModel extends sequelize_1.Model {
}
exports.default = TraineeFormMasterModel;
TraineeFormMasterModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    form_field: {
        type: sequelize_1.DataTypes.STRING,
    },
    form_label: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'trainee_form_master'
});
