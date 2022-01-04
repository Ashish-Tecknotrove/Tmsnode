'use strict';

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
      created_by: {
        type: DataType.STRING
      },
      updated_by: {
        type: DataType.STRING
      },
      active: {
        type: DataType.TINYINT,
        defaultValue: 1
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
