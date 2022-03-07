import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";

interface LogAttributes
{
    id:number;
    user_id:number;
    message:string;
    createdAt:string;
}

export default class Log extends Model
{
    declare id:number;
    user_id!:number;
    message!:string;
    createdAt!:string;
}

Log.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt:{
        type:"timestamp"
    }
},{
    sequelize:sequelizeconnection,
    tableName:'log'
});
