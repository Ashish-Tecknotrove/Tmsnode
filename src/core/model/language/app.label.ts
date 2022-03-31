import { Model, DataTypes } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import sequelizeConnection from '../../database/sequelize';
import ApplabelValue from "./app.label.value";


interface AppLabelsAttributes {
    id: Number,
    name: String,
    description: String,
    created_by: number
    updated_by: number
    deleted_by: string
    deletedAt: string
    createdAt: string
    updatedAt: string
    IsDeleted: number
}



export default class Applabels extends Model<AppLabelsAttributes>{
    id!: Number;
    name!: String;
    description!: String;
    created_by!: number;
    updated_by!: number;
    deleted_by!: string;
    deletedAt!: string;
    createdAt!: string;
    updatedAt!: string;
    IsDeleted!: number;
}


Applabels.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
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
    timestamps: true,
    sequelize: sequelizeconnection,
    tableName: "app_labels"
});

// Applabels.hasMany(ApplabelValue, {
//     foreignKey: 'f_labelid'
// })

    // ApplabelValue.belongsTo(Applabels, {
    //     foreignKey: 'f_labelid',
    //     targetKey:"id"
    // });