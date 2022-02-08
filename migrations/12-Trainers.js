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
            company_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "companies",
                    key: 'id'
                }
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            email_verified_at: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            trainer_expertise: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            user_type: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            simulator: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            created_by: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            updated_by: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            login_table_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "users",
                    key: 'id'
                }
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
