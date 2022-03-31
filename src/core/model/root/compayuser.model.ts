import { DataType } from "sequelize-typescript";
import {Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import Users from "./users.model";



interface CompanyUserAttributes
{
    id:number;
    company_id:number;
    login_table_id:number;
    name:string;
    department:string;
    mobile_no:string;
    canlogin:number;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number
}


export default class  CompanyUser extends Model
{
    declare id: number;
    company_id!: number;
    login_table_id!:number;
    name!: string;
    designation!: string;
    mobile_no!: string;
    canlogin!:number;
    created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number
}


CompanyUser.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      company_id: {
        type: DataType.INTEGER,
        references:{
          model:"Company",
          key:'id'
        }
      },
      login_table_id:{
        type:DataType.INTEGER,
        allowNull:true,
        references:{
          model:"Users",
          key:'id'
        }
      },
      email:{
        type: DataType.STRING(100),
      },
      name: {
        type: DataType.STRING(100),
        allowNull: false
      },
      designation: {
        type: DataType.STRING(100),
        allowNull: false
      },
      mobile_no: {
        type: DataType.STRING,
        allowNull: false
      },
    canlogin:{
        type:DataType.ENUM("1","0"),
        defaultValue:"0"
    },
    created_by: {
      type: DataType.INTEGER,
      allowNull: false
  },
  updated_by: {
      type: DataType.INTEGER,
      allowNull: false
  },
  deleted_by: {
      type: DataType.INTEGER
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
  IsDeleted:{
      type:DataType.TINYINT,
      defaultValue:0
  }
},{
    timestamps:true,
    sequelize:sequelizeconnection,
    tableName:"company_contacts"
});



// CompanyUser.belongsTo(Users,{
//   foreignKey:"login_table_id"
// });

// CompanyUser.belongsTo(Company,{
//   foreignKey:"company_id",
//   targetKey:"id"
// });

