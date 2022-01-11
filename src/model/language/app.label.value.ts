import { Model ,DataTypes} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import sequelizeConnection from '../../database/sequelize';
import Languages from "./language.model";


interface AppLabelValueAttributes{
    id:Number,
    f_languageid:Number,
    f_labelid:Number,
    name:String,
    description:String,
    createdBy:String,
    updatedBy:String,
    active:Number,
}



export default class ApplabelValue extends Model<AppLabelValueAttributes>{}


ApplabelValue.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    f_languageid:{
        type:DataTypes.INTEGER
    },
    f_labelid:{
        type:DataTypes.INTEGER
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
    tableName:"app_label_value"
});




