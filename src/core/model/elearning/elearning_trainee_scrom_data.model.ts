import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import sequelizeconnection from "../../database/sequelize";
import Trainee from "../root/trainee.model";


export default class ElearningTraineeScromData extends Model
{
    id!:number;
    session_id!:string;
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
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    session_id:{
        type:DataType.STRING,
        allowNull:false
    },
    test_id:{
        type:DataType.INTEGER,
        allowNull:false
    },
    trainee_id:{
        type:DataType.INTEGER,
        allowNull:false,
        references:{
            model:Trainee,
            key:'id'
        }
    },
    attempt_no:{
        type:DataType.INTEGER,
        allowNull:false
    },
    question:{
        type:DataType.STRING,
        allowNull:false
    },
    answer:{
        type:DataType.STRING,
        allowNull:false
    },
    status:{
        type:DataType.STRING,
        allowNull:false
    },
    mark:{
        type:DataType.INTEGER,
        allowNull:false
    },
    created_by:{
        type:DataType.INTEGER,
    },
    updated_by:{
        type:DataType.INTEGER,
    },
    createdAt:{
        type:DataType.STRING(50),
    },
    updatedAt:{
        type:DataType.STRING(50),
    },
    IsDeleted:{
        type:DataType.TINYINT,
        defaultValue:"0"
    }
},{
    timestamps:false,
    sequelize:sequelizeconnection,
    tableName:"elearning_trainee_scrom_data"
})