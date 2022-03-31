"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const curriculum_model_1 = __importDefault(require("./curriculum.model"));
const technology_model_1 = __importDefault(require("./technology.model"));
const language_model_1 = __importDefault(require("../language/language.model"));
const trainee_model_1 = __importDefault(require("./trainee.model"));
const users_model_1 = __importDefault(require("./users.model"));
class TraineeCurriculum extends sequelize_1.Model {
}
exports.default = TraineeCurriculum;
TraineeCurriculum.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    trainee_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: trainee_model_1.default,
            key: 'id'
        }
    },
    trainee_user_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: users_model_1.default,
            key: 'id'
        }
    },
    language_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: language_model_1.default,
            key: 'id'
        }
    },
    curriculum_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: curriculum_model_1.default,
            key: 'id'
        }
    },
    technology_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: technology_model_1.default,
            key: 'id'
        }
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
    },
    IsBlock: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'trainee_curriculum'
});
TraineeCurriculum.belongsTo(curriculum_model_1.default, {
    foreignKey: 'curriculum_id'
});
TraineeCurriculum.belongsTo(technology_model_1.default, {
    foreignKey: 'technology_id'
});
TraineeCurriculum.belongsTo(language_model_1.default, {
    foreignKey: "language_id"
});
