import { NextFunction } from "express";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sign,verify } from "jsonwebtoken";
import ResponseStrings from "../strings/response-strings";
import ResponseCodes from "../strings/response-codes";

import dotenv from 'dotenv';

dotenv.config();

class Middleware{
    

    handleValidatorError(req:Request , res:Response,next:NextFunction)
    {
        const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(ResponseCodes.BAD_REQUEST).json(error.array()[0]);
		}
		next();
    }


    async generateAuth(payload:any)
    {
       
        return sign(payload,process.env.jwt_secreate as string,{expiresIn:172800});
        // return sign(payload,process.env.jwt_secreate as string,{expiresIn:160*160});
    
        
    }

    async verifyAuthenticateToken(req:Request , res:Response,next:NextFunction)
    {
        try
        {
            const authheader = req.header('authorization');
            const token = authheader && authheader.split(" ")[1];

            if(token == null) return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:ResponseStrings.tokenExpired});

            await verify(token,process.env.jwt_secreate as string, (err , user)=>{
                
                if (err)
                {
                    return res.status(ResponseCodes.UNAUTHORIZED).json({error:ResponseStrings.tokenExpired});
                }
                else{
                    next();
                }  
            });
            
            
        }
        catch(error)
        {
            res.status(ResponseCodes.UNAUTHORIZED).send(ResponseStrings.tokenExpired);
        }
    }



    

    
}

export default new Middleware();