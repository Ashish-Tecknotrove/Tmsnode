'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("trainee_curriculum", {
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
      trainee_user_id: {
        type: DataType.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
    language_id: {
        type: DataType.INTEGER,
        references: {
            model: 'languages',
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
    technology_id: {
        type: DataType.INTEGER,
        references: {
            model: 'technology_type',
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

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
