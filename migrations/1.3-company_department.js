'use strict';

const {DataType} = require("sequelize-typescript");

module.exports = {
        up: async(queryInterface, Sequelize) => {

        try{
            queryInterface.createTable("company_department", {
            id: {
                type: DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
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
                    key: "id"
                }
            },
            department_id: {
                type: DataType.INTEGER,
                references: {
                    model: 'master_department',
                    key: "id"
                }
            },
            login_table_id: {
                type: DataType.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            name: {
                type: DataType.STRING,
            },
            contactNumber: {
                type: DataType.STRING,
            },
            designation: {
                type: DataType.STRING,
            },
            email: {
                type: DataType.STRING,
            },
            created_by: {
                type: DataType.INTEGER,
                allowNull: false
            },
            updated_by: {
                type: DataType.INTEGER,
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
            IsBlock: {
                type: DataType.TINYINT,
                defaultValue: 0
            },
            IsDeleted: {
                type: DataType.TINYINT,
                defaultValue: 0
            }
        });
}
catch
(err)
{
    console.log(err.message);
}


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
