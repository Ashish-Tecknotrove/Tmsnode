import { Model ,DataTypes} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import sequelizeConnection from '../../database/sequelize';


interface AppLabelsAttributes{
    id:Number,
    name:String,
    description:String,
    createdBy:String,
    updatedBy:String,
    active:Number,
}



export default class Applabels extends Model<AppLabelsAttributes>{}


Applabels.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING
    },
    createdBy:{
        type:DataTypes.STRING
    },
    updatedBy:{
        type:DataTypes.STRING
    },
    active:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    timestamps:true,
    sequelize:sequelizeconnection,
    tableName:"app_labels"
});


