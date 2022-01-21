import Languages from '../model/language/language.model';
import Company from '../model/root/company.model';
import CompanyUser from '../model/root/compayuser.model';
import Subscription from '../model/root/subscription.model';
import Trainee from '../model/root/trainee.model';
import Trainer from '../model/root/trainer.model';
import Users from '../model/root/users.model';
import CurriculumParentCategory from "../model/root/curriculum_parent_category.model";
import CurriculumParentCategoryTest from "../model/root/curriculum_parent_category_test.model";
import CurriculumBuilder from "../model/root/curriculumbuilder.model";
import Log from '../app/root/log.model';

const isDevelopment = process.env.NODE_ENV === 'development'

const dbinitialized =  ()=>{
    
    //TODO Root Model START 
    Users.sync();
    Languages.sync();
    Company.sync();
    Trainee.sync();
    Trainer.sync();
    CompanyUser.sync();
    Subscription.sync();
    CurriculumParentCategory.sync();
    CurriculumParentCategoryTest.sync();
    CurriculumBuilder.sync();
    Log.sync();
     //TODO Root Model END 
}

export default dbinitialized;