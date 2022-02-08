import { any } from 'bluebird';
import Router from "./root_routes";
import * as express from "express";
import CurriculumValidator from "../../validator/root/curriculum.validator";
import auth from "../../middleware/auth";
import curriculumController from "../../app/root/curriculum.controller";

const router = express.Router();
const multer = require("multer");
const formData = multer();

router.post('/create_curriculum_parent_category',
    formData.any(),
    auth.verifyAuthenticateToken,
    CurriculumValidator.parentCategory(),
    auth.handleValidatorError,  
    curriculumController.create_curriculum_parent_category
);

router.post('/get_curriculum_parent_category',
    formData.none(),
    auth.verifyAuthenticateToken,
    CurriculumValidator.technology(),
    auth.handleValidatorError,
    curriculumController.getCurriculumParent
);

router.post('/create_curriculum_parent_category_test',
    formData.any(),
    auth.verifyAuthenticateToken,
    CurriculumValidator.parentCategoryTest(),
    auth.handleValidatorError,
    curriculumController.create_curriculum_parent_category_test
);

router.get('/technology',
    auth.verifyAuthenticateToken,
    curriculumController.getTechnology
)


router.post('/get_curriculum_parent_category_test',
    formData.none(),
    auth.verifyAuthenticateToken,
    CurriculumValidator.getParentCategory(),
    auth.handleValidatorError,
    curriculumController.getCurriculumParentTest
);

router.post('/delete_curriculum_parent_category_test',
    formData.none(),
    auth.verifyAuthenticateToken,
    CurriculumValidator.getParentCategoryTest(),
    auth.handleValidatorError,
    curriculumController.deleteCurriculumParentCategoryTest 
);

router.post('/update_curriculum_parent_category_test',
    formData.none(),
    auth.verifyAuthenticateToken,
    CurriculumValidator.updateParentCategoryTest(),
    auth.handleValidatorError,
    curriculumController.updateCurriculumParentCategoryTest 
);

router.post('/getCompanyCurriculum',
    formData.none(),
    auth.verifyAuthenticateToken,
    CurriculumValidator.getComapnyCurriculamValidId(),
    auth.handleValidatorError,
    curriculumController.getCompanyCurriculum
);

router.post('/buildCurriculum',
    formData.none(),
    auth.verifyAuthenticateToken,
    CurriculumValidator.buildCurriculumParameter(),
    auth.handleValidatorError,
    curriculumController.buildCurriculum
);

export default router;