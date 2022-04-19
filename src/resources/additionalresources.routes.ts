import  * as express  from "express";
import additionalresourcesController from "./additionalresources.controller";


const resources = express.Router();


// For Accepting Form Data
var multer = require('multer');
var formData = multer();

resources.get('/getCountries',
additionalresourcesController.getCountry
)

resources.post('/getStates',
    formData.none(),
    additionalresourcesController.getState
)

resources.post('/getCities',
    formData.none(),
    additionalresourcesController.getCities
)

resources.get('/getLanguages',
    formData.none(),
    additionalresourcesController.getLanguages
)


resources.get('/technology',
additionalresourcesController.getTechnology
)



export default resources;

