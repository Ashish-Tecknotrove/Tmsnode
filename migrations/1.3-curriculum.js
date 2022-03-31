'use strict';

const {DataType} = require("sequelize-typescript");

module.exports = {
        up: async(queryInterface, Sequelize) => {

        queryInterface.createTable("curriculum", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'companies',
                key: "id"
            }
        },
        name: {
            type: DataType.STRING(100),
        },
        sequence: {
            type: DataType.TINYINT,
            defaultValue: "1"
        },
        created_by: {
            type: DataType.INTEGER,
            allowNull: false
        },
        updated_by: {
            type: DataType.INTEGER,
            allowNull: false
        },
        deleted_by: {
            type: DataType.INTEGER
        },
        createdAt: {
            type: DataType.STRING(50),
        },
        updatedAt: {
            type: DataType.STRING(50),
        },
        deletedAt: {
            type: DataType.STRING(50)
        },
        IsDeleted: {
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
