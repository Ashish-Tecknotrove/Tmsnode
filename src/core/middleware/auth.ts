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
            if (!error.isEmpty()) 
            {
                const errorTxt=error.array()[0];
                return res.status(ResponseCodes.BAD_REQUEST).json({response_code:0,message:errorTxt['param']+" "+errorTxt['msg']});
            }
            next();
    }

    async generateAuth(payload:any,userType:any)
    {
       if(userType == 1)
       {
           return sign(payload,process.env.jwt_superadminsecreate as string,{expiresIn:43200});
       }
       else if(userType == 2)
       {
           return sign(payload,process.env.jwt_companyadminsecreate as string,{expiresIn:43200});
       }
       else if(userType == 3)
       {
           return sign(payload,process.env.jwt_trainersecreate as string,{expiresIn:43200});
       }
       else if(userType == 4)
       {
           return sign(payload,process.env.jwt_traineesecreate as string,{expiresIn:43200});
       }
       else if(userType == 5)
       {
        return sign(payload,process.env.jwt_branch_secreate as string,{expiresIn:43200});
       }
       else if(userType == 6)
       {
        return sign(payload,process.env.jwt_department_secreate as string,{expiresIn:43200});
       }
            
    }

    async verify_superAdmin_AuthenticateToken(req:Request , res:Response,next:NextFunction)
    {
        try
        {
            const authheader = req.header('authorization');
            const token = authheader && authheader.split(" ")[1];

            if(token == null) return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:"Oops! we cannot process the request without authentication token"});

            await verify(token,process.env.jwt_superadminsecreate as string, (err , user)=>{
                
                if (err)
                {
                    return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:err.message});
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

    async verify_companyAdmin_AuthenticateToken(req:Request , res:Response,next:NextFunction)
    {
        try
        {
            const authheader = req.header('authorization');
            const token = authheader && authheader.split(" ")[1];

            if(token == null) return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:"Oops! we cannot process the request without authentication token"});

            await verify(token,process.env.jwt_companyadminsecreate as string, (err , user)=>{
                
                if (err)
                {
                    return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:err.message});
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

    async verify_trainerAdmin_AuthenticateToken(req:Request , res:Response,next:NextFunction)
    {
        try
        {
            const authheader = req.header('authorization');
            const token = authheader && authheader.split(" ")[1];

            if(token == null) return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:"Oops! we cannot process the request without authentication token"});

            await verify(token,process.env.jwt_trainersecreate as string, (err , user)=>{
                
                if (err)
                {
                    return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:err.message});
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

    async verify_traineeAdmin_AuthenticateToken(req:Request , res:Response,next:NextFunction)
    {
        try
        {
            const authheader = req.header('authorization');
            const token = authheader && authheader.split(" ")[1];

            if(token == null) return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:"Oops! we cannot process the request without authentication token"});

            await verify(token,process.env.jwt_traineesecreate as string, (err , user)=>{
                
                if (err)
                {
                    return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:err.message});
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

    async verify_branchAdmin_AuthenticateToken(req:Request , res:Response,next:NextFunction)
    {
        try
        {
            const authheader = req.header('authorization');
            const token = authheader && authheader.split(" ")[1];

            if(token == null) return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:"Oops! we cannot process the request without authentication token"});

            await verify(token,process.env.jwt_branch_secreate as string, (err , user)=>{
                
                if (err)
                {
                    return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:err.message});
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

    async verify_departmentAdmin_AuthenticateToken(req:Request , res:Response,next:NextFunction)
    {
        try
        {
            const authheader = req.header('authorization');
            const token = authheader && authheader.split(" ")[1];

            if(token == null) return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:"Oops! we cannot process the request without authentication token"});

            await verify(token,process.env.jwt_department_secreate as string, (err , user)=>{
                
                if (err)
                {
                    return res.status(ResponseCodes.UNAUTHORIZED).json({response_code:0,message:err.message});
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