import { Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import TechnologyCategory from "./technology.model";
import CurriculumParentCategoryTest from "./curriculum_parent_category_test.model";
import { DataType } from "sequelize-typescript";


interface CurriculumParentCategoryAttributes{
    id:number;
    title:string;
    technology_type_id:number;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number
}



export default class CurriculumParentCategory extends Model{
    declare id: number;
    title!: string;
    technology_type_id!: number;
    created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number

}


CurriculumParentCategory.init({
    id:{
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:DataType.STRING(100),
        allowNull:false
    },
    technology_type_id:{
        type:DataType.INTEGER,
        references:{
            model:TechnologyCategory,
            key:"id"
        }
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
    tableName:'curriculum_parent_category'
});

CurriculumParentCategory.belongsTo(TechnologyCategory,{
    foreignKey:"technology_type_id"
})

CurriculumParentCategory.hasMany(CurriculumParentCategoryTest, {
    foreignKey: "parent_id"
})

