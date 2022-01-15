import Router from "./root_routes";
import * as express from "express";
import CurriculumValidator from "../../validator/root/curriculum.validator";
import auth from "../../middleware/auth";
import curriculumController from "../../app/root/curriculum.controller";

const router = express.Router();
const multer = require("multer");
const formData = multer();

router.post('/create_curriculum_parent_category',
    CurriculumValidator.parentCategory(),
    auth.generateAuth,
    curriculumController.create_curriculum_parent_category
);

router.post('/add_curriculum_parent_list',
    CurriculumValidator.parentCategory(),
    auth.generateAuth,
    curriculumController.add_curriculum_parent_test
);

router.get('/technology',
    auth.verifyAuthenticateToken,
    curriculumController.getTechnology
)

router.post('/get_curriculum_parent_category',
    formData.none(),
    auth.verifyAuthenticateToken,
    curriculumController.getCurriculumParent
);

router.post('/get_curriculum_parent_category_test',
    auth.verifyAuthenticateToken,
    curriculumController.getCurriculumParentTest
);

router.post('/buildCurriculum',
    formData.none(),
    auth.verifyAuthenticateToken,
    CurriculumValidator.buildCurriculumParameter(),
    auth.handleValidatorError,
    curriculumController.buildCurriculum
);

export default router;