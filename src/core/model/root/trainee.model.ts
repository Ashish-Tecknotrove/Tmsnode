import { DataType } from 'sequelize-typescript';
import { Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Languages from "../language/language.model";
import Company from "./company.model";
import CompanyDepartment from "./company_department.model";
import SubCompany from "./subcompany.model";
import TraineeCurriculum from "./trainee_curriculum.model";
import Users from "./users.model";
import Trainer from './trainer.model';

interface TraineeAttributes {
  id: number;
  RegNo: string;
  sub_company_id: number;
  department_id: number;
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
  company_unique_id: string;
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
  created_by: number;
  updated_by: number;
  deleted_by: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  IsDeleted: number;
}

export default class Trainee extends Model {
  id!: number;
  enrollmentId!: string;
  sub_company_id!: number;
  department_id!: number;
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
  company_unique_id!: string;
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
  created_by!: number;
  updated_by!: number;
  deleted_by!: string;
  deletedAt!: string;
  createdAt!: string;
  updatedAt!: string;
  IsDeleted!: number;
}

Trainee.init(
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    enrollmentId: {
      type: DataType.STRING
    },
    company_id: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: "id",
      },
    },
    sub_company_id: {
      type: DataType.INTEGER,
      references: {
        model: SubCompany,
        key: "id",                
      },
      allowNull:true
    },
    department_id: {
      type: DataType.INTEGER,
      references: {
        model: CompanyDepartment,
        key: "id",
      },
      allowNull:true
    },
    login_table_id: {
      type: DataType.INTEGER,
      allowNull: true,
      references: {
        model: Users,
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
      type: DataType.INTEGER
    },
    updated_by: {
      type: DataType.INTEGER
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
  },
  {
    timestamps:false,
    sequelize: sequelizeconnection,
    tableName: "trainees",
  }
);

//TODO Association with Users
Trainee.belongsTo(Users, {
  foreignKey: "login_table_id",
});

//TODO Association with Company
Trainee.belongsTo(Company, {
  foreignKey: "company_id",
});


Trainee.belongsTo(SubCompany, {
  foreignKey: 'sub_company_id'
})

Trainee.hasMany(TraineeCurriculum, {
  foreignKey: "trainee_id",
});

Trainee.belongsTo(Trainer,{
  foreignKey: "trainer_id"
})

SubCompany.hasMany(Trainee, {
  foreignKey: "sub_company_id"
})

Trainee.belongsTo(CompanyDepartment, {
  foreignKey: "department_id"
})

CompanyDepartment.hasMany(Trainee, {
  foreignKey: "department_id",
});
