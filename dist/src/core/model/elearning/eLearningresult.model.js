"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const curriculum_parent_category_test_model_1 = __importDefault(require("../root/curriculum_parent_category_test.model"));
const trainee_model_1 = __importDefault(require("../root/trainee.model"));
const elearning_status_model_1 = __importDefault(require("./elearning_status.model"));
class ElearningResult extends sequelize_1.Model {
}
exports.default = ElearningResult;
ElearningResult.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    trainee_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: trainee_model_1.default,
            key: "id"
        }
    },
    session_id: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true
    },
    test_start: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    curriculum_test_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: curriculum_parent_category_test_model_1.default,
            key: 'id'
        }
    },
    attempt_no: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    total: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    score: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    status: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: elearning_status_model_1.default,
            key: 'id'
        }
    },
    duration: {
        type: sequelize_typescript_1.DataType.STRING
    },
    result_json: {
        type: sequelize_typescript_1.DataType.STRING
    },
    result_response: {
        type: sequelize_typescript_1.DataType.STRING
    },
    result_status: {
        type: sequelize_typescript_1.DataType.STRING
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
        //allowNull: false
    },
    deleted_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    updatedAt: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    deletedAt: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    IsBlock: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
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
