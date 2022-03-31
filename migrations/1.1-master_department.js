'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
    up: async (queryInterface, Sequelize) => {

        queryInterface.createTable("master_department", {
            id: {
                type: DataType.INTEGER,
        autoIncrement: true,
                primaryKey: true,
        allowNull: false
            },
            company_id:{
                type:DataType.INTEGER,
                allowNull:false,
                references:{
                    model:'companies',
                    key:'id'
                }
            },
            name: {
        type: DataType.STRING(100),
        allowNull: true
            },
            descripition: {
        type: DataType.STRING(200)
            },			
            created_by: {
				type: DataType.INTEGER,
            allowNull: false
			},
            updated_by: {
                type: DataType.INTEGER,
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
