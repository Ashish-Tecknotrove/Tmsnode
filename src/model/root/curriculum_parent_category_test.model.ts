import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Languages from "../language/language.model";
import CurriculumParentCategory from "./curriculum_parent_category.model";


interface CurriculumParentCategoryTestAttributes {
    id: number;
    prefix: string;
    title: string;
    parent_id: number;
    technology_type_id: number;
    language_id: number;
    created_by: number;
    updated_by: number;
}

export default class CurriculumParentCategoryTest extends
    Model<CurriculumParentCategoryTestAttributes> implements CurriculumParentCategoryTestAttributes {
    id!: number;
    prefix!: string;
    title!: string;
    parent_id!: number;
    technology_type_id!: number;
    language_id!: number;
    created_by!: number;
    updated_by!: number;

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
    parent_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CurriculumParentCategory,
            key: "id"
        }
    },
    technology_type_id: {
        type: DataTypes.INTEGER
    },
    language_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Languages,
            key: "id"
        }
    },
    created_by: {
        type: DataTypes.INTEGER
    },
    updated_by: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: true,
    sequelize: sequelizeconnection,
    tableName: 'curriculum_parent_category_test'
});


//TODO ASSOCATION LANGUAGE

CurriculumParentCategoryTest.belongsTo(Languages, {
    foreignKey: 'language_id'
})

//TODO ASSOCIATION Parent ID

CurriculumParentCategoryTest.belongsTo(CurriculumParentCategory, {
    foreignKey: "parent_id"
})