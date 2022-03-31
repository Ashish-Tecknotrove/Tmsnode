'use strict';

const {DataType} = require("sequelize-typescript");

module.exports = {
        up: async(queryInterface, Sequelize) => {

        queryInterface.createTable("curriculum_parent_category", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataType.STRING(100),
            allowNull: false
        },
        technology_type_id: {
            type: DataType.INTEGER,
            references: {
                model: "technology_type",
                key: "id"
            }
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
