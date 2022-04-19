import { body } from "express-validator";


class CurriculumValidator
{
    technology()
    {
        return[
            body('technology_id').notEmpty().withMessage('parameter is missing')
        ];
    }
    
    parentCategory()
    {
        return[
            body('title').notEmpty().withMessage('parameter is missing'),
            body('technology_type_id').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing')
        ];
    }

    parentCategoryTest()
    {
        return[
            body('technology_type_id').notEmpty().withMessage('parameter is missing'),
            body('parent_id').notEmpty().withMessage('parameter is missing'),
            body('prefix').notEmpty().withMessage('parameter is missing'),
            body('title').notEmpty().withMessage('parameter is missing'),
            body('description').notEmpty().withMessage('parameter is missing'),
            body('language_id').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing'),
        ]
    }

    getParentCategory()
    {
        return[
            body('parent_id').notEmpty().withMessage('parameter is missing'),
        ]
    }

    getParentCategoryTest()
    {
        return[
            body('test_id').notEmpty().withMessage('parameter is missing'),
        ]
    }

    updateParentCategoryTest(){
        return[
            body('test_id').notEmpty().withMessage('parameter is missing'),
            body('prefix').notEmpty().withMessage('parameter is missing'),
            body('title').notEmpty().withMessage('parameter is missing'),
            body('description').notEmpty().withMessage('parameter is missing'),
           // body('language_id').notEmpty().withMessage('parameter is missing'),
            body('updated_by').notEmpty().withMessage('parameter is missing'),
        ]
    }

    deleteParentCategoryTest(){
        return[
            body('test_id').notEmpty().withMessage('parameter is missing'),
            body('deleted_by').notEmpty().withMessage('parameter is missing'),
        ]
    }

    getComapnyCurriculamValidId()
    {
        return[
            body('company_id').notEmpty().withMessage('parameter is missing'),
        ]
    }

    buildCurriculumParameter()
    {
        return[
            body('company_id').notEmpty().withMessage('parameter is missing'),
            body('name').notEmpty().withMessage('parameter is missing'),
            body('curriculum').notEmpty().withMessage('parameter is missing'),
            body('sequence').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing')
        ]
    }

    getCurriculumWithSubscriptionCheck()
    {
        return[
            body('company_id').notEmpty().withMessage('parameter is missing')
        ]
    }

    getTestMarksAttemptByTechnology(){
        return [
            body('company_id').notEmpty().withMessage('parameter is missing'),
            // body('technology_type_id').notEmpty().withMessage('parameter is missing'),
            body('curriculum_id').notEmpty().withMessage('parameter is missing'),
        ];
    }

    submitTestMarksAttemptByTechnology(){
        return [
            body('updated_by').notEmpty().withMessage('parameter is missing'),
            body('data').notEmpty().withMessage('parameter is missing'),
        ];
    }
}

export default new CurriculumValidator();