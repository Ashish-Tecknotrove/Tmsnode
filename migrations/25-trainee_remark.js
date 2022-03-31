'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("trainee_remark", {
            id: {
                type: DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true,
        allowNull: false
            },
            trainee_id: {
                type: DataType.INTEGER,
                references: {
                    model: 'trainees',
                    key: 'id'
                  }
            },
            trainer_id: {
                type: DataType.INTEGER,
                references: {
                    model: 'trainers',
                    key: 'id'
                  }
            },
            curriculum_id: {
                type: DataType.INTEGER,
                references: {
                    model: 'curriculum',
                    key: 'id'
                  }
            },
            curriculum_builder_id: {
                type: DataType.INTEGER,
                references: {
                    model: 'curriculum_builder',
                    key: 'id'
                  }
            },
            remarks: {
        type: DataType.STRING
            },
            created_by: {
                type: DataType.INTEGER,
                allowNull: true
            },
            updated_by: {
                type: DataType.INTEGER,
                allowNull: false
            },
            deleted_by:{
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
