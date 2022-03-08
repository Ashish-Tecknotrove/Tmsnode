"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const curriculum_model_1 = __importDefault(require("./curriculum.model"));
const technology_model_1 = __importDefault(require("./technology.model"));
const language_model_1 = __importDefault(require("../language/language.model"));
class TraineeCurriculum extends sequelize_1.Model {
}
exports.default = TraineeCurriculum;
TraineeCurriculum.init({
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
    trainee_user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    language_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'languages',
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
    technology_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: technology_model_1.default,
            key: 'id'
        }
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
