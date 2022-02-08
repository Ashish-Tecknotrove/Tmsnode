'use strict';

const {DataTypes} = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {

        queryInterface.createTable("curriculum", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            company_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'companies',
                    key: "id"
                }
            },
            name: {
                type: DataTypes.INTEGER,
            },
            created_by: {
                type: DataTypes.INTEGER
            },
            updated_by: {
                type: DataTypes.INTEGER
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
