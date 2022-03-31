'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("elearning_training_session", {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      session_id:{
        type:DataType.STRING(255),
        allowNull:false,
        unique:true
      },
      trainee_id:{
        type: DataType.INTEGER,
        references: {
          model: 'trainees',
          key: 'id'
        }
      },
      status:{
        type:DataType.ENUM('0', '1'),
        defaultValue: "0",
      },
      createdAt: {
        type: DataType.DATE
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
