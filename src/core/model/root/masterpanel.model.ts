import { DataTypes, Model } from "sequelize";
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
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    panel: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IsDeleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    sequelize: sequelizeconnection,
    tableName: 'master_panel'
});

MasterPanel.hasMany(Mastermenu,{
    foreignKey:'panel_id'
});