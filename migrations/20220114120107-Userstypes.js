'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("companies", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            active: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
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
