import { DataType } from 'sequelize-typescript';
import {  Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import MasterPanel from "./masterpanel.model";


export default class Mastermenu extends Model
{
    id!:Number;
    parent_id!:Number;
    panel_id!:Number;
    menu_id!:string;
    menu_label!:string;
    router_link!:string;
    icon!:string;
    type!:string;
    sequence!:number
    created_by!: number
    createdAt!:string
	IsDeleted!:number
}

Mastermenu.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    parent_id: {
        type: DataType.INTEGER,
    },
    panel_id: {
        type: DataType.INTEGER,
        references:{
            model:MasterPanel,
            key:'id'
        },
        allowNull:false
    },
    menu_id: {
        type: DataType.STRING(100),
    },
    menu_label: {
        type: DataType.STRING(100),
    },
    router_link:{
        type: DataType.STRING,
    },
    icon:{
        type: DataType.STRING
    },
    type:{
        type: DataType.STRING,
    },
    sequence:{
        type: DataType.INTEGER,
    },
    created_by: {
        type: DataType.STRING,
    },
    createdAt: {
        type: DataType.STRING,
    },
    IsDeleted: {
        type: DataType.TINYINT,
        defaultValue: 0
    }
},{
    timestamps:false,
    sequelize:sequelizeconnection,
    tableName:'master_menu'
})