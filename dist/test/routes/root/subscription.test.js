"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chaiHttp = require("chai-http");
const app_1 = __importDefault(require("../../../app"));
const response_codes_1 = __importDefault(require("../../../src/strings/response-codes"));
const { expect } = chai_1.default;
chai_1.default.should();
chai_1.default.use(chaiHttp);
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2NDQzODIzODcsImV4cCI6MTY0NDU1NTE4N30.NgceSGm8RRYFGcpHNgsnuhuoOHVLbq1RQZd-S5tzhGo";
let token1 = "";
describe('Create Subscription Module', () => {
    let field = {
        curriculum_id: 1,
        company_id: 13,
        day_no: 12,
        calender_type: "days",
        licence_no: 50,
        payment_type: "postpaid",
        activation_date: "2022-01-08",
        expiry_date: "12/10/2021",
        created_by: 1,
        updated_by: 1
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/createSubscription')
            .auth(token1, { type: 'bearer' })
            .field({
            curriculum_id: 1,
            company_id: 13,
            day_no: 12,
            calender_type: "days",
            licence_no: 50,
            payment_type: "postpaid",
            activation_date: "2022-01-08",
            expiry_date: "12/10/2021",
            created_by: 1,
            updated_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/createSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            // curriculum_id: 1,
            // company_id: 13,
            day_no: 12,
            calender_type: "days",
            licence_no: 50,
            payment_type: "postpaid",
            activation_date: "2022-01-08",
            expiry_date: "12/10/2021",
            created_by: 1,
            updated_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/createSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            curriculumid: 1,
            companyid: 13,
            day_no: 12,
            calender_type: "days",
            licence_no: 50,
            payment_type: "postpaid",
            activation_date: "2022-01-08",
            expiry_date: "12/10/2021",
            created_by: 1,
            updated_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Create data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/createSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            curriculum_id: 6,
            company_id: 19,
            day_no: 12,
            calender_type: "days",
            licence_no: 50,
            payment_type: "postpaid",
            activation_date: "2022-01-08",
            created_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('Testing Existing data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/createSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            curriculum_id: 6,
            company_id: 19,
            day_no: 12,
            calender_type: "days",
            licence_no: 50,
            payment_type: "postpaid",
            activation_date: "2022-01-08",
            created_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.CREATED);
            done();
        });
    });
});
describe('Update Subscription Module', () => {
    let field = {
        day_no: 12,
        calender_type: "days",
        licence_no: 50,
        payment_type: "postpaid",
        activation_date: "2022-01-08",
        updated_by: 1,
        subscription_id: 12
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/updateSubscription')
            .auth(token1, { type: 'bearer' })
            .field({
            day_no: 12,
            calender_type: "days",
            licence_no: 50,
            payment_type: "postpaid",
            activation_date: "2022-01-08",
            expiry_date: "12/10/2021",
            curriculum_id: 1,
            updated_by: 1,
            subscription_id: 12
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/updateSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            day_no: 12,
            calender_type: "days",
            licence_no: 50,
            payment_type: "postpaid",
            activation_date: "2022-01-08",
            updated_by: 1,
            // subscription_id: 12
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/updateSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            day_no: 12,
            calender_type: "days",
            licence_no: 50,
            payment_type: "postpaid",
            activation_date: "2022-01-08",
            expiry_date: "12/10/2021",
            updated_by: 1,
            subscriptionid: 12
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Update data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/updateSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            day_no: 12,
            calender_type: "days",
            licence_no: 100,
            payment_type: "postpaid",
            activation_date: "2022-01-08",
            updated_by: 1,
            subscription_id: 12
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('Testing Invalid data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/updateSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            day_no: 12,
            calender_type: "days",
            licence_no: 50,
            payment_type: "postpaid",
            activation_date: "2022-01-08",
            updated_by: 1,
            subscription_id: 11
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
});
describe('Delete Subscription Module', () => {
    let field = {
        updated_by: 1,
        subscription_id: 12
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/deleteSubscription')
            .auth(token1, { type: 'bearer' })
            .field({
            updated_by: 1,
            subscription_id: 12
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/deleteSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            updated_by: 1,
            // subscription_id: 12
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/deleteSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            updated_by: 1,
            subscriptionid: 12
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Delete data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/deleteSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            deleted_by: 1,
            subscription_id: 12
        })
            .end((err, res) => {
            //  console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('Testing Invalid data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/deleteSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            updated_by: 1,
            subscription_id: 11
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
});
describe('Get Subscription Module', () => {
    let field = {
        company_id: 19,
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/getSubscription')
            .auth(token1, { type: 'bearer' })
            .field({
            company_id: 19,
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/getSubscription')
            .auth(token, { type: 'bearer' })
            .field({
        // company_id: 19,
        })
            .end((err, res) => {
            // console.log(res);
            //* response for all company
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('Testing Get data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/subscription/getSubscription')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 19,
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
