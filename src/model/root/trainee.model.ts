import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Languages from "../language/language.model";
import Company from "./company.model";
import CompanyDepartment from "./company_department.model";
import SubCompany from "./subcompany.model";
import Users from "./users.model";



interface TraineeAttributes {
    id: number;
    RegNo: string;
    sub_company_id:number;
    department_id:number;
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
    IsBlock: string;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number

}

export default class Trainee extends Model {
    id!: number;
    RegNo!: string;
    sub_company_id!:number;
    department_id!:number;
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
    IsBlock!: string;
    created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number
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
        allowNull: true
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Company,
            key:"id"
        }
    },
    sub_company_id:
    {
        type:DataTypes.INTEGER,
        references:{
            model:SubCompany,
            key:"id"
        }
    },
    department_id:
    {
        type:DataTypes.INTEGER,
        references:{
            model:CompanyDepartment,
            key:"id"
        }
    },
    login_table_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model:Users,
            key:'id'
        }
    },
    staff_id: {
        type: DataTypes.INTEGER,
    },
    first_name: {
        type: DataTypes.STRING
    },
    middle_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true
    },
    alternate_contact_no: {
        type: DataTypes.STRING
    },
    aadhar_no: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    education: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    marrital_status: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.STRING
    },
    date_of_birth: {
        type: DataTypes.STRING
    },
    subscription_id: {
        type: DataTypes.STRING
    },
    service_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    adp_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vehicle_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true
    },
    course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fees: {
        type: DataTypes.STRING,
        allowNull: true
    },
    receipt_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mode_of_payment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cheque_dd_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    trainer_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active_status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    activation_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expiry_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    driver_photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    license_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    license_issue_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    license_validity: {
        type: DataTypes.STRING,
        allowNull: true
    },
    license_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    experience_in_years: {
        type: DataTypes.STRING,
        allowNull: true
    },
    certificate_copy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    validity_of_certificate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    certificate_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dg_trainer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transporter_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    training_schedule_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deleted_by: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: "TIMESTAMP",
    },
    updatedAt: {
        type: "TIMESTAMP",
    },
    deletedAt: {
        type: "TIMESTAMP"
    },
    IsBlock:{
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    IsDeleted:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
}, {
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


SubCompany.hasMany(Trainee,{
    foreignKey:"sub_company_id"
  })

  CompanyDepartment.hasMany(Trainee,{
    foreignKey: "department_id",
  })