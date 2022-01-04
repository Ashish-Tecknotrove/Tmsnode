'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("curriculum_parent_category_test", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      prefix: {
        type: DataTypes.STRING(100)
      },
      title: {
        type: DataTypes.STRING(100)
      },
      parent_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "curriculum_parent_category",
          key: "id"
        }
      },
      technology_type_id: {
        type: DataTypes.INTEGER
      },
      language_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "languages",
          key: "id"
        }
      },
      created_by: {
        type: DataTypes.INTEGER
      },
      updated_by: {
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
