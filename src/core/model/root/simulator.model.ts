import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import CompanyDepartment from "./company_department.model";
import Trainee from "./trainee.model";
import Trainer from "./trainer.model";
import Users from "./users.model";



export default class Simulator extends Model {
  id!: number;
  company_id!: number;
  name!: number;
  description!: number;
  trainer_id!: number;
  created_by!: number;
  updated_by!: number;
  deleted_by!: string;
  deletedAt!: string;
  createdAt!: string;
  updatedAt!: string;
  IsBlock!:number
  IsDeleted!: number;
}

Simulator.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "companies",
        key: "id",
      },
    },
    trainer_id: {
        type: DataTypes.INTEGER,
        references:{
            model:Trainer,
            key:"id"
        }
    },
    name: {
      type: DataTypes.STRING,
      //unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
    deleted_by: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: "TIMESTAMP",
    },
    updatedAt: {
      type: "TIMESTAMP",
    },
    deletedAt: {
      type: "TIMESTAMP",
    },
    IsBlock: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    IsDeleted: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelizeconnection,
    tableName: "simulator",
  }
);

Simulator.belongsTo(Trainer,{
    foreignKey:'trainer_id'
})

Trainer.hasMany(Simulator,{
    foreignKey:"trainer_id"
});
