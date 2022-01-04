import { NextFunction } from "express";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sign,verify } from "jsonwebtoken";

import dotenv from 'dotenv';

dotenv.config();

class Middleware{
    

    handleValidatorError(req:Request , res:Response,next:NextFunction)
    {
        const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.json(error.array()[0]);
		}
		next();
    }


    async generateAuth(payload:any)
    {
       
        return sign(payload,process.env.jwt_secreate as string,{expiresIn:60*60});
    
        
    }

    async verifyAuthenticateToken(req:Request , res:Response,next:NextFunction)
    {
        try
        {
            const authheader = req.header('authorization');
            const token = authheader && authheader.split(" ")[1];

            if(token == null) return res.status(401).json({response_code:0,message:"Invalid Token"});

            await verify(token,process.env.jwt_secreate as string, (err , user)=>{
                
                if (err)
                {
                    return res.status(401).json({error:err});
                }
                else{
                    next();
                }  
            
            });
            
            
        }
        catch(error)
        {
            res.status(401).send("Invalid token");
        }
    }



    

    
}

export default new Middleware();