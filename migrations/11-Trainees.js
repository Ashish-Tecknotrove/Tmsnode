'use strict';

const { DataType } = require("sequelize-typescript");

module.exports = {
        up: async(queryInterface, Sequelize) => {

        queryInterface.createTable("trainees", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        RegNo: {
            type: DataType.STRING,
            allowNull: true,
        },
        company_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'companies',
                key: "id",
            },
        },
        sub_company_id: {
            type: DataType.INTEGER,
            references: {
                model: 'sub_company',
                key: "id",
            },
        },
        department_id: {
            type: DataType.INTEGER,
            references: {
                model: 'company_department',
                key: "id",
            },
        },
        login_table_id: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: "id",
            },
        },
        staff_id: {
            type: DataType.INTEGER,
        },
        first_name: {
            type: DataType.STRING,
        },
        middle_name: {
            type: DataType.STRING,
        },
        last_name: {
            type: DataType.STRING,
        },
        email: {
            type: DataType.STRING,
            allowNull: true,
        },
        contact: {
            type: DataType.STRING,
            allowNull: true,
        },
        alternate_contact_no: {
            type: DataType.STRING,
        },
        aadhar_no: {
            type: DataType.STRING,
        },
        gender: {
            type: DataType.STRING,
            allowNull: true,
        },
        education: {
            type: DataType.STRING,
        },
        address: {
            type: DataType.STRING,
        },
        city: {
            type: DataType.STRING,
        },
        marrital_status: {
            type: DataType.STRING,
        },
        age: {
            type: DataType.STRING,
        },
        date_of_birth: {
            type: DataType.STRING,
        },
        subscription_id: {
            type: DataType.STRING,
        },
        service_type: {
            type: DataType.STRING,
            allowNull: true,
        },
        company_unique_id: {
            type: DataType.STRING,
            allowNull: true,
        },
        vehicle_type: {
            type: DataType.STRING,
            allowNull: true,
        },
        designation: {
            type: DataType.STRING,
            allowNull: true,
        },
        department: {
            type: DataType.STRING,
            allowNull: true,
        },
        course: {
            type: DataType.STRING,
            allowNull: true,
        },
        fees: {
            type: DataType.STRING,
            allowNull: true,
        },
        receipt_number: {
            type: DataType.STRING,
            allowNull: true,
        },
        mode_of_payment: {
            type: DataType.STRING,
            allowNull: true,
        },
        cheque_dd_number: {
            type: DataType.STRING,
            allowNull: true,
        },
        bank_name: {
            type: DataType.STRING,
            allowNull: true,
        },
        trainer_id: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataType.STRING,
            allowNull: true,
        },
        active_status: {
            type: DataType.STRING,
            allowNull: true,
        },
        activation_date: {
            type: DataType.STRING,
            allowNull: true,
        },
        expiry_date: {
            type: DataType.STRING,
            allowNull: true,
        },
        driver_photo: {
            type: DataType.STRING,
            allowNull: true,
        },
        license_no: {
            type: DataType.STRING,
            allowNull: true,
        },
        license_issue_date: {
            type: DataType.STRING,
            allowNull: true,
        },
        license_validity: {
            type: DataType.STRING,
            allowNull: true,
        },
        license_image: {
            type: DataType.STRING,
            allowNull: true,
        },
        experience_in_years: {
            type: DataType.STRING,
            allowNull: true,
        },
        certificate_copy: {
            type: DataType.STRING,
            allowNull: true,
        },
        validity_of_certificate: {
            type: DataType.STRING,
            allowNull: true,
        },
        certificate_number: {
            type: DataType.STRING,
            allowNull: true,
        },
        dg_trainer: {
            type: DataType.STRING,
            allowNull: true,
        },
        transporter_name: {
            type: DataType.STRING,
            allowNull: true,
        },
        training_schedule_date: {
            type: DataType.STRING,
            allowNull: true,
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
            defaultValue: 0,
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
