import { DataTypes, Model } from "sequelize";
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
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    parent_id: {
        type: DataTypes.INTEGER,
    },
    panel_id: {
        type: DataTypes.INTEGER,
        references:{
            model:MasterPanel,
            key:'id'
        },
        allowNull:false
    },
    menu_id: {
        type: DataTypes.STRING(100),
    },
    menu_label: {
        type: DataTypes.STRING(100),
    },
    router_link:{
        type: DataTypes.STRING,
    },
    icon:{
        type: DataTypes.STRING
    },
    type:{
        type: DataTypes.STRING,
    },
    sequence:{
        type: DataTypes.INTEGER,
    },
    created_by: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: "TIMESTAMP"
    },
    IsDeleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
},{
    sequelize:sequelizeconnection,
    tableName:'master_menu'
})