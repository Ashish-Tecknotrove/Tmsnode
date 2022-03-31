'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
        up: async(queryInterface, Sequelize) => {
        queryInterface.createTable("users", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        company_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'companies',
                key: 'id'
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        aadhar_no: {
            type: DataType.STRING
        },
        mobile_no: {
            type: DataType.STRING
        },
        email_verified_at: {
            type: DataType.STRING
        },
        is_admin: {
            type: DataType.TINYINT,
            defaultValue: '0'
        },
        password: {
            type: DataType.STRING,
            allowNull: false
        },
        password_wordpress: {
            type: DataType.STRING
        },
        user_type: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {
                model: 'user_types',
                key: 'id'
            }
        },
        activation_date: {
            type: DataType.DATE
        },
        deactivation_date: {
            type: DataType.DATE
        },
        language: {
            type: DataType.INTEGER,
            references: {
                model: 'languages',
                key: 'id'
            },
            allowNull: false
        },
        portal_language: {
            type: DataType.INTEGER,
            references: {
                model: "languages",
                key: 'id'
            },
            defaultValue:1
            
        },
        created_by: {
            type: DataType.INTEGER
        },
        updated_by: {
            type: DataType.INTEGER
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
        },
        IsBlock: {
            type: DataType.TINYINT,
            defaultValue: 0
        }
    });
},

down: async(queryInterface, Sequelize) =>
{
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
}
}
;
