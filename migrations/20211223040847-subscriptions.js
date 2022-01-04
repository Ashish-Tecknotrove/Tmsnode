'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("subscriptions",{
      id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      curriculum_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'curriculum',
          key:'id'
        }
      },
      company_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:"companies",
          key:'id'
        }
      },
      technology_type:{
        type:DataTypes.INTEGER,
        allowNull: false
      },
      course:{
        type:DataTypes.STRING(50),
        allowNull: false
      },
      day_no:{
        type:DataTypes.STRING(50),
        allowNull: false
      },
      calender_type:{
        type:DataTypes.STRING(50),
        allowNull: false
      },
      licence_no:{
        type:DataTypes.STRING(100),
        allowNull: false
      },
      no_of_licence:{
        type:DataTypes.STRING(100),
        allowNull: false
      },
      payment_type:{
        type:DataTypes.STRING(100),
        allowNull: false
      },
      activation_date:{
        type:DataTypes.DATE,
        allowNull: false
      },
      expiry_date:{
        type:DataTypes.DATE,
        allowNull: false
      },
      payment_note:{
        type:DataTypes.STRING(50),
        allowNull: false
      },
      status:{
        type:DataTypes.ENUM('0','1'),
        defaultValue:"0",
        allowNull: false
      },
      note:{
        type:DataTypes.STRING(50),
        allowNull: false
      },
      created_by:{
        type:DataTypes.INTEGER,
        allowNull: false
      },
      updated_by:{
        type:DataTypes.INTEGER,
        allowNull: false
      },

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
