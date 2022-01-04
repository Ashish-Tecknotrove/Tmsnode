import { DataTypes,Model,Optional } from "sequelize";
import Class from "../root/Class";

import sequelizeConnection from '../../database/sequelize';
import ApplabelValue from "./app.label.value";

interface LanguagesAttributes{
    id: number;
    name :string;
    description:string;
    created_by:string;
    active:number;
}

export default class Languages extends Model<LanguagesAttributes> implements LanguagesAttributes
{
    id!:number; 
    name! :string;
    description!:string;
    created_by!:string;
    active!:number;
}

Languages.init({
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false 
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:true
    },
    created_by :{
        type: DataTypes.TEXT,
        allowNull:true  
    },
    active :{
        type: DataTypes.TINYINT,
        allowNull:true,
        defaultValue:1
    }
},{
    timestamps:true,
    sequelize:sequelizeConnection,
    tableName:'languages'
});

Languages.hasMany(ApplabelValue,{
    sourceKey:"id",
    foreignKey:'f_languageid',
    as:'app_label_value'
});

ApplabelValue.belongsTo(Languages,{foreignKey:"f_languageid",targetKey:"id"});