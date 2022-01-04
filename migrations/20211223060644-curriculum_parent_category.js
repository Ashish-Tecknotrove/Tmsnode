'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("curriculum_parent_category",{
      id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    technology_type_id:{
        type:DataTypes.INTEGER
    },
    created_by:{
        type:DataTypes.INTEGER
    },
    updated_by:{
        type:DataTypes.INTEGER
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
