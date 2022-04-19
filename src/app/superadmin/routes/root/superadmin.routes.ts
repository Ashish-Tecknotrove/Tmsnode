import {NextFunction, Router} from "express";
import {Request, Response} from "express";
import moment from "moment";
import auth from "../../../../core/middleware/auth";
import companyController from "../../controller/root/company.controller";
import curriculumController from "../../controller/root/curriculum.controller";
import dashboardController from "../../controller/root/dashboard.controller";
import simulatorController from "../../controller/root/simulator.controller";
import subscriptionController from "../../controller/root/subscription.controller";
import companyValidator from "../../validator/root/company.validator";
import curriculumValidator from "../../validator/root/curriculum.validator";
import simulatorValidator from "../../validator/root/simulator.validator";
import subscriptionValidator from "../../validator/root/subscription.validator";



const SuperAdminRoutes=Router();
var multer = require('multer');
var formData = multer();

//TODO VALIDATE DECLARATON 
const authentication=auth.verify_superAdmin_AuthenticateToken;
const acceptPostData=formData.none();

//TODO FILE UPLOAD CODE
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './resources/company_logo')
    },
    filename: function (req: any, file: any, cb: any) {
        // cb(null, file.originalname)
        cb(null, moment().format('YYYYMMDDHHmmss') + '_' + file.originalname.toLowerCase().split(' ').join('_'));

    }
});


const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {

        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};

const upload = multer({storage: storage, fileFilter: fileFilter});

//?? DASHBOARD //

SuperAdminRoutes.get("/company_count",
authentication,
dashboardController.total_companies
)

SuperAdminRoutes.get("/subscriptionCount",
authentication,
dashboardController.total_subscription
)

//?? DASHBOARD -- END //


//TODO COMPANY ROUTES START

//?? Register New Company
SuperAdminRoutes.post('/registerCompany',
    authentication,
    upload.single('picture_pic'), //FormData With File
    async (req: Request, res: Response, next: NextFunction) => {
        next();
    },
    companyValidator.registerCommpanyParameter(),
    auth.handleValidatorError,
    companyController.registerCompany,
);

// ?? Update Company
SuperAdminRoutes.post('/updateCompany',
    authentication,
    upload.single('picture_pic'), //FormData With File
    async (req: Request, res: Response, next: NextFunction) => {
        next();
    },
    companyValidator.updateCommpanyParameter(),
    auth.handleValidatorError,
    companyController.updateCompany,
);

//?? Delete Company
SuperAdminRoutes.post('/deleteCompany',
    acceptPostData,
    authentication,
    companyValidator.deleteCommpanyParameter(),
    auth.handleValidatorError,
    companyController.deleteCompany,
);

//?? GET Company
SuperAdminRoutes.post('/getRegisterCompany',
acceptPostData,
authentication,
companyController.getCompany);


//?? Company Login

// ??Create New User
SuperAdminRoutes.post('/addCompanyUserLogin',
    acceptPostData,
    authentication,
    companyValidator.companyPersonLogin(),
    auth.handleValidatorError,
    companyController.add_company_login
);

//?? Get Company New User
SuperAdminRoutes.post('/getCompanyUser',
    acceptPostData,
    authentication,
    companyValidator.getcompanyPerson(),
    auth.handleValidatorError,
    companyController.get_company_user
);

SuperAdminRoutes.post('/updatedCompanyUser',
    acceptPostData,
    authentication,
    companyValidator.updatecompanyPersonLogin(),
    auth.handleValidatorError,
    companyController.updated_company_user
);

SuperAdminRoutes.post('/deleteCompanyUser',
    acceptPostData,
    authentication,
    companyValidator.deletecompanyPerson(),
    auth.handleValidatorError,
    companyController.delete_company_user
);

SuperAdminRoutes.post('/getCompanyDetailsById',
    acceptPostData,
    authentication,
    companyValidator.getcompanyPerson(),
    auth.handleValidatorError,
    companyController.get_company_details_by_id
)

// -----------------Trainee Customize Form
SuperAdminRoutes.post('/getTraineeCustomForm',
    acceptPostData,
    authentication,
    companyValidator.getTraineeCustomFormValidator(),
    auth.handleValidatorError,
    companyController.get_trainee_customize_form
)


SuperAdminRoutes.post('/getTraineeMasterFormByCompany',
    formData.none(),
    authentication,
    companyValidator.getTraineeMasterFormByCompany(),
    auth.handleValidatorError,
    companyController.getTraineeMasterFormByCompany
)

SuperAdminRoutes.post('/updateTraineeMasterFormByCompany',
    formData.none(),
    authentication,
    companyValidator.updateTraineeMasterFormByCompany(),
    auth.handleValidatorError,
    companyController.updateTraineeMasterFormByCompany
)

//TODO COMPANY ROUTES END --------------------------------


//TODO Curriculum Controller 
SuperAdminRoutes.post('/create_curriculum_parent_category',
    acceptPostData,
    authentication,
    curriculumValidator.parentCategory(),
    auth.handleValidatorError,  
    curriculumController.create_curriculum_parent_category
);

SuperAdminRoutes.post('/get_curriculum_parent_category',
    formData.none(),
    authentication,
    curriculumValidator.technology(),
    auth.handleValidatorError,
    curriculumController.getCurriculumParent
);

SuperAdminRoutes.post('/create_curriculum_parent_category_test',
    acceptPostData,
    authentication,
    curriculumValidator.parentCategoryTest(),
    auth.handleValidatorError,
    curriculumController.create_curriculum_parent_category_test
);

SuperAdminRoutes.get('/technology',
    authentication,
    curriculumController.getTechnology
)


SuperAdminRoutes.post('/get_curriculum_parent_category_test',
    formData.none(),
    authentication,
    curriculumValidator.getParentCategory(),
    auth.handleValidatorError,
    curriculumController.getCurriculumParentTest
);

SuperAdminRoutes.post('/delete_curriculum_parent_category_test',
    formData.none(),
    authentication,
    curriculumValidator.deleteParentCategoryTest(),
    auth.handleValidatorError,
    curriculumController.deleteCurriculumParentCategoryTest 
);

SuperAdminRoutes.post('/update_curriculum_parent_category_test',
    formData.none(),
    authentication,
    curriculumValidator.updateParentCategoryTest(),
    auth.handleValidatorError,
    curriculumController.updateCurriculumParentCategoryTest 
);

SuperAdminRoutes.post('/getCompanyCurriculum',
    formData.none(),
    authentication,
    curriculumValidator.getComapnyCurriculamValidId(),
    auth.handleValidatorError,
    curriculumController.getCompanyCurriculum
);

SuperAdminRoutes.post('/buildCurriculum',
    formData.none(),
    authentication,
    curriculumValidator.buildCurriculumParameter(),
    auth.handleValidatorError,
    curriculumController.buildCurriculum
);


//TODO CURRICULUM CONTROLLER END ------------------


//TODO SIMULATOR ROUTES

SuperAdminRoutes.post('/addSimulator',
    formData.none(),
    authentication,
    simulatorValidator.addSimulator(),
    auth.handleValidatorError,
    simulatorController.addSimulator
);

SuperAdminRoutes.post('/editSimulator',
    formData.none(),
    authentication,
    simulatorValidator.editSimulator(),
    auth.handleValidatorError,
    simulatorController.editSimulator
);

SuperAdminRoutes.post('/deleteSimulator',
    formData.none(),
    authentication,
    simulatorValidator.deleteSimulator(),
    auth.handleValidatorError,
    simulatorController.deleteSimulator
);


SuperAdminRoutes.post('/getSimulator',
    formData.none(),
    authentication,
    simulatorValidator.getSimulator(),
    auth.handleValidatorError,
    simulatorController.getSimulator
);

SuperAdminRoutes.post('/get_company_simulator_list',
    formData.none(),
    authentication,
    simulatorValidator.get_company_simulator_list(),
    auth.handleValidatorError,
    simulatorController.get_company_simulator_list
);


//TODO Simulatore Routes END HERE


//TODO Create Subscription
SuperAdminRoutes.post('/createSubscription',
    formData.none(),
    authentication,
    subscriptionValidator.newSubscriptionParameter(),
    auth.handleValidatorError,
    subscriptionController.createNewSubscription
);

SuperAdminRoutes.post('/updateSubscription',
    formData.none(),
    authentication,
    subscriptionValidator.updateSubscriptionParameter(),
    auth.handleValidatorError,
    subscriptionController.updateSubscription
);

SuperAdminRoutes.post('/deleteSubscription',
    formData.none(),
    authentication,
    subscriptionValidator.deleteSubscriptionParameter(),
    auth.handleValidatorError,
    subscriptionController.deleteSubscription
);



SuperAdminRoutes.post('/getSubscription',
formData.none(),
authentication,
    subscriptionController.getSubscription
);

SuperAdminRoutes.post('/getSubscriptionByCompany',
    formData.none(),
    authentication,
    subscriptionValidator.getSubscriptionByCompany(),
    auth.handleValidatorError,
    subscriptionController.getSubscriptionByCompany
)


export default SuperAdminRoutes