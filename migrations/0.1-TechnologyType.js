'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("technology_type", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING(20),
      },
      createdAt: {
        type: "TIMESTAMP"
      },
      updatedAt: {
        type: "TIMESTAMP"
      },
      deletedAt: {
        type: "TIMESTAMP"
      },
      IsDeleted:{
        type:DataTypes.TINYINT,
        defaultValue:0
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
