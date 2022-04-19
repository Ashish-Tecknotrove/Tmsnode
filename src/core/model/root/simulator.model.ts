import { DataType } from 'sequelize-typescript';
import { Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Trainer from "./trainer.model";
import Company from './company.model';



export default class Simulator extends Model {
  id!: number;
  company_id!: number;
  trainer_id!: number;
  name!: number;
  description!: number;
  created_by!: number;
  updated_by!: number;
  deleted_by!: string;
  deletedAt!: string;
  createdAt!: string;
  updatedAt!: string;
  IsDeleted!: number;
  IsBlock!: number
}

Simulator.init(
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    company_id: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: "id",
      },
    },
    trainer_id: {
      type: DataType.INTEGER,
      references: {
        model: Trainer,
        key: "id"
      }
    },
    name: {
      type: DataType.STRING,
      //unique: true,
    },
    description: {
      type: DataType.STRING,
    },
    created_by: {
      type: DataType.INTEGER,
      allowNull: true
    },
    updated_by: {
      type: DataType.INTEGER
    },
    deleted_by: {
      type: DataType.INTEGER
    },
    createdAt: {
      type: DataType.STRING(100)
    },
    updatedAt: {
      type: DataType.STRING(100)
    },
    deletedAt: {
      type: DataType.STRING(100)
    },
    IsDeleted: {
      type: DataType.TINYINT,
      defaultValue: 0
    },
    IsBlock: {
      type: DataType.TINYINT,
      defaultValue: 0,
    }
  },
  {
    timestamps:false,
    sequelize: sequelizeconnection,
    tableName: "simulator",
  }
);

Simulator.belongsTo(Trainer, {
  foreignKey: 'trainer_id'
})

Trainer.hasMany(Simulator, {
  foreignKey: "trainer_id"
});
