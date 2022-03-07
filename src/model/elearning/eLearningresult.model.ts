import {DataTypes, Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import CurriculumParentCategoryTest from "../root/curriculum_parent_category_test.model";
import Trainee from "../root/trainee.model";

export default class ElearningResult extends Model {
    declare id: number;
    trainee_id!: number;
    curriculum_test_id!: number;
    attempt_no!: number;
    total!: number;
    score!: number;
    status!: string;
    duration!: string;
    result_json!: string;
    result_response!: string;
    result_status!: string;
    created_by!: number;
    updated_by!: number;
    deleted_by!: number;
    createdAt!: string;
    updatedAt!: string;
    deletedAt!: string;
    IsBlock!: number;
    IsDeleted!: number;

}


ElearningResult.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    trainee_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Trainee,
            key: "id"
        }
    },
    curriculum_test_id: {
        type: DataTypes.INTEGER,
        references:{
            model:CurriculumParentCategoryTest,
            key:'id'
        }
    },
    attempt_no: {
        type: DataTypes.INTEGER
    },
    total: {
        type: DataTypes.INTEGER,
    },
    score: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },
    duration: {
        type: DataTypes.STRING
    },
    result_json: {
        type: DataTypes.STRING
    },
    result_response: {
        type: DataTypes.STRING
    },
    result_status: {
        type: DataTypes.STRING
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
        //allowNull: false
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
    IsBlock: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    IsDeleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    tableName: 'elearning_result',
    sequelize: sequelizeconnection
});


CurriculumParentCategoryTest.hasMany(ElearningResult,{
    foreignKey:'curriculum_test_id'
})

ElearningResult.belongsTo(CurriculumParentCategoryTest,{
    foreignKey:'curriculum_test_id'
})