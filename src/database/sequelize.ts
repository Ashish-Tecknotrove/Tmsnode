import * as Sequelize from "sequelize";
import { Dialect } from "sequelize";


const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD


const sequelizeconnection = new Sequelize.Sequelize("tms_node","root","Tecknotrove@2021",{
    host:"localhost",
    dialect:'mysql'
});

sequelizeconnection.sync({force:false});

export default sequelizeconnection;

