'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
        up: async(queryInterface, Sequelize) => {

        queryInterface.createTable("curriculum_builder", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        curriculum_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'curriculum',
                key: "id"
            }
        },
        vehicle_id: {
            type: DataType.INTEGER,
        },
        curriculum_parent_category_id: {
            type: DataType.INTEGER,
            references: {
                model: 'curriculum_parent_category',
                key: "id"
            }
        },
        curriculum_parent_category_test_id: {
            type: DataType.INTEGER,
            references: {
                model: 'curriculum_parent_category_test',
                key: "id"
            }
        },
        passing_marks: {
            type: DataType.INTEGER,
        },
        total_marks: {
            type: DataType.INTEGER,
        },
        attempts: {
            type: DataType.INTEGER,
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
