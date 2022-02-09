'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("companies", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      company_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      company_type: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      gst: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      picture: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      simulator_count: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      pincode: {
        type: DataTypes.INTEGER,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      contact_person_count: {
        type: DataTypes.STRING,
      },
      trainee_unique_login: {
        type: DataTypes.ENUM('email', 'mobile', 'aadhar'),
        defaultValue: 'email',
        allowNull: false,

      },
      adp_decider: {
        type: DataTypes.INTEGER,
      },
      api_decider: {
        type: DataTypes.STRING,
      },
      registration_type: {
        type: DataTypes.STRING,
      },
      day_no: {
        type: DataTypes.INTEGER,
      },
      calender_type: {
        type: DataTypes.STRING,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      updated_by: {
        type: DataTypes.INTEGER,
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
      IsDeleted:{
        type:DataTypes.TINYINT,
        defaultValue:0
      }
    })
  },

  down: async (queryInterface, Sequelize) => {

  }
};