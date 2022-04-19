import { DataType } from 'sequelize-typescript';
import { Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";

interface StatesAttributes {
    id: number;
    title: string;
    slug: string;
    state_code: string;
    country_id: number;
    created_by: number;
    updated_by: number;
    deleted_by: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    IsDeleted: number;
}



export default class States extends Model {
    id!: number;
    title!: string;
    slug!: string;
    state_code!: string;
    country_id!: number;
    created_by!: number;
    updated_by!: number;
    deleted_by!: string;
    createdAt!: string;
    updatedAt!: string;
    deletedAt!: string;
    IsDeleted!: number;

}


States.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataType.STRING(100),
        allowNull: false
    },
    slug: {
        type: DataType.STRING
    },
    state_code: {
        type: DataType.STRING(100),
        allowNull: false
    },
    country_id: {
        type: DataType.INTEGER
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: DataType.INTEGER
    },
    deleted_by:{
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
    tableName: 'states'
});

