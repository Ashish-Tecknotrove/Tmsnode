"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const curriculum_model_1 = __importDefault(require("./curriculum.model"));
const curriculum_parent_category_model_1 = __importDefault(require("./curriculum_parent_category.model"));
const curriculum_parent_category_test_model_1 = __importDefault(require("./curriculum_parent_category_test.model"));
const subscription_model_1 = __importDefault(require("./subscription.model"));
const trainee_remark_model_1 = __importDefault(require("./trainee_remark.model"));
class CurriculumBuilder extends sequelize_1.Model {
}
exports.default = CurriculumBuilder;
CurriculumBuilder.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    curriculum_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: curriculum_model_1.default,
            key: "id"
        }
    },
    vehicle_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    curriculum_parent_category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: curriculum_parent_category_model_1.default,
            key: "id"
        }
    },
    curriculum_parent_category_test_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: curriculum_parent_category_test_model_1.default,
            key: "id"
        }
    },
    passing_marks: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    total_marks: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    attempts: {
        type: sequelize_1.DataTypes.INTEGER,
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
    tableName: 'curriculum_builder'
});
CurriculumBuilder.belongsTo(curriculum_parent_category_model_1.default, {
    foreignKey: "curriculum_parent_category_id"
});
CurriculumBuilder.belongsTo(curriculum_parent_category_test_model_1.default, {
    foreignKey: "curriculum_parent_category_test_id"
});
CurriculumBuilder.hasOne(subscription_model_1.default, {
    foreignKey: "curriculum_id"
});
curriculum_model_1.default.hasMany(CurriculumBuilder, {
    foreignKey: "curriculum_id",
    //as:"UsedSubscription"
});
CurriculumBuilder.belongsTo(curriculum_model_1.default, {
    foreignKey: "curriculum_id"
});
CurriculumBuilder.hasOne(subscription_model_1.default, {
    foreignKey: "curriculum_id"
});
CurriculumBuilder.hasOne(trainee_remark_model_1.default, {
    foreignKey: "curriculum_builder_id"
});
