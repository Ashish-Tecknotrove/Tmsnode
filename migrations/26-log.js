'use strict';

const { DataType } = require("sequelize-typescript");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("log", {
            id: {
                type: DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: DataType.INTEGER,
                allowNull: false
            },
            message: {
                type: DataType.STRING,
                allowNull: false
            },
            description: {
                type: DataType.TEXT,
                allowNull: true
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
        }).then(function () {

        });
    },

    down: async (queryInterface, Sequelize) => {

    }
};
