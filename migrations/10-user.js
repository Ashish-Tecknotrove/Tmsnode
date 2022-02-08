'use strict';
const {DataTypes} = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("users", {
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
                    model: 'companies',
                    key: 'id'
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            aadhar_no: {
                type: DataTypes.STRING
            },
            mobile_no: {
                type: DataTypes.STRING
            },
            department: {
                type: DataTypes.INTEGER
            },
            email_verified_at: {
                type: DataTypes.STRING
            },
            is_admin: {
                type: DataTypes.TINYINT,
                defaultValue: '0'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password_wordpress: {
                type: DataTypes.STRING
            },
            user_type: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'user_types',
                    key: 'id'
                }
            },
            product_purchased: {
                type: DataTypes.STRING
            },
            activation_date: {
                type: DataTypes.DATE
            },
            deactivation_date: {
                type: DataTypes.DATE
            },
            language: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'languages',
                    key: 'id'
                },
                allowNull: false
            },
            portal_language: {
                type: DataTypes.TINYINT,
                defaultValue: 1
            },
            is_user_active: {
                type: DataTypes.TINYINT
            },
            disable_user: {
                type: DataTypes.TINYINT
            },
            trainee_license_limit: {
                type: DataTypes.STRING
            },
            sequence_test: {
                type: DataTypes.STRING
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            updated_by: {
                type: DataTypes.INTEGER,
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
            IsDeleted:{
                type:DataTypes.TINYINT,
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
