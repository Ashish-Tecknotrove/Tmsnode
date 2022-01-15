'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("curriculum_builder", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      curriculum_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "curriculum",
          key: "id"
        }
      },
      vehicle_id: {
        type: DataTypes.INTEGER,
      },
      curriculum_parent_category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "curriculum_parent_category",
          key: "id"
        }
      },
      curriculum_parent_category_test_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "curriculum_parent_category_test",
          key: "id"
        }
      },
      created_by: {
        type: DataTypes.INTEGER
      },
      updated_by: {
        type: DataTypes.INTEGER
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
      IsDeleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0
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
