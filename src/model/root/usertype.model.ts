import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";




interface UserTypeAttributes{
    id:Number,
    name:String,
    description:String,
    active:Number,
}


export default class UserType extends Model
{
    id!:Number;
    name!:String;
    description!:String;
    active!:Number;

}



UserType.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    active:{
        type:DataTypes.TINYINT,
        defaultValue:1,
        allowNull:false
    },
    createdAt: {
        type: "TIMESTAMP"
    },
    updatedAt: {
        type: "TIMESTAMP"
    },
    deletedAt: {
        type: "TIMESTAMP"
    },
    IsDeleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
},{
    timestamps:true,
    sequelize:sequelizeconnection,
    tableName:'user_types'
});
