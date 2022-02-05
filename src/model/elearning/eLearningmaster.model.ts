import { TINYINT } from "sequelize";
import { DataTypes,Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import CurriculumParentCategoryTest from "../root/curriculum_parent_category_test.model";


interface ElearningMasterAttribute{
    id:number;
    test_id:number;
    zipname:string;
    link:string;
    created_by:string;
    updated_by:string;
    delete_by:string;
    deleteAt:string;
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
    deleteAt!: string;
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
        references: {
          model: CurriculumParentCategoryTest,
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
      deleteAt:{
        type: DataTypes.STRING
      },
      IsDeleted:{
        type:TINYINT,
        defaultValue:"0"
      }

},{
    tableName:'elearning_master',
    sequelize:sequelizeconnection
});


// ElearningMaster.belongsTo(CurriculumParentCategoryTest, {
//   foreignKey: "test_id",
//   as:""
// });