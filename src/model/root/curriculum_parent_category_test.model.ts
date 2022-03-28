import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import ElearningMaster from "../elearning/eLearningmaster.model";
import Languages from "../language/language.model";
import CurriculumParentCategory from "./curriculum_parent_category.model";
import TechnologyCategory from "./technology.model";


interface CurriculumParentCategoryTestAttributes {
    id: number;
    prefix: string;
    title: string;
    description:string;
    parent_id: number;
    technology_type_id: number;
    language_id: number;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number
}

export default class CurriculumParentCategoryTest extends Model
{
    declare id: number;
    prefix!: string;
    title!: string;
    description!:string;
    parent_id!: number;
    technology_type_id!: number;
    language_id!: number;
    created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number

}


CurriculumParentCategoryTest.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    prefix: {
        type: DataTypes.STRING(100)
    },
    title: {
        type: DataTypes.STRING(100)
    },
    description: {
        type: DataTypes.STRING(200)
    },
    parent_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CurriculumParentCategory,
            key: "id"
        }
    },
    technology_type_id: {
        type: DataTypes.INTEGER,
        references:{
            model:TechnologyCategory,
            key:"id"
        }
    },
    language_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Languages,
            key: "id"
        }
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
}, {
    timestamps: true,
    sequelize: sequelizeconnection,
    tableName: 'curriculum_parent_category_test'
});

//TODO ASSOCATION Curriculum Parent Category
// CurriculumParentCategoryTest.belongsTo(CurriculumParentCategory,{
    // foreignKey:'technology_type_id'
// })

//TODO ASSOCATION Technology Category
CurriculumParentCategoryTest.belongsTo(TechnologyCategory,{
    foreignKey:'technology_type_id'
})

//TODO ASSOCATION LANGUAGE
CurriculumParentCategoryTest.belongsTo(Languages, {
    foreignKey: 'language_id'
})


CurriculumParentCategoryTest.hasOne(ElearningMaster, {
    foreignKey: "test_id"
})
