import Languages from '../model/language/language.model';
import Company from '../model/root/company.model';
import CompanyUser from '../model/root/compayuser.model';
import Subscription from '../model/root/subscription.model';
import Trainee from '../model/root/trainee.model';
import Trainer from '../model/root/trainer.model';
import Users from '../model/root/users.model';

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
     //TODO Root Model END 
}

export default dbinitialized;