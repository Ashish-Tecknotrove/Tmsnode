import {Model} from "sequelize";
import {AllowNull, DataType} from "sequelize-typescript";
import sequelizeconnection from "../../database/sequelize";
import Cities from "../resources/cities.model";
import Countries from "../resources/countries.model";
import States from "../resources/states.model";
import CompanyUser from "./compayuser.model";
import Curriculum from "./curriculum.model";
import MasterPanel from "./masterpanel.model";
import Subscription from "./subscription.model";


interface CompanyAttributes {
    id: number
    company_name: string
    company_type: number
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
    company_unique_id: string
    api_decider: string
    registration_type: string
    day_no: number;
    calender_type: string
    created_by: number
    updated_by: number
    deleted_by: number
    deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number
}

export default class Company extends Model {

    declare id: number
    company_name!: string
    enrollment_id!:string
    panel_id!:number;
    company_type!: number
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
    company_unique_id!: string
    api_decider!: string
    registration_type!: string
    day_no!: number;
    calender_type!: string
    created_by!: number
    updated_by!: number
    deleted_by!: number
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number
}

Company.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_name: {
        type: DataType.STRING(100),
        allowNull: false,
        unique: true
    },
    enrollment_id:{
        type:DataType.STRING(100),
        allowNull: false,
    },
    panel_id: {
        type: DataType.INTEGER,
        references:{
            model:MasterPanel,
            key:'id'
        },
        allowNull:false
    },
    company_type: {
        type: DataType.TINYINT,
        defaultValue:0,
        allowNull: true
    },
    gst: {
        type: DataType.STRING(200),
        allowNull: true
    },
    picture: {
        type: DataType.STRING(255),
        allowNull: true
    },
    simulator_count: {
        type: DataType.STRING,
    },
    address: {
        type: DataType.STRING,
    },
    pincode: {
        type: DataType.INTEGER,
    },
    city_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references:{
            model:"cities",
            key:"id"
        }
    },
    state_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
    country_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
    contact_person_count: {
        type: DataType.STRING,
    },
    trainee_unique_login: {
        type: DataType.ENUM('email', 'mobile', 'aadhar'),
        defaultValue: 'email',
        allowNull: false,

    },
    company_unique_id: {
        type: DataType.STRING,
    },
    api_decider: {
        type: DataType.STRING,
    },
    registration_type: {
        type: DataType.STRING,
    },
    day_no: {
        type: DataType.INTEGER,
    },
    calender_type: {
        type: DataType.STRING,
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataType.INTEGER,
        allowNull: false
    },
    deleted_by: {
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
    IsDeleted:{
        type:DataType.TINYINT,
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

CompanyUser.belongsTo(Company,{
  foreignKey:"company_id",
  targetKey:"id"
});

Company.hasMany(Subscription,{
    // as:"subscriptions",
    foreignKey:'company_id'
}); 

Subscription.belongsTo(Company, {
    foreignKey: 'company_id',
    targetKey:"id"
});

Company.hasMany(Curriculum,{
    foreignKey:'company_id',
});

Company.belongsTo(Countries,{
    foreignKey:'country_id'
});

Company.belongsTo(States,{
    foreignKey:'state_id'
});

Company.belongsTo(Cities,{
    foreignKey:'city_id'
});

Company.belongsTo(MasterPanel,{
    foreignKey:'panel_id'
})
// Company.belongsTo("cities",{

// });
