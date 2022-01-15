'use strict';

import {DataTypes} from "sequelize";

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("company_contacts", {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      company_id: {
        type: DataType.INTEGER,
        allowNull: true,
        references:{
          model:"companies",
          key:'id'
        }
      },
      name: {
        type: DataType.STRING(100),
        allowNull: false
      },
      department: {
        type: DataType.STRING(100),
        allowNull: false
      },
      mobile_no: {
        type: DataType.STRING,
        allowNull: false
      },
      canlogin:{
        type:DataType.ENUM("1","0"),
        defaultValue:"0"
      },
      created_by: {
        type: DataType.STRING,
        allowNull:false
      },
      updated_by: {
        type: DataType.STRING,
        allowNull:false
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
        type:DataType.TINYINT,
        defaultValue:0
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
