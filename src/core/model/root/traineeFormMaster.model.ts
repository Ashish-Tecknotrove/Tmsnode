import { DataType } from 'sequelize-typescript';
import {  Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";


export default class TraineeFormMasterModel extends Model{
    id!:Number;
    form_field!:string;
    form_label!:string;
}

TraineeFormMasterModel.init({
    id:{
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false
    },
    form_field:{
        type:DataType.STRING,
    },
    form_label:{
        type:DataType.STRING,
    },
    custom:{
        type:DataType.INTEGER,
    },
    created_by:{
        type:DataType.INTEGER,
    },
    updated_by:{
        type:DataType.STRING,
    },
    createdAt:{
        type: DataType.STRING(100)
    },
    updatedAt:{
        type: DataType.STRING(100)
    },
    IsDeleted:{
        type: DataType.TINYINT,
        defaultValue: 0
    }
},{
    timestamps:false,
    sequelize:sequelizeconnection,
    tableName:'trainee_form_master'
});
