'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("elearnign_master", {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      test_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
          model: 'curriculum_parent_category_test',
          key: "id"
        }
      },
      zipname: {
        type: DataType.STRING
      },
      folderName:{
        type:DataType.STRING
      },
      link: {
        type: DataType.STRING,
      },
    thumbImg: {
        type: DataType.STRING,
    },
      created_by: {
        type: DataType.INTEGER
      },
      updated_by: {
        type: DataType.INTEGER
    },
    delete_by: {
        type: DataType.INTEGER
      },
      createdAt: {
        type: DataType.STRING(50),
      },
      updatedAt: {
        type: DataType.STRING(50),
      },
      deletedAt: {
        type: DataType.STRING(50)
      },
      IsDeleted: {
        type: DataType.TINYINT,
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
