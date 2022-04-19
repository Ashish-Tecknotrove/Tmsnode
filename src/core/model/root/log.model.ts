import { DataType } from "sequelize-typescript";
import { Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";

interface LogAttributes {
    id: number;
    user_id: number;
    message: string;
    created_by: number;
    updated_by: number;
    deleted_by: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    IsDeleted: number;
}

export default class Log extends Model {
    declare id: number;
    user_id!: number;
    message!: string;
    created_by!: number;
    updated_by!: number;
    deleted_by!: number;
    createdAt!: string;
    updatedAt!: string;
    deletedAt!: string;
    IsDeleted!: number;
}

Log.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
    message: {
        type: DataType.STRING,
        allowNull: false
    },
    description: {
        type: DataType.TEXT,
        allowNull: true
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: DataType.INTEGER,
        allowNull: false
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
    tableName: 'log'
});
