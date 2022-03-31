"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
const traineeFormMaster_model_1 = __importDefault(require("./traineeFormMaster.model"));
class TraineeCustomizeFormModel extends sequelize_1.Model {
}
exports.default = TraineeCustomizeFormModel;
TraineeCustomizeFormModel.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: company_model_1.default,
            key: 'id'
        }
    },
    form_master_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: traineeFormMaster_model_1.default,
            key: 'id'
        }
    },
    isValidate: {
        type: sequelize_typescript_1.DataType.ENUM,
        values: ['0', '1'],
        defaultValue: 0
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
    tableName: 'trainee_custom_form'
});
TraineeCustomizeFormModel.belongsTo(traineeFormMaster_model_1.default, {
    foreignKey: 'form_master_id'
});
