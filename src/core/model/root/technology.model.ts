import { DataType } from 'sequelize-typescript';
import { Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";

interface TechnologyCategoryAttributes{
    id:number;
    name:string;
    description:number;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number
}



export default class TechnologyCategory extends Model{
    id!: number;
    name!: string;
    description!: number;
    created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number

}


TechnologyCategory.init({
    id:{
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataType.STRING(100),
        allowNull:false
    },
    description:{
        type:DataType.STRING
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: DataType.INTEGER
    },
    deleted_by:{
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
    IsDeleted :{
        type: DataType.TINYINT,
        defaultValue:0
    }
},{
    timestamps:false,
    sequelize:sequelizeconnection,
    tableName:'technology_type'
});


// TechnologyCategory.hasMany(CurriculumParentCategory,{
//     as: 'technology',
//     foreignKey:'technology_type_id'
// });