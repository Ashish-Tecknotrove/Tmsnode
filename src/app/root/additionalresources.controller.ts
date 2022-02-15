import { Request, Response } from "express";
import sequelizeconnection from "../../database/sequelize";
import sequelize from "sequelize";
import responseCodes from "../../strings/response-codes";


class AdditionalresourcesController {
    async getCountry(req: Request, res: Response) {
        try {
            var country = await sequelizeconnection.query("Select * from countries",
                { type: sequelize.QueryTypes.SELECT });

            res.status(responseCodes.SUCCESS).json({ response_code: 1, data: country });
        }
        catch (err:any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 1, message: err.message });
        }


    }

    async getState(req: Request, res: Response) {
        try {
            var country_id = req.body.country_id
            console.log(country_id);
            var state = await sequelizeconnection.query(`Select * from states where country_id=${country_id}`,
                { type: sequelize.QueryTypes.SELECT });

            res.status(200).json({ response_code: 1, data: state });
        }
        catch (err:any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 1, message: err.message });
        }

    }

    async getCities(req: Request, res: Response) {
        try {
            var stateid = req.body.state_id

            var cities = await sequelizeconnection.query(`Select * from cities where state_id=${stateid}`,
                { type: sequelize.QueryTypes.SELECT });

            res.status(200).json({ response_code: 1, data: cities });
        }
        catch (err:any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 1, message: err.message });
        }

    }

    async getLanguages(req: Request, res: Response) {
        try {
            var languages = await sequelizeconnection.query(`Select * from languages`,
                { type: sequelize.QueryTypes.SELECT });

            res.status(200).json({ response_code: 1, data: languages });
        }
        catch (err:any) {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 1, message: err.message });
        }

    }
}


export default new AdditionalresourcesController()