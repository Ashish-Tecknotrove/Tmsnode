import { DataType } from 'sequelize-typescript';
import { Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Mastermenu from "./mastermenu.model";

interface MasterPanelAttributes {
    id: number;
    panel: string;
    created_by: number;
    updated_by: number;
    IsDeleted: number;
}



export default class MasterPanel extends Model {
    id!: number;
    panel!: string;
    created_by!: number;
    updated_by!: number;
    IsDeleted!: number;
}


MasterPanel.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    panel: {
        type: DataType.STRING(100),
        allowNull: false
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataType.INTEGER
    },
    IsDeleted: {
        type: DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps:false,
    sequelize: sequelizeconnection,
    tableName: 'master_panel'
});

MasterPanel.hasMany(Mastermenu,{
    foreignKey:'panel_id'
});