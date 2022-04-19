import {  Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import CurriculumBuilder from "./curriculumbuilder.model";
import Subscription from "./subscription.model";
import TraineeCurriculum from "./trainee_curriculum.model";


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
    sequence!:number;
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
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    company_id:{
        type:DataType.INTEGER,
        allowNull:false,
        references:{
            model:Company,
            key:"id"
        }
    },
    name:{
        type:DataType.STRING(100),
    },
    sequence:{
        type:DataType.TINYINT,
        defaultValue:"1"
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataType.INTEGER
    },
    deleted_by: {
        type: DataType.INTEGER
    },
    createdAt: {
        type: DataType.STRING(50),
    },
    updatedAt: {
        type: DataType.STRING(50),
    },
    deletedAt: {
        type: DataType.STRING(50)
    },
    IsDeleted:{
        type:DataType.TINYINT,
        defaultValue:0
    }

},{
    timestamps:false,
    sequelize:sequelizeconnection,
    tableName:'curriculum'
})


// Curriculum.hasMany(CurriculumBuilder,{
//     foreignKey:"curriculum_id",
//     //as:"UsedSubscription"
// })

// CurriculumBuilder.belongsTo(Curriculum, {
//     foreignKey: "curriculum_id"
// })

//
// Curriculum.hasMany(TraineeCurriculum,{
//     foreignKey:"curriculum_id",
//     as:""
// })

// Curriculum.belongsTo(Company,{
//     foreignKey:"company_id"
// })

// Curriculum.belongsTo(Subscription,{
//     foreignKey:'curriculum_id'
// })
