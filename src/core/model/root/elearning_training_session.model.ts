import { DataTypes, Model } from "sequelize";
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
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      session_id:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true
      },
      trainee_id:{
        type: DataTypes.INTEGER,
        references: {
          model: 'trainees',
          key: 'id'
        }
      },
      status:{
        type:DataTypes.ENUM('0', '1'),
        defaultValue: "0",
      },
      createdAt: {
        type: DataTypes.DATE
      }

},{
    sequelize:sequelizeconnection,
    tableName:"elearning_training_session"
});
