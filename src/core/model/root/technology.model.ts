import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import CurriculumParentCategory from "./curriculum_parent_category.model";

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
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    description:{
        type:DataTypes.STRING
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
    sequelize:sequelizeconnection,
    tableName:'technology_type'
});


// TechnologyCategory.hasMany(CurriculumParentCategory,{
//     as: 'technology',
//     foreignKey:'technology_type_id'
// });