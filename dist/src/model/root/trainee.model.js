"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
const users_model_1 = __importDefault(require("./users.model"));
class Trainee extends sequelize_1.Model {
}
exports.default = Trainee;
Trainee.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    RegNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    login_table_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users_model_1.default,
            key: 'id'
        }
    },
    staff_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    middle_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    alternate_contact_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    aadhar_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    education: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    marrital_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: company_model_1.default,
            key: "id"
        }
    },
    subscription_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    service_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    adp_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    vehicle_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    course: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fees: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    receipt_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    mode_of_payment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cheque_dd_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    bank_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    trainer_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    active_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    activation_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    expiry_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    driver_photo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    license_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    license_issue_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    license_validity: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    license_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    experience_in_years: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    certificate_copy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    validity_of_certificate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    certificate_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    dg_trainer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    transporter_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    training_schedule_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    updated_by: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    IsBlock: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: 'trainees'
});
//TODO Association with Users
Trainee.belongsTo(users_model_1.default, {
    foreignKey: 'login_table_id'
});
//TODO Association with Company
Trainee.belongsTo(company_model_1.default, {
    foreignKey: 'company_id'
});
