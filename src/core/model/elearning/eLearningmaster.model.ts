import {TINYINT} from "sequelize";
import { Model} from "sequelize";
import { DataType } from "sequelize-typescript";
import sequelizeconnection from "../../database/sequelize";
import CurriculumParentCategoryTest from "../root/curriculum_parent_category_test.model";


interface ElearningMasterAttribute {
    id: number;
    test_id: number;
    zipname: string;
    link: string;
    thumbImg: string;
    created_by: string;
    updated_by: string;
    delete_by: string;
    deleteAt: string;
    IsDeleted: number
}

export default class ElearningMaster extends Model {
    declare id: number;
    test_id!: number;
    zipname!: string;
    folderName!: number;
    link!: string;
    thumbImg!: string;
    created_by!: string;
    updated_by!: string;
    delete_by!: string;
    deleteAt!: string;
    IsDeleted!: number;

}


ElearningMaster.init({
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    test_id: {
        type: DataType.INTEGER,
        references: {
            model: CurriculumParentCategoryTest,
            key: "id"
        }
    },
    zipname: {
        type: DataType.STRING
    },
    folderName: {
        type: DataType.STRING
    },
    link: {
        type: DataType.STRING,
    },
    thumbImg: {
        type: DataType.STRING,
    },
    created_by: {
        type: DataType.INTEGER
    },
    updated_by: {
        type: DataType.INTEGER
    },
    delete_by: {
        type: DataType.INTEGER
    },
    createdAt: {
        type: DataType.STRING(50),
    },
    updatedAt: {
        type: DataType.STRING(50),
    },
    deletedAt: {
        type: DataType.STRING(50)
    },
    IsDeleted: {
        type: DataType.TINYINT,
        defaultValue: "0"
    }

}, {
    tableName: 'elearning_master',
    sequelize: sequelizeconnection
});


// ElearningMaster.belongsTo(CurriculumParentCategoryTest, {
//   foreignKey: "test_id",
//   as:""
// });