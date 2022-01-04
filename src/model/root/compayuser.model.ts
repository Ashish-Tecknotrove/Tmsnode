import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";



interface CompanyUserAttributes
{
    id:number;
    company_id:number;
    name:string;
    department:string;
    mobile_no:string;
    created_by:number;
    updated_by:number;
}


export default class CompanyUser extends Model<CompanyUserAttributes> implements CompanyUserAttributes
{
    id!: number;
    company_id!: number;
    name!: string;
    department!: string;
    mobile_no!: string;
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
      created_by: {
        type: DataTypes.STRING
      },
      updated_by: {
        type: DataTypes.STRING
      }
},{
    timestamps:true,
    sequelize:sequelizeconnection,
    tableName:"companyUser"
})


//TODO Association with Company
CompanyUser.belongsTo(Company,{
    foreignKey:"company_id"
});
