import {DataTypes, Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";

export default class ElearningStatus extends Model {
    declare id: number;
    status!: string;
    active!: number;

}


ElearningStatus.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.INTEGER
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
    active: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }
}, {
    timestamps:false,
    tableName: 'elearning_status',
    sequelize: sequelizeconnection
});
