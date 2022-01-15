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
      },
      course:{
        type:DataTypes.STRING(50),
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
      },
      payment_note:{
        type:DataTypes.STRING(50),
      },
      status:{
        type:DataTypes.ENUM('0','1'),
        defaultValue:"1",
      },
      note:{
        type:DataTypes.STRING(50),
      },
      created_by:{
        type:DataTypes.INTEGER,
        allowNull: false
      },
      updated_by:{
        type:DataTypes.INTEGER,
        allowNull: false
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
