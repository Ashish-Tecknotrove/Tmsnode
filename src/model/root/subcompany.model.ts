import {DataTypes, Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import CompanyDepartment from "./company_department.model";
import Trainee from "./trainee.model";
import Trainer from "./trainer.model";
import Users from "./users.model";

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
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "companies",
                key: "id",
            },
        },
        login_table_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        email:{
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        username:{
            type: DataTypes.STRING,
        },
        designation: {
            type: DataTypes.STRING,
        },
        contact_no: {
            type: DataTypes.STRING,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updated_by: {
            type: DataTypes.INTEGER,
        },
        deleted_by: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: "TIMESTAMP",
        },
        updatedAt: {
            type: "TIMESTAMP",
        },
        deletedAt: {
            type: "TIMESTAMP",
        },
        IsBlock: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        IsDeleted: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
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




