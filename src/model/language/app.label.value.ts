import { Model, DataTypes } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Applabels from "./app.label";
import Languages from "./language.model";


interface AppLabelValueAttributes {
    id: Number;
    f_languageid: Number;
    f_labelid: Number;
    name: String;
    description: String;
    created_by: number;
    updated_by: number;
    deleted_by: string;
    deletedAt: string;
    createdAt: string;
    updatedAt: string;
    IsDeleted: number;
}



export default class ApplabelValue extends Model<AppLabelValueAttributes>{
    id!: Number;
    f_languageid!: Number;
    f_labelid!: Number;
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


ApplabelValue.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    f_languageid: {
        type: DataTypes.INTEGER,
        references: {
            model: Languages,
            key: 'id'
        }
    },
    f_labelid: {
        type: DataTypes.INTEGER,
        references: {
            model: "Applabels",
            key: 'id'
        }
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
    tableName: "app_label_value"
});

Applabels.hasOne(ApplabelValue, {
    foreignKey: 'f_labelid'
})


ApplabelValue.belongsTo(Applabels,{
    foreignKey:'f_labelid'
})


