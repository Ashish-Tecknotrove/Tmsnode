import { DataTypes, Model } from "sequelize";
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
    created_by:number;
    updated_by:number;
}


export default class  CompanyUser extends Model
{
    declare id: number;
    company_id!: number;
    login_table_id!:number;
    name!: string;
    department!: string;
    mobile_no!: string;
    canlogin!:number;
    created_by!: number;
    updated_by!: number;

}


CompanyUser.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
          model:Company,
          key:'id'
        }
      },
      login_table_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
          model:Users,
          key:'id'
        }
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      department: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      mobile_no: {
        type: DataTypes.STRING,
        allowNull: false
      },
    canlogin:{
        type:DataTypes.ENUM("1","0"),
        defaultValue:"0"
    },
      created_by: {
        type: DataTypes.INTEGER
      },
      updated_by: {
        type: DataTypes.INTEGER
      }
},{
    timestamps:true,
    sequelize:sequelizeconnection,
    tableName:"company_contacts"
})


//TODO Association with Company
CompanyUser.belongsTo(Company,{
    foreignKey:"company_id"
});

CompanyUser.belongsTo(Users,{
  foreignKey:"login_table_id"
});



