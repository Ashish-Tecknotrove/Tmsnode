import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";


interface CurriculumParentCategoryAttributes{
    id:number;
    title:string;
    technology_type_id:number;
    created_by:number;
    updated_by:number;
}



export default class CurriculumParentCategory extends Model<CurriculumParentCategoryAttributes> implements CurriculumParentCategoryAttributes{
    id!: number;
    title!: string;
    technology_type_id!: number;
    created_by!: number;
    updated_by!: number;

}


CurriculumParentCategory.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    technology_type_id:{
        type:DataTypes.INTEGER,
    },
    created_by:{
        type:DataTypes.INTEGER
    },
    updated_by:{
        type:DataTypes.INTEGER
    }
},{
    timestamps:true,
    sequelize:sequelizeconnection,
    tableName:'curriculum_parent_category'
});
