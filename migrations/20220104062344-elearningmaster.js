'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("elearnign_master", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      test_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "curriculum_parent_category_test",
          key: "id"
        }
      },
      zipname: {
        type: DataTypes.STRING
      },
      link: {
        type: DataTypes.STRING,
      },
      created_by: {
        type: DataTypes.INTEGER
      },
      updated_by: {
        type: DataTypes.INTEGER
      },
      delete_by:{
        type: DataTypes.INTEGER
      }
    });
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
