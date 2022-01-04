import { body } from "express-validator";


class CurriculumValidator
{
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
            body('subcategory_prefix').notEmpty().withMessage('parameter is missing'),
            body('subcategory_name').notEmpty().withMessage('parameter is missing'),
            body('title').notEmpty().withMessage('parameter is missing'),
            body('parent_id').notEmpty().withMessage('parameter is missing'),
            body('technology_type_id').notEmpty().withMessage('parameter is missing'),
            body('created_by').notEmpty().withMessage('parameter is missing')
        ]
    }
}

export default new CurriculumValidator();