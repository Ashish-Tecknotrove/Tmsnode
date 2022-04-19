import {  Model } from "sequelize";
import {AllowNull, DataType} from "sequelize-typescript";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import MasterDepartment from "./master_department.model";
import SubCompany from "./subcompany.model";
import Trainee from "./trainee.model";
import Trainer from "./trainer.model";
import Users from "./users.model";

interface CompanyDepartmentAttributes {
  id: number;
  company_id: number;
  sub_company_id: number;
  department_id: number;
  name: string;
  contactNumber: string;
  designation: string;
  email: string;
  password: string;
  login_table_id: number;
  created_by: number;
  updated_by: number;
  deleted_by: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  IsBlock: number;
  IsDeleted: number;
}

export default class CompanyDepartment extends Model {
  id!: number;
  company_id!: number;
  sub_company_id!: number;
  department_id!: number;
  name!: string;
  contactNumber!: string;
  designation!: string;
  email!: string;
  password!: string;
  login_table_id!: number;
  created_by!: number;
  updated_by!: number;
  deleted_by!: string;
  deletedAt!: string;
  createdAt!: string;
  updatedAt!: string;
  IsBlock!: number;
  IsDeleted!: number;
}

CompanyDepartment.init(
  {
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
      },
      department_id: {
          type: DataType.INTEGER,
          allowNull: false,
          references: {
              model: MasterDepartment,
              key: "id",
          },
      },
      login_table_id: {
          type: DataType.INTEGER,
          allowNull: true,
          references: {
              model: Users,
              key: "id",
          },
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
          type: DataType.INTEGER
      },
      updated_by: {
          type: DataType.INTEGER,
      },
      deleted_by: {
          type: DataType.INTEGER,
      },
      createdAt: {
          type: DataType.STRING(50),
      },
      updatedAt: {
          type: DataType.STRING(50),
      },
      deletedAt: {
          type: DataType.STRING(50),
      },
      IsBlock: {
          type: DataType.TINYINT,
          defaultValue: 0,
      },
      IsDeleted: {
          type: DataType.TINYINT,
          defaultValue: 0,
      }
  },
  {
    timestamps:false,
    sequelize: sequelizeconnection,
    tableName: "company_department",
  }
);

CompanyDepartment.belongsTo(MasterDepartment, {
  foreignKey: "department_id",
});

CompanyDepartment.belongsTo(Company, {
  foreignKey: "company_id",
});

CompanyDepartment.belongsTo(SubCompany, {
  foreignKey: "sub_company_id",
});

SubCompany.hasMany(CompanyDepartment, {
  foreignKey: "sub_company_id",
});

CompanyDepartment.hasMany(Trainer,{
    foreignKey: "department_id",
})

Trainer.belongsTo(CompanyDepartment,{
  foreignKey: "department_id",
})

CompanyDepartment.belongsTo(Users,{
    foreignKey:"login_table_id"
})