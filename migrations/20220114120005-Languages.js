'use strict';

const {DataTypes} = require("sequelize");


module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("languages", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            isDeleted: {
                type: DataTypes.TINYINT,
                defaultValue: 1
            }
        }).then(function () {
            queryInterface.bulkInsert("languages", [{
                name: "English",
                description: "",
                created_by: "1",
                isDeleted: "0"
            },
                {
                    name: "Hindi",
                    description: "",
                    created_by: "1",
                    isDeleted: "0"
                }
            ]);
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
