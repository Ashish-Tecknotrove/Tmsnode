import * as Sequelize from "sequelize";
import { Dialect } from "sequelize";

const config=require("../../config/config.json");


console.log(config.test)

let dbName="" , dbUser="" , dbHost="" ,dbPassword="";

if(process.env.NODE_ENV === 'production')
{
    dbName = config.production.database
    dbUser = config.production.user
    dbHost = config.production.host
    dbPassword = config.production.password
}

if(process.env.NODE_ENV === 'development')
{
    dbName = config.development.database
    dbUser = config.development.user
    dbHost = config.development.host
    dbPassword = config.development.password
}

if(process.env.NODE_ENV === 'test')
{
    dbName = config.test.database
    dbUser = config.test.user
    dbHost = config.test.host
}

const sequelizeconnection = new Sequelize.Sequelize(dbName,dbUser,dbPassword,{
    host:dbHost,
    dialect:'mysql',
    // logging:true
    logging:false
});

sequelizeconnection.sync({force:false});    

export default sequelizeconnection;

