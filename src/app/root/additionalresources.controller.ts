import { Request, Response } from "express";
import sequelizeconnection from "../../database/sequelize";
import sequelize from "sequelize";


class AdditionalresourcesController
{
    async getCountry(req:Request,res:Response)
    {
        var country = await sequelizeconnection.query("Select * from countries",
            {type: sequelize.QueryTypes.SELECT});

        res.status(200).json({response_code:1,data:country});

    }

    async getState(req:Request,res:Response)
    {
        var country_id=req.body.country_id

        var state = await sequelizeconnection.query(`Select * from states where country_id=${country_id}`,
            {type: sequelize.QueryTypes.SELECT});

        res.status(200).json({response_code:1,data:state});
    }

    async getCities(req:Request,res:Response)
    {
        var stateid=req.body.state_id

        var cities = await sequelizeconnection.query(`Select * from cities where state_id=${stateid}`,
            {type: sequelize.QueryTypes.SELECT});

        res.status(200).json({response_code:1,data:cities});
    }

    async getLanguages(req:Request,res:Response){
        var languages = await sequelizeconnection.query(`Select * from languages`,
            {type: sequelize.QueryTypes.SELECT});

        res.status(200).json({response_code:1,data:languages});
    }
}


export default new AdditionalresourcesController()