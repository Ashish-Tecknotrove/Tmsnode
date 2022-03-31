'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable("trainee_custom_form", {
      id:{
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false
    },
    company_id: {
        type: DataType.INTEGER,
        references: {
            model: 'companies',
            key: 'id'
        }
    },
    form_master_id:{
        type:DataType.INTEGER,
        references:{
            model:"trainee_form_master",
            key:'id'
        }
    },
    isValidate:{
        type:DataType.ENUM,
        values:['0','1'],
        defaultValue:'0'
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: DataType.INTEGER,
        allowNull: false
    },
    deleted_by:{
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
    IsDeleted :{
        type: DataType.TINYINT,
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
