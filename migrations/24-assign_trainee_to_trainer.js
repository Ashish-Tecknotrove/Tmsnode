'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("assign_trainee_to_trainer", {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    trainer_id: {
        type: DataType.INTEGER,
        references: {
            model: "trainers",
            key: 'id'
        },
        allowNull: false
    },
    trainee_id: {
        type: DataType.INTEGER,
        references: {
            model: "trainees",
            key: 'id'
        },
        allowNull: false
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: DataType.INTEGER,
        allowNull: true
    },
    deleted_by: {
        type: DataType.INTEGER,
        allowNull: true
    },
    createdAt: {
        type: DataType.STRING(50),
    },
    updatedAt: {
        type: DataType.STRING(50),
    },
    deletedAt: {
        type: DataType.STRING(50),
    },
    IsBlock: {
        type: DataType.TINYINT,
        defaultValue: 0
    },
    IsDeleted: {
        type: DataType.TINYINT,
        defaultValue: 0
    }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
