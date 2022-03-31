"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
const traineeFormMaster_model_1 = __importDefault(require("./traineeFormMaster.model"));
class TraineeCustomizeFormModel extends sequelize_1.Model {
}
exports.default = TraineeCustomizeFormModel;
TraineeCustomizeFormModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: company_model_1.default,
            key: 'id'
        }
    },
    form_master_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: traineeFormMaster_model_1.default,
            key: 'id'
        }
    },
    isValidate: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['0', '1'],
        defaultValue: 0
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER
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
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'trainee_custom_form'
});
TraineeCustomizeFormModel.belongsTo(traineeFormMaster_model_1.default, {
    foreignKey: 'form_master_id'
});
