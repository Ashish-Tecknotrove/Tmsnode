import { body } from "express-validator";


class LanguageValidator{
	
    checkCreateLanguage() {
		return [
			body('name')
				.notEmpty()
				.withMessage('name value should not be empty')
		];
	}

	//App Label value Model
	checkCreateAppLabel()
	{
		return[
			body('f_languageid').notEmpty().withMessage('Language Id should not be empty'),
			body('f_labelid').notEmpty().withMessage('Label Id should not be empty'),
			body('name').notEmpty().withMessage("name should not be empty")
		];
	}
}


export default new LanguageValidator();