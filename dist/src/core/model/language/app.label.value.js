"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const app_label_1 = __importDefault(require("./app.label"));
const language_model_1 = __importDefault(require("./language.model"));
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
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: language_model_1.default,
            key: 'id'
        }
    },
    f_labelid: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "Applabels",
            key: 'id'
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
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
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: "app_label_value"
});
app_label_1.default.hasOne(ApplabelValue, {
    foreignKey: 'f_labelid'
});
ApplabelValue.belongsTo(app_label_1.default, {
    foreignKey: 'f_labelid'
});
