import { Router } from "express";
import appLabelValueController from "../../app/languages/app.label.value.controller";
import languagesController from "../../app/languages/languages.controller";
import auth from "../../middleware/auth";
import ApplabelValue from "../../model/language/app.label.value";
import Languages from "../../model/language/language.model";
import languagevalidator from "../../validator/languages/languagevalidator";


const LanguageRoutes =Router();


LanguageRoutes.post('/addLanguage',
languagevalidator.checkCreateLanguage(),
auth.handleValidatorError,
languagesController.create
);


LanguageRoutes.get('/getValues',appLabelValueController.findAll)


LanguageRoutes.post('/createLabelValue',
languagevalidator.checkCreateAppLabel(),
auth.handleValidatorError,
appLabelValueController.create
);

    
export default LanguageRoutes