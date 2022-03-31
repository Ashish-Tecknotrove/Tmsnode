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
        references: {
          model: 'companies',
          key: 'id'
        }
      },
      name: {
        type: DataType.STRING(100),
        allowNull: false
      },
      designation: {
        type: DataType.STRING(100),
        allowNull: false
      },
      mobile_no: {
        type: DataType.STRING,
        allowNull: false
      },
      canlogin: {
        type: DataType.ENUM("1", "0"),
        defaultValue: "0"
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
        type:  DataType.STRING(50),
      },
      deletedAt: {
        type:  DataType.STRING(50)
      },
      IsDeleted: {
        type: DataType.TINYINT,
        defaultValue: 0
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
