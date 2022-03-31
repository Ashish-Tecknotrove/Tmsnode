'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("companies", {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      company_name: {
        type: DataType.STRING(100),
        allowNull: false,
        unique: true
      },
      enrollment_id: {
        type:DataType.STRING(100),
        allowNull: false,
    },
    panel_id: {
        type: DataType.INTEGER,
        references:{
            model:'master_panel',
            key:'id'
        },
        allowNull:false
      },
      company_type: {
        type: DataType.TINYINT,
        defaultValue:0,
        allowNull: true
      },
      gst: {
        type: DataType.STRING(200),
        allowNull: true
      },
      picture: {
        type: DataType.STRING(255),
        allowNull: true
      },
      simulator_count: {
        type: DataType.STRING,
      },
      address: {
        type: DataType.STRING,
      },
      pincode: {
        type: DataType.INTEGER,
      },
      city_id: {
        type: DataType.INTEGER,
        references:{
            model:'cities',
            key:'id'
        },
        allowNull: false
      },
      state_id: {
        type: DataType.INTEGER,
        allowNull: false
      },
      country_id: {
        type: DataType.INTEGER,
        allowNull: false
      },
      contact_person_count: {
        type: DataType.STRING,
      },
      trainee_unique_login: {
        type: DataType.ENUM('email', 'mobile', 'aadhar'),
        defaultValue: 'email',
        allowNull: false,

      },
      company_unique_id: {
        type: DataType.STRING,
      },
      api_decider: {
        type: DataType.STRING,
      },
      registration_type: {
        type: DataType.STRING,
      },
      day_no: {
        type: DataType.INTEGER,
      },
      calender_type: {
        type: DataType.STRING,
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
        type: DataType.STRING(50)
      },
      IsDeleted: {
        type: DataType.TINYINT,
        defaultValue: 0
      }
    })
  },

  down: async (queryInterface, Sequelize) => {

  }
};
