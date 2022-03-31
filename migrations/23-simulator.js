'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("simulator", {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      company_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      trainer_id: {
        type: DataType.INTEGER,
        references: {
          model: 'trainers',
          key: 'id'
        }
      },
      name: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataType.STRING,
      },
      created_by: {
        type: DataType.INTEGER,
        allowNull: true
      },
      updated_by: {
        type: DataType.INTEGER,
        allowNull: false
      },
      deleted_by: {
        type: DataType.INTEGER
      },
      createdAt: {
        type: DataType.STRING(100)
      },
      updatedAt: {
        type: DataType.STRING(100)
      },
      deletedAt: {
        type: DataType.STRING(100)
      },
      IsDeleted: {
        type: DataType.TINYINT,
      defaultValue: 0
      },
      IsBlock: {
        type: DataType.TINYINT,
        defaultValue: 0,
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
