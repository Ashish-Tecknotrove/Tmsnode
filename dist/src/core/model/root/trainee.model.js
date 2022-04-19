"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const company_model_1 = __importDefault(require("./company.model"));
const company_department_model_1 = __importDefault(require("./company_department.model"));
const subcompany_model_1 = __importDefault(require("./subcompany.model"));
const trainee_curriculum_model_1 = __importDefault(require("./trainee_curriculum.model"));
const users_model_1 = __importDefault(require("./users.model"));
const trainer_model_1 = __importDefault(require("./trainer.model"));
class Trainee extends sequelize_1.Model {
}
exports.default = Trainee;
Trainee.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    enrollmentId: {
        type: sequelize_typescript_1.DataType.STRING
    },
    company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: company_model_1.default,
            key: "id",
        },
    },
    sub_company_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: subcompany_model_1.default,
            key: "id",
        },
        allowNull: true
    },
    department_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: company_department_model_1.default,
            key: "id",
        },
        allowNull: true
    },
    login_table_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        references: {
            model: users_model_1.default,
            key: "id",
        },
    },
    staff_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    first_name: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    middle_name: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    last_name: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    email: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    contact: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    alternate_contact_no: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    aadhar_no: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    gender: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    education: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    address: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    city: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    marrital_status: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    age: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    date_of_birth: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    subscription_id: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    service_type: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    company_unique_id: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    vehicle_type: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    designation: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    department: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    course: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    fees: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    receipt_number: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    mode_of_payment: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    cheque_dd_number: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    bank_name: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    trainer_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    },
    status: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    active_status: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    activation_date: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    expiry_date: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    driver_photo: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    license_no: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    license_issue_date: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    license_validity: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    license_image: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    experience_in_years: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    certificate_copy: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    validity_of_certificate: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    certificate_number: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    dg_trainer: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    transporter_name: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    training_schedule_date: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    deleted_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    updatedAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    deletedAt: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    },
    IsBlock: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0,
    }
}, {
    timestamps: false,
    sequelize: sequelize_2.default,
    tableName: "trainees",
});
//TODO Association with Users
Trainee.belongsTo(users_model_1.default, {
    foreignKey: "login_table_id",
});
//TODO Association with Company
Trainee.belongsTo(company_model_1.default, {
    foreignKey: "company_id",
});
Trainee.belongsTo(subcompany_model_1.default, {
    foreignKey: 'sub_company_id'
});
Trainee.hasMany(trainee_curriculum_model_1.default, {
    foreignKey: "trainee_id",
});
Trainee.belongsTo(trainer_model_1.default, {
    foreignKey: "trainer_id"
});
subcompany_model_1.default.hasMany(Trainee, {
    foreignKey: "sub_company_id"
});
Trainee.belongsTo(company_department_model_1.default, {
    foreignKey: "department_id"
});
company_department_model_1.default.hasMany(Trainee, {
    foreignKey: "department_id",
});
