import  chai  from 'chai';
import chaiHttp = require("chai-http");
import root_route from "../../../src/routes/root/root_routes";
import app from '../../../app';
import responseCodes from "../../../src/strings/response-codes";

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

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
      chai.request(app)
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
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Testing Missing Params', (done) => {
      chai.request(app)
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
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Wrong Params', (done) => {
      chai.request(app)
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
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

    it('Testing Create data', (done) => {
       chai.request(app)
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
             expect(res).to.have.status(responseCodes.SUCCESS);
             done();
          })
    });

   it('Testing Existing data', (done) => {
      chai.request(app)
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
            expect(res).to.have.status(responseCodes.CREATED);
            done();
         })
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
      chai.request(app)
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
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Testing Missing Params', (done) => {
      chai.request(app)
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
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Wrong Params', (done) => {
      chai.request(app)
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
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

    it('Testing Update data', (done) => {
       chai.request(app)
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
             expect(res).to.have.status(responseCodes.SUCCESS);
             done();
          })
    });

    it('Testing Invalid data', (done) => {
      chai.request(app)
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
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });


});

describe('Delete Subscription Module', () => {

   let field = {
      updated_by: 1,
      subscription_id: 12
   };

   it('Testing Auth', (done) => {
      chai.request(app)
         .post('/TMS/subscription/deleteSubscription')
         .auth(token1, { type: 'bearer' })
         .field({
            updated_by: 1,
            subscription_id: 12
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Testing Missing Params', (done) => {
      chai.request(app)
         .post('/TMS/subscription/deleteSubscription')
         .auth(token, { type: 'bearer' })
         .field({
            updated_by: 1,
            // subscription_id: 12
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Wrong Params', (done) => {
      chai.request(app)
         .post('/TMS/subscription/deleteSubscription')
         .auth(token, { type: 'bearer' })
         .field({
            updated_by: 1,
            subscriptionid: 12
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

    it('Testing Delete data', (done) => {
       chai.request(app)
      .post('/TMS/subscription/deleteSubscription')
          .auth(token, { type: 'bearer' })
          .field({
            deleted_by: 1,
            subscription_id: 12
          })
          .end((err, res) => {
            //  console.log(res);
             expect(res).to.have.status(responseCodes.SUCCESS);
             done();
          })
    });

    it('Testing Invalid data', (done) => {
      chai.request(app)
     .post('/TMS/subscription/deleteSubscription')
         .auth(token, { type: 'bearer' })
         .field({
            updated_by: 1,
            subscription_id: 11
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });


});

describe('Get Subscription Module', () => {

   let field = {
      company_id: 19,
   };

   it('Testing Auth', (done) => {
      chai.request(app)
         .post('/TMS/subscription/getSubscription')
         .auth(token1, { type: 'bearer' })
         .field({
            company_id: 19,
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Testing Missing Params', (done) => {
      chai.request(app)
         .post('/TMS/subscription/getSubscription')
         .auth(token, { type: 'bearer' })
         .field({
            // company_id: 19,
         })
         .end((err, res) => {
            // console.log(res);
            //* response for all company
            expect(res).to.have.status(responseCodes.SUCCESS);
            done();
         })
   });

    it('Testing Get data', (done) => {
       chai.request(app)
      .post('/TMS/subscription/getSubscription')
          .auth(token, { type: 'bearer' })
          .field({
            company_id: 19,
          })
          .end((err, res) => {
             // console.log(res);
             expect(res).to.have.status(responseCodes.SUCCESS);
             done();
          })
    });

});
