import { DataType } from 'sequelize-typescript';
import {  Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";




interface UserTypeAttributes{
    id:Number,
    name:String,
    description:String,
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number
}


export default class UserType extends Model
{
    id!:Number;
    name!:String;
    description!:String;
    created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number

}



UserType.init({
    id:{
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false
    },
    name:{
        type:DataType.STRING,
        allowNull:false
    },
    description:{
        type:DataType.STRING,
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
    timestamps:false,
    sequelize:sequelizeconnection,
    tableName:'user_types'
});
