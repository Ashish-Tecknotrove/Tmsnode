"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../root/curriculum_parent_category_test.model"));
const trainee_model_1 = __importDefault(require("../root/trainee.model"));
const elearning_status_model_1 = __importDefault(require("./elearning_status.model"));
class ElearningResult extends sequelize_1.Model {
}
exports.default = ElearningResult;
ElearningResult.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    trainee_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: trainee_model_1.default,
            key: "id"
        }
    },
    session_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    test_start: {
        type: sequelize_1.DataTypes.INTEGER
    },
    curriculum_test_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: curriculum_parent_category_test_model_1.default,
            key: 'id'
        }
    },
    attempt_no: {
        type: sequelize_1.DataTypes.INTEGER
    },
    total: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: elearning_status_model_1.default,
            key: 'id'
        }
    },
    duration: {
        type: sequelize_1.DataTypes.STRING
    },
    result_json: {
        type: sequelize_1.DataTypes.STRING
    },
    result_response: {
        type: sequelize_1.DataTypes.STRING
    },
    result_status: {
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
    IsBlock: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    tableName: 'elearning_result',
    sequelize: sequelize_2.default
});
curriculum_parent_category_test_model_1.default.hasMany(ElearningResult, {
    foreignKey: 'curriculum_test_id'
});
ElearningResult.belongsTo(curriculum_parent_category_test_model_1.default, {
    foreignKey: 'curriculum_test_id'
});
ElearningResult.belongsTo(elearning_status_model_1.default, {
    foreignKey: 'status'
});
