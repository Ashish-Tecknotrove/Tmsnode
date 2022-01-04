import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Users from "./users.model";


interface CompanyAttributes{
    id:number
    company_name:string
    company_type:string
    gst:string
    picture:string
    simulator_count:number
    address:string
    pincode:string
    city_id:number
    state_id:number
    country_id:number
    contact_person_count:string
    trainee_unique_login:string
    adp_decider:string
    api_decider:string
    registration_type:string
    day_no:number;
    calender_type:string
    created_by:number
    updated_by:number
    active:number
}


export default class Company extends Model<CompanyAttributes> implements CompanyAttributes{
   
    id!:number
    company_name!:string
    company_type!:string
    gst!:string
    picture!:string
    simulator_count!:number
    address!:string
    pincode!:string
    city_id!:number
    state_id!:number
    country_id!:number
    contact_person_count!:string
    trainee_unique_login!:string
    adp_decider!:string
    api_decider!:string
    registration_type!:string
    day_no!:number;
    calender_type!:string
    created_by!:number
    updated_by!:number
    active!:number
}

Company.init({
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false
      },
      company_name:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true
      },
      company_type:{
        type:DataTypes.STRING(20),
        allowNull:true 
      },
      gst: {
        type:DataTypes.STRING(200),
        allowNull: true
      },
      picture:{
        type:DataTypes.STRING(255),
        allowNull:true 
      },
      simulator_count:{
        type:DataTypes.STRING,
      },
      address: {
        type:DataTypes.STRING,
      },
      pincode:{
        type:DataTypes.INTEGER,
      },
      city_id:{
        type:DataTypes.INTEGER,
        allowNull:false 
      },
      state_id: {
        type:DataTypes.INTEGER,
        allowNull: false
      },
      country_id:{
        type:DataTypes.INTEGER,
        allowNull:false 
      },
      contact_person_count:{
        type:DataTypes.STRING,
        allowNull:false 
      },
      trainee_unique_login: {
        type:DataTypes.ENUM('email','mobile','aadhar'),
        defaultValue:'email',
        allowNull: false,

      },
      adp_decider:{
        type:DataTypes.INTEGER,
      },
      api_decider:{
        type:DataTypes.STRING,
      },
      registration_type: {
        type:DataTypes.STRING,
      },
      day_no:{
        type:DataTypes.INTEGER,
      },
      calender_type:{
        type:DataTypes.STRING,
      },
      created_by: {
        type:DataTypes.INTEGER,
        allowNull: false
      },
      updated_by:{
        type:DataTypes.INTEGER,
        allowNull:false 
      },
      active:{
        type:DataTypes.TINYINT,
        defaultValue:1,
        allowNull:false 
      },
},{
    
    timestamps:true,
    sequelize:sequelizeconnection,
    tableName:'companies'
});


// Company.hasMany(Users,{
//     sourceKey:"id",
//     foreignKey:"company_id",
//     as:'companies'
// })