
import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import Trainee from "./trainee.model";
import Users from "./users.model";


interface TrainerAttributes{
    id:number;
    company_id:number;
    name:string;
    email:string;
    email_verified_at:string;
    password:string;
    trainer_expertise:string;
    user_type:string;
    simulator:string;
    login_table_id:number;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number

}


export default class Trainer extends Model{
    id!: number;
    company_id!: number;
    name!: string;
    email!: string;
    email_verified_at!: string;
    password!: string;
    trainer_expertise!: string;
    user_type!: string;
    simulator!: string;
    login_table_id!: number;
	created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number
}



Trainer.init({
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
    email:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    email_verified_at:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    trainer_expertise:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    user_type:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    simulator:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    login_table_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
            model:Users,
            key:'id'
        }
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    timestamps:true,
    sequelize:sequelizeconnection,
    tableName:'trainers'
})


Trainer.belongsTo(Users,{
    foreignKey:'login_table_id'
});

Trainer.belongsTo(Company,{
    foreignKey:'company_id'
})