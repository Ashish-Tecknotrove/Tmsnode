import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Languages from "../language/language.model";
import Company from "./company.model";
import Users from "./users.model";



interface TraineeAttributes {
    id: number;
    RegNo: string;
    login_table_id: number;
    staff_id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    contact: string;
    alternate_contact_no: string;
    aadhar_no: string;
    gender: string;
    education: string;
    address: string;
    city: string;
    marrital_status: string;
    age: string;
    date_of_birth: string;
    company_id: string;
    subscription_id: string;
    service_type: string;
    adp_number: string;
    vehicle_type: string;
    designation: string;
    department: string;
    course: string;
    fees: string;
    receipt_number: string;
    mode_of_payment: string;
    cheque_dd_number: string;
    bank_name: string;
    trainer_id: string;
    status: string;
    active_status: string;
    activation_date: string;
    expiry_date: string;
    driver_photo: string;
    license_no: string;
    license_issue_date: string;
    license_validity: string;
    license_image: string;
    experience_in_years: string;
    certificate_copy: string;
    validity_of_certificate: string;
    certificate_number: string;
    dg_trainer: string;
    transporter_name: string;
    training_schedule_date: string;
    created_by: string;
    updated_by: string;
    IsBlock: string;
    IsDeleted: string;


}

export default class Trainee extends Model {
    id!: number;
    RegNo!: string;
    login_table_id!: number;
    staff_id!: number;
    first_name!: string;
    middle_name!: string;
    last_name!: string;
    email!: string;
    contact!: string;
    alternate_contact_no!: string;
    aadhar_no!: string;
    gender!: string;
    education!: string;
    address!: string;
    city!: string;
    marrital_status!: string;
    age!: string;
    date_of_birth!: string;
    company_id!: string;
    subscription_id!: string;
    service_type!: string;
    adp_number!: string;
    vehicle_type!: string;
    designation!: string;
    department!: string;
    course!: string;
    fees!: string;
    receipt_number!: string;
    mode_of_payment!: string;
    cheque_dd_number!: string;
    bank_name!: string;
    trainer_id!: string;
    status!: string;
    active_status!: string;
    activation_date!: string;
    expiry_date!: string;
    driver_photo!: string;
    license_no!: string;
    license_issue_date!: string;
    license_validity!: string;
    license_image!: string;
    experience_in_years!: string;
    certificate_copy!: string;
    validity_of_certificate!: string;
    certificate_number!: string;
    dg_trainer!: string;
    transporter_name!: string;
    training_schedule_date!: string;
    created_by!: string;
    updated_by!: string;
    IsBlock!: string;
    IsDeleted!: string;

}

Trainee.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    RegNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login_table_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Users,
            key:'id'
        }
    },
    staff_id: {
        type: DataTypes.INTEGER,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middle_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alternate_contact_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aadhar_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    education: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marrital_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Company,
            key:"id"
        }
    },
    subscription_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    service_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adp_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicle_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fees: {
        type: DataTypes.STRING,
        allowNull: false
    },
    receipt_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mode_of_payment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cheque_dd_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    trainer_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activation_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiry_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    driver_photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    license_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    license_issue_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    license_validity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    license_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience_in_years: {
        type: DataTypes.STRING,
        allowNull: false
    },
    certificate_copy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    validity_of_certificate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    certificate_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dg_trainer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transporter_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    training_schedule_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IsBlock: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: "TIMESTAMP"
    },
    updatedAt: {
        type: "TIMESTAMP"
    },
    deletedAt: {
        type: "TIMESTAMP"
    },
    IsDeleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: true,
    sequelize: sequelizeconnection,
    tableName: 'trainees'
});


//TODO Association with Users
Trainee.belongsTo(Users,{
    foreignKey:'login_table_id'
});


//TODO Association with Company
Trainee.belongsTo(Company,{
    foreignKey:'company_id'
})
