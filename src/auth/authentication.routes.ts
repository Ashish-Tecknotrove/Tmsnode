import  * as express  from "express";

import authValidator from "./auth.validator"
import auth from "../core/middleware/auth"
import authController from "./authentication.controller"
const authRoutes = express.Router();

// For Accepting Form Data
var multer = require('multer');
var formData = multer();

//TODO LOGIN ROUTES
authRoutes.post('/authentication',
    formData.none(),//Accept Form Data
    authValidator.checkLoginParameters(),
    auth.handleValidatorError,
    authController.login
)

authRoutes.post('/authenticate_token',
formData.any(),
authValidator.verifytokenParameters(),
auth.handleValidatorError,
authController.verify_token
)


export default authRoutes;

