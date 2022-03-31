"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const trainer_model_1 = __importDefault(require("./trainer.model"));
class Simulator extends sequelize_1.Model {
}
exports.default = Simulator;
Simulator.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "companies",
            key: "id",
        },
    },
    trainer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: trainer_model_1.default,
            key: "id"
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        //unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    deleted_by: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    createdAt: {
        type: "TIMESTAMP",
    },
    updatedAt: {
        type: "TIMESTAMP",
    },
    deletedAt: {
        type: "TIMESTAMP",
    },
    IsBlock: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0,
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "simulator",
});
Simulator.belongsTo(trainer_model_1.default, {
    foreignKey: 'trainer_id'
});
trainer_model_1.default.hasMany(Simulator, {
    foreignKey: "trainer_id"
});
