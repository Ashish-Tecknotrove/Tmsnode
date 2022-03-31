"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
class TraineeRemarks extends sequelize_1.Model {
}
exports.default = TraineeRemarks;
TraineeRemarks.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    trainee_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'trainees',
            key: 'id'
        }
    },
    trainer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'trainers',
            key: 'id'
        }
    },
    curriculum_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'curriculum',
            key: 'id'
        }
    },
    curriculum_builder_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'curriculum',
            key: 'id'
        }
    },
    remarks: {
        type: sequelize_1.DataTypes.STRING
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
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'trainee_remark'
});
