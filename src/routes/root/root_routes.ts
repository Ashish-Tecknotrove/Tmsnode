import  * as express  from "express";
import loginController from "../../app/root/login.controller";
import additionalResourcesController from "../../app/root/additionalresources.controller";
import auth from "../../middleware/auth";
import loginValidator from "../../validator/root/login.validator";




const Router = express.Router();

// For Accepting Form Data
var multer = require('multer');
var formData = multer();

//TODO LOGIN ROUTES
Router.post('/authentication',
    formData.none(),//Accept Form Data
    loginValidator.checkLoginParameters(),
    auth.handleValidatorError,
    loginController.login
)

Router.post('/authenticate_token',
    formData.none(),//Accept Form Data
    loginValidator.verifytokenParameters(),
    auth.handleValidatorError,
    loginController.verify_token
)

//Additional Resources
Router.get('/getCountries',
additionalResourcesController.getCountry
)

Router.post('/getStates',
    formData.none(),
    additionalResourcesController.getState
)

Router.post('/getCities',
    formData.none(),
    additionalResourcesController.getCities
)
export default Router;

