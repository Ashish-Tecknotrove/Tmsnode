import {DataTypes, Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Curriculum from "./curriculum.model";
import CurriculumParentCategory from "./curriculum_parent_category.model";
import CurriculumParentCategoryTest from "./curriculum_parent_category_test.model";


interface CurriculumBuilderAttribute {
    id: number;
    curriculum_id: number;
    vehicle_id: number;
    curriculum_parent_category_id: number;
    curriculum_parent_category_test_id: number;
    created_by: string;
    updated_by: string;

}


export default class CurriculumBuilder extends Model {
    declare id: number;
    curriculum_id!: number;
    vehicle_id!: number;
    curriculum_parent_category_id!: number;
    curriculum_parent_category_test_id!: number;
    created_by!: string;
    updated_by!: string;

}


CurriculumBuilder.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        curriculum_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Curriculum,
                key: "id"
            }
        },
        vehicle_id: {
            type: DataTypes.INTEGER,
        },
        curriculum_parent_category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: CurriculumParentCategory,
                key: "id"
            }
        },
        curriculum_parent_category_test_id: {
            type: DataTypes.INTEGER,
            references: {
                model: CurriculumParentCategoryTest,
                key: "id"
            }
        },
        created_by: {
            type: DataTypes.INTEGER
        },
        updated_by: {
            type: DataTypes.INTEGER
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
    },
    {
        timestamps: true,
        sequelize: sequelizeconnection,
        tableName: 'curriculum_builder'
    }
)