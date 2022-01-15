import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import TechnologyCategory from "./technology.model";
import CurriculumParentCategoryTest from "./curriculum_parent_category_test.model";


interface CurriculumParentCategoryAttributes{
    id:number;
    title:string;
    technology_type_id:number;
    created_by:number;
    updated_by:number;
}



export default class CurriculumParentCategory extends Model{
    declare id: number;
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
        references:{
            model:TechnologyCategory,
            key:"id"
        }
    },
    created_by:{
        type:DataTypes.INTEGER
    },
    updated_by:{
        type:DataTypes.INTEGER
    },
    createdAt: {
        type: "TIMESTAMP"
    },
    updatedAt: {
        type: "TIMESTAMP"
    },
    deletedAt: {
        type: "TIMESTAMP"
    },
    IsDeleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
},{
    timestamps:false,
    sequelize:sequelizeconnection,
    tableName:'curriculum_parent_category'
});

CurriculumParentCategory.hasMany(CurriculumParentCategoryTest, {
    foreignKey: "parent_id"
})
