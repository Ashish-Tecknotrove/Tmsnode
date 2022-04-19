import {Model} from "sequelize";
import { DataType } from "sequelize-typescript";
import sequelizeconnection from "../../database/sequelize";
import CurriculumParentCategoryTest from "../root/curriculum_parent_category_test.model";
import Trainee from "../root/trainee.model";
import ElearningStatus from "./elearning_status.model";

export default class ElearningResult extends Model {
    declare id: number;
    session_id!:number;
    test_start!:number;
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
        type: DataType.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    trainee_id: {
        type: DataType.INTEGER,
        references: {
            model: Trainee,
            key: "id"
        }
    },
    session_id: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    test_start: {
        type: DataType.INTEGER
    },
    curriculum_test_id: {
        type: DataType.INTEGER,
        references:{
            model:CurriculumParentCategoryTest,
            key:'id'
        }
    },
    attempt_no: {
        type: DataType.INTEGER
    },
    total: {
        type: DataType.INTEGER,
    },
    score: {
        type: DataType.INTEGER
    },
    status: {
        type: DataType.INTEGER,
        references:{
            model:ElearningStatus,
            key:'id'
        }
    },
    duration: {
        type: DataType.STRING
    },
    result_json: {
        type: DataType.STRING
    },
    result_response: {
        type: DataType.STRING
    },
    result_status: {
        type: DataType.STRING
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataType.INTEGER,
        //allowNull: false
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
        type: DataType.STRING(50),
    },
    IsBlock: {
        type: DataType.TINYINT,
        defaultValue: 0
    },
    IsDeleted: {
        type: DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps:false,
    tableName: 'elearning_result',
    sequelize: sequelizeconnection
});


CurriculumParentCategoryTest.hasMany(ElearningResult,{
    foreignKey:'curriculum_test_id'
})

ElearningResult.belongsTo(CurriculumParentCategoryTest,{
    foreignKey:'curriculum_test_id'
})
ElearningResult.belongsTo(ElearningStatus,{
    foreignKey:'status'
})