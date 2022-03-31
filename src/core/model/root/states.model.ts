import { DataTypes, Model } from "sequelize";
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
    state_code: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    country_id: {
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
    tableName: 'states'
});

