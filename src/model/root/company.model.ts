import {DataTypes, Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import CompanyUser from "./compayuser.model";
import Curriculum from "./curriculum.model";
import Subscription from "./subscription.model";


interface CompanyAttributes {
    id: number
    company_name: string
    company_type: string
    gst: string
    picture: string
    simulator_count: number
    address: string
    pincode: string
    city_id: number
    state_id: number
    country_id: number
    contact_person_count: string
    trainee_unique_login: string
    adp_decider: string
    api_decider: string
    registration_type: string
    day_no: number;
    calender_type: string
    created_by: number
    updated_by: number
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number
}

export default class Company extends Model {

    declare id: number
    company_name!: string
    company_type!: string
    gst!: string
    picture!: string
    simulator_count!: number
    address!: string
    pincode!: string
    city_id!: number
    state_id!: number
    country_id!: number
    contact_person_count!: string
    trainee_unique_login!: string
    adp_decider!: string
    api_decider!: string
    registration_type!: string
    day_no!: number;
    calender_type!: string
    created_by!: number
    updated_by!: number
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number
}

Company.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    company_type: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    gst: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    picture: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    simulator_count: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    pincode: {
        type: DataTypes.INTEGER,
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contact_person_count: {
        type: DataTypes.STRING,
    },
    trainee_unique_login: {
        type: DataTypes.ENUM('email', 'mobile', 'aadhar'),
        defaultValue: 'email',
        allowNull: false,

    },
    adp_decider: {
        type: DataTypes.INTEGER,
    },
    api_decider: {
        type: DataTypes.STRING,
    },
    registration_type: {
        type: DataTypes.STRING,
    },
    day_no: {
        type: DataTypes.INTEGER,
    },
    calender_type: {
        type: DataTypes.STRING,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false
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
}, {
    timestamps: true,
    sequelize: sequelizeconnection,
    tableName: 'companies'
});



Company.hasMany(CompanyUser,{
    foreignKey:'company_id'
});

Company.hasMany(Subscription,{
    foreignKey:'company_id'
});

Company.hasMany(Curriculum,{
    foreignKey:'company_id',
});
