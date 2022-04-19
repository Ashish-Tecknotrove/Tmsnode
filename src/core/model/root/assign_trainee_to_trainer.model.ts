import {Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import MasterPanel from "./masterpanel.model";
import Trainer from "./trainer.model";
import Trainee from "./trainee.model";
import { DataType } from "sequelize-typescript";


interface Assign_trainee_to_trainerAttributes {
    id: number;
    trainer_id: number;
    trainee_id: number;
    created_by: number;
    updated_by: number;
    deleted_by: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    IsBlock: number;
    IsDeleted: number;
}

export default class Assign_trainee_to_trainer extends Model {
    id!: number;
    trainer_id!: number;
    trainee_id!: number;
    created_by!: number;
    updated_by!: number;
    deleted_by!: number;
    createdAt!: string;
    updatedAt!: string;
    deletedAt!: string;
    IsBlock!: number;
    IsDeleted!: number;
}
Assign_trainee_to_trainer.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    trainer_id: {
        type: DataType.INTEGER,
        references: {
            model: Trainer,
            key: 'id'
        },
        allowNull: false
    },
    trainee_id: {
        type: DataType.INTEGER,
        references: {
            model: Trainee,
            key: 'id'
        },
        allowNull: false
    },
    created_by: {
        type: DataType.INTEGER
    },
    updated_by: {
        type: DataType.INTEGER
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
    sequelize: sequelizeconnection,
    tableName: 'assign_trainee_to_trainer'
})

Assign_trainee_to_trainer.belongsTo(Trainee, {
    foreignKey: 'trainee_id'
})
