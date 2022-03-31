
import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";


interface MasterDepartmentAttributes{
    id:number;
    company_id:number;
    descripition:string;
    name:string;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number

}


export default class MasterDepartment extends Model{
    id!: number;
    company_id!:number;
    descripition!:string;
    name!: string;
	created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number
}



MasterDepartment.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    company_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Company,
            key:'id'
        }
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    descripition:{
        type:DataTypes.STRING(200)
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
    },
    deleted_by: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: "TIMESTAMP",
    },
    updatedAt: {
        type: "TIMESTAMP",
    },
    deletedAt: {
        type: "TIMESTAMP"
    },
    IsDeleted:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
},{
    sequelize:sequelizeconnection,
    tableName:'master_department'
})
