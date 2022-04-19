import { DataType } from 'sequelize-typescript';
import { Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import TraineeFormMasterModel from "./traineeFormMaster.model";


export default class TraineeCustomizeFormModel extends Model {
    id!: Number;
    company_id!: Number;
    form_master_id!: string;
    isValidate!: Number;
    isUsed!: string;
    created_by!: Number;
    createdAt!: string;
    updated_by!: Number;
    updatedAt!: string;
    deleted_by!: Number;
    deletedAt!: string;
    IsDeleted!: Number;

}

TraineeCustomizeFormModel.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: DataType.INTEGER,
        references: {
            model: Company,
            key: 'id'
        }
    },
    form_master_id: {
        type: DataType.INTEGER,
        references: {
            model: TraineeFormMasterModel,
            key: 'id'
        }
    },
    isValidate: {
        type: DataType.ENUM,
        values: ['0', '1'],
        defaultValue: 0
    },
    isUsed:{
        type: DataType.ENUM,
        values: ['0', '1'],
        defaultValue: '1'
    },
    created_by: {
        type: DataType.INTEGER
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
    }
}, {
    timestamps:false,
    sequelize: sequelizeconnection,
    tableName: 'trainee_custom_form'
});

TraineeCustomizeFormModel.belongsTo(TraineeFormMasterModel, {
    foreignKey: 'form_master_id'
})
