'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("elearning_result", {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      trainee_id:{
        type: DataType.INTEGER,
        references: {
          model: 'trainees',
          key: 'id'
        }
      },
        session_id: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        test_start: {
            type: DataType.INTEGER
        },
      curriculum_test_id:{
        type: DataType.INTEGER,
        references: {
          model: 'curriculum_parent_category_test',
          key: 'id'
        }
      },
      attempt_no:{
        type: DataType.INTEGER
      },
      total:{
        type: DataType.INTEGER
      },
      score:{
        type: DataType.INTEGER
      },
      status:{
        type: DataType.INTEGER,
          references:{
              model:"elearning_status",
              key:'id'
          }
      },
      duration:{
        type: DataType.STRING
      },
      result_json:{
        type: DataType.STRING
      },
      result_response:{
        type: DataType.STRING
      },
      result_status:{
        type: DataType.STRING
      },
      created_by: {
        type: DataType.INTEGER,
        allowNull: false
      },
      updated_by: {
        type: DataType.INTEGER,
        allowNull: false
      },
      deleted_by: {
        type: DataType.INTEGER
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
