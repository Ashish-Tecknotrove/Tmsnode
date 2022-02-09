import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import Subscription from "./subscription.model";


interface CurriculumAttributes{
    id:number;
    company_id:number;
    name:string;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number

}


export default class Curriculum extends Model
{
    declare id: number;
    company_id!: number;
    name!: string;
    created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number


}


Curriculum.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    company_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Company,
            key:"id"
        }
    },
    name:{
        type:DataTypes.STRING(100),
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    IsDeleted:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }

},{
    timestamps:true,
    sequelize:sequelizeconnection,
    tableName:'curriculum'
})


// Curriculum.belongsTo(Company,{
//     foreignKey:"company_id"
// })

Curriculum.hasMany(Subscription,{
    foreignKey:'curriculum_id'
})