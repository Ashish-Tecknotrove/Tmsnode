import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Trainee from "./trainee.model";


export default class ElearningTraineeScromData extends Model
{
    id!:number;
    test_id!:number;
    trainee_id!:number;
    attempt_no!:number;
    question!:string;
    answer!:string;
    status!:string;
    mark!:number;
    created_by!:number;
    updated_by!:number;
    createdAt!:string;
    updatedAt!:string;
    IsDeleted!:number;
}


ElearningTraineeScromData.init(
{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    test_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    trainee_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Trainee,
            key:'id'
        }
    },
    attempt_no:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    question:{
        type:DataTypes.STRING,
        allowNull:false
    },
    answer:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mark:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    created_by:{
        type:DataTypes.INTEGER,
    },
    updated_by:{
        type:DataTypes.INTEGER,
    },
    createdAt:{
        type:"TIMESTAMP",
    },
    updatedAt:{
        type:"TIMESTAMP",
    },
    IsDeleted:{
        type:DataTypes.TINYINT,
        defaultValue:"0"
    }
},{
    sequelize:sequelizeconnection,
    tableName:"elearning_trainee_scrom_data"
})