'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
        up: async(queryInterface, Sequelize) => {

        queryInterface.createTable("trainers", {
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
        sub_company_id: {
            type: DataType.INTEGER,
            references: {
                model: 'sub_company',
                key: 'id'
            }
        },
        department_id: {
            type: DataType.INTEGER,
            references: {
                model: 'company_department',
                key: 'id'
            }
        },
        name: {
            type: DataType.STRING(100),
            allowNull: true
        },
        email: {
            type: DataType.STRING(200),
            allowNull: true
        },
        password: {
            type: DataType.STRING(100),
            allowNull: true
        },
        trainer_expertise: {
            type: DataType.STRING(100),
            allowNull: true
        },
        simulator: {
            type: DataType.STRING(100),
            allowNull: true
        },
        login_table_id: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
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
        },
        IsBlock: {
            type: DataType.TINYINT,
            defaultValue: 0
        }
    })
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
