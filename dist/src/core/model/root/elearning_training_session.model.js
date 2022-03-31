"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../database/sequelize");
class ElearningTrainingSession extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.user_id = !;
        this.message = !;
        this.createdAt = !;
    }
}
exports.default = ElearningTrainingSession;
ElearningTrainingSession.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    session_id: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    trainee_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'trainees',
            key: 'id'
        }
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('0', '1'),
        defaultValue: "0",
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: sequelize_2.default,
    tableName: "elearning_training_session"
});
