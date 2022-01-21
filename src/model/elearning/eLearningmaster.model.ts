import { TINYINT } from "sequelize";
import { DataTypes,Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";


interface ElearningMasterAttribute{
    id:number;
    test_id:number;
    zipname:string;
    link:string;
    created_by:string;
    updated_by:string;
    delete_by:string;
    IsDeleted:number
}

export default class ElearningMaster extends Model
{
    declare id: number;
    test_id!: number;
    zipname!: string;
    link!: string;
    created_by!: string;
    updated_by!: string;
    delete_by!: string;
    IsDeleted!:number;

}


ElearningMaster.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      test_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "curriculum_parent_category_test",
          key: "id"
        }
      },
      zipname: {
        type: DataTypes.STRING
      },
      link: {
        type: DataTypes.STRING,
      },
      created_by: {
        type: DataTypes.INTEGER
      },
      updated_by: {
        type: DataTypes.INTEGER
      },
      delete_by:{
        type: DataTypes.INTEGER
      },
      IsDeleted:{
        type:TINYINT,
        defaultValue:"0"
      }

},{
    tableName:'elearning_master',
    sequelize:sequelizeconnection
});