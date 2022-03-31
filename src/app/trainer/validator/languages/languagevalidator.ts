import { body } from "express-validator";


class LanguageValidator{
	
    checkCreateLanguage() {
		return [
			body('name')
				.notEmpty()
				.withMessage('name value should not be empty')
		];
	}

	//* LabelsModule 
	// Last Work #(Vipul) 
	chechCreateAppLabel(){
		return[
			body('name').notEmpty().withMessage('parameter is missing'),
			body('name').custom((value) => {
				if ((/\s/).test(value)) {
				  throw new Error('Label should be without whitespace');
				}
				// Indicates the success of this synchronous custom validator
				return true;
			 }),
			body('created_by').notEmpty().withMessage('parameter is missing')
		];
	}

	chechUpdateAppLabel(){
		return[
			body('appLabelId').notEmpty().withMessage('parameter is missing'),
			body('name').notEmpty().withMessage('parameter is missing'),
			body('name').custom((value) => {
				if ((/\s/).test(value)) {
				  throw new Error('Label should be without whitespace');
				}
				// Indicates the success of this synchronous custom validator
				return true;
			 }),
			body('updated_by').notEmpty().withMessage('parameter is missing')
		];
	}

	chechDeleteAppLabel(){
		return[
			body('appLabelId').notEmpty().withMessage('parameter is missing'),
			body('deleted_by').notEmpty().withMessage('parameter is missing')
		];
	}
	//* End LabelsModule 

	checkCreateAppLabelValue()
	{
		return[
			body('name').notEmpty().withMessage("parameter is missing"),
			body('f_languageid').notEmpty().withMessage('parameter is missing'),
			body('f_labelid').notEmpty().withMessage('parameter is missing'),
			body('created_by').notEmpty().withMessage('parameter is missing')
		];
	}

	checkupdateAppLabelValue()
	{
		return[
			body('applabelvalueid').notEmpty().withMessage('parameter is missing'),
			body('name').notEmpty().withMessage("parameter is missing"),
			body('updated_by').notEmpty().withMessage('parameter is missing')
		];
	}

	chechDeleteAppLabelValue(){
		return[
			body('applabelvalueid').notEmpty().withMessage('parameter is missing'),
			body('deleted_by').notEmpty().withMessage('parameter is missing')
		];
	}

	chechGetAppLabelValue(){
		return[
			body('f_labelid').notEmpty().withMessage('parameter is missing'),
		];
	}

}


export default new LanguageValidator();