import * as express from "express";
import auth from "../../middleware/auth";

import SubscriptionValidator from "../../validator/root/subscription.validator";
import SubscriptionController from "../../app/root/subscription.controller";


const Router = express.Router();
var multer = require('multer');
var formData = multer();



//TODO Create Subscription
Router.post('/createSubscription',
    formData.none(),
    auth.verifyAuthenticateToken,
    SubscriptionValidator.newSubscriptionParameter(),
    auth.handleValidatorError,
    SubscriptionController.createNewSubscription
);

Router.get('/subscriptionCount',SubscriptionController.total_subscription);

export default Router;