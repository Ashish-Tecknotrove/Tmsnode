'use strict';


const {DataTypes} = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("app_labels", {
      id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING
    },
    createdBy:{
        type:DataTypes.STRING
    },
    updatedBy:{
        type:DataTypes.STRING
    },
    IsDeleted:{
        type:DataTypes.TINYINT,
        defaultValue:1
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
