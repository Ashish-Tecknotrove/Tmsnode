import { any } from 'bluebird';
import express, { Router } from "express";
import appLabelValueController from "../../app/languages/app.label.value.controller";
import languagesController from "../../app/languages/languages.controller";
import auth from "../../middleware/auth";
import languagevalidator from "../../validator/languages/languagevalidator";


const LanguageRoutes = express.Router();
const multer = require("multer");
const formData = multer();

LanguageRoutes.post('/addLanguage',
   languagevalidator.checkCreateLanguage(),
   auth.handleValidatorError,
   languagesController.create
);


LanguageRoutes.get('/getValues', appLabelValueController.findAll)



//* App Labels Module 
// Last Work #(Vipul) 
LanguageRoutes.post('/createAppLabel',
   formData.any(),
   auth.verifyAuthenticateToken,
   languagevalidator.chechCreateAppLabel(),
   auth.handleValidatorError,
   languagesController.createAppLabel
);

LanguageRoutes.post('/updateAppLabel',
   formData.any(),
   auth.verifyAuthenticateToken,
   languagevalidator.chechUpdateAppLabel(),
   auth.handleValidatorError,
   languagesController.updateAppLabel
);

LanguageRoutes.post('/deleteAppLabel',
   formData.any(),
   auth.verifyAuthenticateToken,
   languagevalidator.chechDeleteAppLabel(),
   auth.handleValidatorError,
   languagesController.deleteAppLabel
);

LanguageRoutes.post('/getAppLabel',
   formData.any(),
   auth.verifyAuthenticateToken,
   languagesController.getAppLabel
);
//* End App Labels Module


LanguageRoutes.post('/createAppLabelValue',
   formData.any(),
   auth.verifyAuthenticateToken,
   languagevalidator.checkCreateAppLabelValue(),
   auth.handleValidatorError,
   languagesController.createAppLabelValue
)

LanguageRoutes.post('/updateAppLabelValue',
   formData.any(),
   auth.verifyAuthenticateToken,
   languagevalidator.checkupdateAppLabelValue(),
   auth.handleValidatorError,
   languagesController.updateAppLabelValue
)

LanguageRoutes.post('/deleteAppLabelValue',
   formData.any(),
   auth.verifyAuthenticateToken,
   languagevalidator.chechDeleteAppLabelValue(),
   auth.handleValidatorError,
   languagesController.deleteAppLabelValue
)

LanguageRoutes.post('/getAppLabelValue',
   formData.any(),
   auth.verifyAuthenticateToken,
   // languagevalidator.chechGetAppLabelValue(),
   // auth.handleValidatorError,
   languagesController.getAppLabelValue
);

LanguageRoutes.post('/getMappingswithLanguage',
   languagesController.getMappingswithLanguage
);


export default LanguageRoutes