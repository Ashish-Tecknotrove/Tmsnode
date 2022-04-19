import * as Sequelize from "sequelize";
import { Dialect } from "sequelize";

const config=require("../../../config/config.json");


let dbName="" , dbusername="" , dbHost="" ,dbPassword="";

if(process.env.NODE_ENV === 'production')
{
    dbName = config.production.database
    dbusername = config.production.username
    dbHost = config.production.host
    dbPassword = config.production.password
}

if(process.env.NODE_ENV === 'development')
{
    dbName = config.development.database
    dbusername = config.development.username
    dbHost = config.development.host
    dbPassword = config.development.password
}

if(process.env.NODE_ENV === 'test')
{
    dbName = config.test.database
    dbusername = config.test.username
    dbHost = config.test.host
    dbPassword = config.test.password
}

// console.log(dbName);
// console.log(dbusername);
// console.log(dbHost);
// console.log(dbPassword);

const sequelizeconnection = new Sequelize.Sequelize(dbName,dbusername,dbPassword,{
    host:dbHost,
    dialect:'mysql',
    logging:false
});

sequelizeconnection.sync({force:false});    

export default sequelizeconnection;

