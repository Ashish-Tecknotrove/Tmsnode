import { DataType } from 'sequelize-typescript';
import { Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import CurriculumBuilder from "./curriculumbuilder.model";
import Trainee from './trainee.model';
import Trainer from './trainer.model';
import Curriculum from './curriculum.model';


export default class TraineeRemarks extends Model {
    id!: number;
    trainee_id!: number;
    trainer_id!: number;
    curriculum_id!: number;
    curriculum_builder_id!: number;
    remarks!: string;
    created_by!: number;
    updated_by!: number;
    deleted_by!: number;
    createdAt!: string;
    updatedAt!: string;
    deletedAt!: string;
    IsDeleted!: number;
}


TraineeRemarks.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    trainee_id: {
        type: DataType.INTEGER,
        references: {
            model: Trainee,
            key: 'id'
        }
    },
    trainer_id: {
        type: DataType.INTEGER,
        references: {
            model: Trainer,
            key: 'id'
        }
    },
    curriculum_id: {
        type: DataType.INTEGER,
        references: {
            model: Curriculum,
            key: 'id'
        }
    },
    curriculum_builder_id: {
        type: DataType.INTEGER,
        references: {
            model: CurriculumBuilder,
            key: 'id'
        }
    },
    remarks: {
        type: DataType.STRING
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: DataType.INTEGER
    },
    deleted_by: {
        type: DataType.INTEGER
    },
    createdAt: {
        type: DataType.STRING(100)
    },
    updatedAt: {
        type: DataType.STRING(100)
    },
    deletedAt: {
        type: DataType.STRING(100)
    },
    IsDeleted: {
        type: DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps:false,
    sequelize: sequelizeconnection,
    tableName: 'trainee_remark'
});