import { DataType } from 'sequelize-typescript';

import { Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";


interface MasterDepartmentAttributes {
    id: number;
    company_id: number;
    descripition: string;
    name: string;
    created_by: number
    updated_by: number
    deleted_by: number
    deletedAt: string
    createdAt: string
    updatedAt: string
    IsDeleted: number

}


export default class MasterDepartment extends Model {
    id!: number;
    company_id!: number;
    descripition!: string;
    name!: string;
    created_by!: number
    updated_by!: number
    deleted_by!: number
    deletedAt!: string
    createdAt!: string
    updatedAt!: string
    IsDeleted!: number
}



MasterDepartment.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'id'
        }
    },
    name: {
        type: DataType.STRING(100),
        allowNull: true
    },
    descripition: {
        type: DataType.STRING(200)
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataType.INTEGER,
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
    sequelize: sequelizeconnection,
    tableName: 'master_department'
})
