'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("elearning_trainee_scrom_data", {
      id:{
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    session_id:{
        type:DataType.STRING,
        allowNull:false
    },
    test_id:{
        type:DataType.INTEGER,
        allowNull:false
    },
    trainee_id:{
        type:DataType.INTEGER,
        allowNull:false,
        references: {
          model: 'trainees',
          key: 'id'
        }
    },
    attempt_no:{
        type:DataType.INTEGER,
        allowNull:false
    },
    question:{
        type:DataType.STRING,
        allowNull:false
    },
    answer:{
        type:DataType.STRING,
        allowNull:false
    },
    status:{
        type:DataType.STRING,
        allowNull:false
    },
    mark:{
        type:DataType.INTEGER,
        allowNull:false
    },
    created_by:{
        type:DataType.INTEGER,
    },
    updated_by:{
        type:DataType.INTEGER,
    },
    createdAt:{
        type:DataType.STRING(50),
    },
    updatedAt:{
        type:DataType.STRING(50),
    },
    IsDeleted:{
        type:DataType.TINYINT,
        defaultValue:"0"
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
