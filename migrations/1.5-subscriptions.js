'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("subscriptions", {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      curriculum_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
          model: 'curriculum',
          key: 'id'
        }
      },
      company_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        }
      },
      technology_type: {
        type: DataType.INTEGER,
      },
      course: {
        type: DataType.STRING(50),
      },
      day_no: {
        type: DataType.STRING(50),
        allowNull: false
      },
      calender_type: {
        type: DataType.STRING(50),
        allowNull: false
      },
      licence_no: {
        type: DataType.STRING(100),
        allowNull: false
      },
    licenceType: {
        type: DataType.STRING(100),
      },
      payment_type: {
        type: DataType.STRING(100),
        allowNull: false
      },
      activation_date: {
        type: DataType.STRING(100),
        allowNull: false
      },
      expiry_date: {
        type: DataType.STRING(100),
      },
      payment_note: {
        type: DataType.STRING(50),
      },
      status: {
        type: DataType.ENUM('0', '1'),
        defaultValue: "1",
      },
      note: {
        type: DataType.STRING(50),
      },
      created_by: {
        type: DataType.INTEGER,
        allowNull: true
      },
      updated_by: {
        type: DataType.INTEGER,
        allowNull: false
      },
      deleted_by: {
        type: DataType.INTEGER
      },
      createdAt: {
        type: DataType.STRING(100)
      },
      updatedAt: {
        type: DataType.STRING(100)
      },
      deletedAt: {
        type: DataType.STRING(100)
      },
      IsDeleted: {
        type: DataType.TINYINT,
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
