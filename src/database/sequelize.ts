import * as Sequelize from "sequelize";
import { Dialect } from "sequelize";


const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD


const sequelizeconnection = new Sequelize.Sequelize("momsi4dx_tmsnode","momsi4dx_tmsnode","tmsnode@2021",{
    host:"162.241.123.34",
    dialect:'mysql'
});

sequelizeconnection.sync({force:false});

export default sequelizeconnection;

