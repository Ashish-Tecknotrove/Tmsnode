import { DataType } from 'sequelize-typescript';
import { Model,Optional } from "sequelize";
import Class from "../root/Class";

import sequelizeConnection from '../../database/sequelize';
import ApplabelValue from "./app.label.value";

interface LanguagesAttributes{
    id: number;
    name :string;
    description:string;
    created_by:number;
    updated_by:number;
    deleted_by:number;
    createdAt:string;
    updatedAt:string;
    deletedAt:string;
    IsDeleted:number;
}

export default class Languages extends Model
{
    id!:number; 
    name! :string;
    description!:string;
    created_by!:number;
    updated_by!:number;
    deleted_by!:number;
    createdAt!:string;
    updatedAt!:string;
    deletedAt!:string;
    IsDeleted!:number;
}

Languages.init({
    id: {
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false,
    },
    name:{
        type:DataType.STRING,
        allowNull:false 
    },
    description:{
        type: DataType.TEXT,
        allowNull:true
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: DataType.INTEGER,
        allowNull: false
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
    IsDeleted :{
        type: DataType.TINYINT,
        defaultValue:0
    }
},{
    sequelize:sequelizeConnection,
    tableName:'languages'
});

Languages.hasMany(ApplabelValue,{
    sourceKey:"id",
    foreignKey:'f_languageid',
    as:'app_label_value'
});

ApplabelValue.belongsTo(Languages,{
    foreignKey:"f_languageid",
    targetKey:"id"
});

