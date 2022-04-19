import { DataType } from 'sequelize-typescript';

import {  Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import CompanyDepartment from "./company_department.model";
import SubCompany from "./subcompany.model";
import Trainee from "./trainee.model";
import Users from "./users.model";


interface TrainerAttributes{
    id:number;
    company_id:number;
    sub_company_id: number;
    department_id: number;
    name:string;
    email:string;
    password:string;
    trainer_expertise:string;
    simulator:string;
    login_table_id:number;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number,
    IsBlock:number,

}


export default class Trainer extends Model{
    id!: number;
    company_id!: number;
    sub_company_id!: number;
    department_id!: number;
    name!: string;
    email!: string;
    password!: string;
    trainer_expertise!: string;
    simulator!: string;
    login_table_id!: number;
	created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number
    IsBlock!:number
}



Trainer.init({
    id:{
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    company_id:{
        type:DataType.INTEGER,
        allowNull:false,
        references:{
            model:Company,
            key:'id'
        }
    },
    sub_company_id: {
        type:DataType.INTEGER,
        references:{
            model:SubCompany,
            key:'id'
        }
    },
    department_id:{
        type:DataType.INTEGER,
        references:{
            model:CompanyDepartment,
            key:'id'
        }
    },
    name:{
        type:DataType.STRING(100),
        allowNull:true
    },
    email:{
        type:DataType.STRING(200),
        allowNull:true
    },
    password:{
        type:DataType.STRING(100),
        allowNull:true
    },
    trainer_expertise:{
        type:DataType.STRING(100),
        allowNull:true
    },
    simulator:{
        type:DataType.STRING(100),
        allowNull:true
    },
    login_table_id:{
        type:DataType.INTEGER,
        allowNull:true,
        references:{
            model:Users,
            key:'id'
        }
    },
    created_by: {
        type: DataType.INTEGER
    },
    updated_by: {
        type: DataType.INTEGER
    },
    deleted_by:{
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
    IsDeleted :{
        type: DataType.TINYINT,
        defaultValue:0
    },
    IsBlock:{
        type:DataType.TINYINT,
        defaultValue:0
    }
},{
    timestamps:false,
    sequelize:sequelizeconnection,
    tableName:'trainers'
})


Trainer.belongsTo(Users,{
    foreignKey:'login_table_id'
});

Trainer.belongsTo(Company,{
    foreignKey:'company_id'
})