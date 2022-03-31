import {DataTypes, Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Curriculum from "./curriculum.model";
import CurriculumParentCategory from "./curriculum_parent_category.model";
import CurriculumParentCategoryTest from "./curriculum_parent_category_test.model";
import Subscription from "./subscription.model";
import TraineeRemarks from "./trainee_remark.model";


interface CurriculumBuilderAttribute {
    id: number;
    curriculum_id: number;
    vehicle_id: number;
    curriculum_parent_category_id: number;
    curriculum_parent_category_test_id: number;
    passing_marks: number;
    total_marks: number;
    attempts: number;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number

}


export default class CurriculumBuilder extends Model {
    declare id: number;
    curriculum_id!: number;
    vehicle_id!: number;
    curriculum_parent_category_id!: number;
    curriculum_parent_category_test_id!: number;
    passing_marks!: number;
    total_marks!: number;
    attempts!: number;
    created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number

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
        passing_marks: {
            type: DataTypes.INTEGER,
        },
        total_marks: {
            type: DataTypes.INTEGER,
        },
        attempts: {
            type: DataTypes.INTEGER,
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
    },
    {
        timestamps: true,
        sequelize: sequelizeconnection,
        tableName: 'curriculum_builder'
    }
)


CurriculumBuilder.belongsTo(CurriculumParentCategory, {
    foreignKey: "curriculum_parent_category_id"
})

CurriculumBuilder.belongsTo(CurriculumParentCategoryTest, {
    foreignKey: "curriculum_parent_category_test_id"
})



CurriculumBuilder.hasOne(Subscription,{
    foreignKey:"curriculum_id"
})

Curriculum.hasMany(CurriculumBuilder,{
    foreignKey:"curriculum_id",
    //as:"UsedSubscription"
})

CurriculumBuilder.belongsTo(Curriculum, {
    foreignKey: "curriculum_id"
})

CurriculumBuilder.hasOne(Subscription, {
    foreignKey: "curriculum_id"
})

CurriculumBuilder.hasOne(TraineeRemarks, {
    foreignKey: "curriculum_builder_id"
})