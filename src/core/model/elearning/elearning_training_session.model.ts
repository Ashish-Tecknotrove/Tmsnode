import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import sequelizeconnection from "../../database/sequelize";

interface TrainingAttributes
{
    id:number;
    user_id:number;
    message:string;
    createdAt:string;
}

export default class ElearningTrainingSession extends Model
{
    declare id:number;
    user_id!:number;
    message!:string;
    createdAt!:string;
}

ElearningTrainingSession.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      session_id:{
        type:DataType.STRING(255),
        allowNull:false,
        unique:true
      },
      trainee_id:{
        type: DataType.INTEGER,
        references: {
          model: 'trainees',
          key: 'id'
        }
      },
      status:{
        type:DataType.ENUM('0', '1'),
        defaultValue: "0",
      },
      createdAt: {
        type: DataType.DATE
      }

},{
  timestamps:false,
    sequelize:sequelizeconnection,
    tableName:"elearning_training_session"
});
