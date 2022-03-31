import { DataType } from 'sequelize-typescript';
import { Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Trainer from "./trainer.model";
import Users from "./users.model";
import Company from './company.model';

interface SubcompanyAttribute {
}

export default class SubCompany extends Model {
    id!: number;
    company_id!: number;
    name!: number;
    description!: number;
    email!:string;
    username!: string;
    contact_no!: number;
    created_by!: number;
    updated_by!: number;
    deleted_by!: string;
    deletedAt!: string;
    createdAt!: string;
    updatedAt!: string;
    IsDeleted!: number;
    IsBlock!:number;
}

SubCompany.init(
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
        login_table_id: {
            type: DataType.INTEGER,
            references: {
                model: Users,
                key: "id",
            },
        },
        name: {
            type: DataType.STRING,
            unique: true,
        },
        email:{
            type: DataType.STRING,
        },
        description: {
            type: DataType.STRING,
        },
        username:{
            type: DataType.STRING,
        },
        designation: {
            type: DataType.STRING,
        },
        contact_no: {
            type: DataType.STRING,
        },
        created_by: {
            type: DataType.INTEGER,
            allowNull: true
        },
        updated_by: {
            type: DataType.INTEGER,
            allowNull: false
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
        IsBlock: {
            type: DataType.TINYINT,
            defaultValue: 0,
        }
    },
    {
        sequelize: sequelizeconnection,
        tableName: "sub_company",
    }
);

SubCompany.belongsTo(Users, {
    foreignKey: "login_table_id",
});


SubCompany.hasMany(Trainer, {
    foreignKey: "sub_company_id",
})

Trainer.belongsTo(SubCompany, {
    foreignKey: "sub_company_id",
})




