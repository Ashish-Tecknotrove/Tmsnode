import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";

interface CitiesAttributes {
    id: number;
    title: string;
    slug: string;
    stateid: number;
    created_by: number
    updated_by: number
    deleted_by: string
    createdAt: string
    updatedAt: string
    deletedAt: string
    IsDeleted: number
}



export default class Cities extends Model {
    id!: number;
    title!: string;
    slug!: string;
    stateid!: number;
    created_by!: number;
    updated_by!: number;
    deleted_by!: string;
    createdAt!: string;
    updatedAt!: string;
    deletedAt!: string;
    IsDeleted!: number;

}


Cities.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING
    },
    stateid: {
        type: DataTypes.INTEGER
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
    IsDeleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    sequelize: sequelizeconnection,
    tableName: 'cities'
});

