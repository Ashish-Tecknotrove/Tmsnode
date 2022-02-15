import chai from "chai";
//import  { expect }  from 'chai';
import chaiHttp = require("chai-http");
import root_route from "../../../src/routes/root/root_routes";
import app from '../../../app';
import responseCodes from "../../../src/strings/response-codes";

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2NDQ4MzIyNjQsImV4cCI6MTY0NTAwNTA2NH0.4kU2h3A1tV32QPldfpnt39QNWNAeaT-d2lMmJo0Syyc";
let token1 = "";

//* App Label Module 
describe('Create App Label', () => {

   let field = {
      name: 1,
      created_by: 1
   };

   it('Testing Auth', (done) => {
      chai.request(app)
         .post('/TMS/createAppLabel')
         .auth(token1, { type: 'bearer' })
         .field({
            name: "Test2",
            created_by: 1
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Testing Missing Params', (done) => {
      chai.request(app)
         .post('/TMS/createAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            // name: "Test2",
            created_by: 1
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Wrong Params', (done) => {
      chai.request(app)
         .post('/TMS/createAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test2",
            createdby: 1
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Whitespace Value Params', (done) => {
      chai.request(app)
         .post('/TMS/createAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test 2",
            createdby: 1
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Create data', (done) => {
      chai.request(app)
         .post('/TMS/createAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test2",
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
         .post('/TMS/createAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test2",
            created_by: 1
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.CREATED);
            done();
         })
   });

});

describe('Get App Label', () => {

   let field = {
      name: 1,
      created_by: 1
   };

   it('Testing Auth', (done) => {
      chai.request(app)
         .post('/TMS/getAppLabel')
         .auth(token1, { type: 'bearer' })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Get data', (done) => {
      chai.request(app)
         .post('/TMS/getAppLabel')
         .auth(token, { type: 'bearer' })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.SUCCESS);
            done();
         })
   });


});

describe('Update App Label', () => {

   let field = {
      name: "Test321",
      updated_by: 1,
      appLabelId: 3
   };

   it('Testing Auth', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabel')
         .auth(token1, { type: 'bearer' })
         .field({
            name: "Test321",
            updated_by: 1,
            appLabelId: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Testing Missing Params', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            // name: "Test321",
            updated_by: 1,
            appLabelId: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Wrong Params', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test321",
            updatedby: 1,
            appLabelId: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Whitespace Value Params', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test 321",
            updated_by: 1,
            appLabelId: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Update data', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test321",
            updated_by: 1,
            appLabelId: 5
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.SUCCESS);
            done();
         })
   });

   it('Testing not Existing data', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test321",
            updated_by: 1,
            appLabelId: 532
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

});

describe('Delete App Label', () => {

   let field = {
      deleted_by: 1,
      appLabelId: 3
   };

   it('Testing Auth', (done) => {
      chai.request(app)
         .post('/TMS/deleteAppLabel')
         .auth(token1, { type: 'bearer' })
         .field({
            deleted_by: 1,
            appLabelId: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Testing Missing Params', (done) => {
      chai.request(app)
         .post('/TMS/deleteAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            //      deleted_by: 1,
            appLabelId: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Wrong Params', (done) => {
      chai.request(app)
         .post('/TMS/deleteAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            deletedby: 1,
            appLabelId: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Delete data', (done) => {
      chai.request(app)
         .post('/TMS/deleteAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            deleted_by: 1,
            appLabelId: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.SUCCESS);
            done();
         })
   });

   it('Testing not Existing data', (done) => {
      chai.request(app)
         .post('/TMS/deleteAppLabel')
         .auth(token, { type: 'bearer' })
         .field({
            deleted_by: 1,
            appLabelId: 3321
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

});

//* App Label Value Module 
describe('Create App Label Value', () => {

   let field = {
      name: "Test",
      f_languageid: 1,
      f_labelid: 8,
      created_by: 1
   };

   it('Testing Auth', (done) => {
      chai.request(app)
         .post('/TMS/createAppLabelValue')
         .auth(token1, { type: 'bearer' })
         .field({
            name: "Test",
            f_languageid: 1,
            f_labelid: 8,
            created_by: 1
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Testing Missing Params', (done) => {
      chai.request(app)
         .post('/TMS/createAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            //   name: "Test",
            f_languageid: 1,
            f_labelid: 8,
            created_by: 1
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Wrong Params', (done) => {
      chai.request(app)
         .post('/TMS/createAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test",
            flanguageid: 1,
            f_labelid: 8,
            created_by: 1
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Create data', (done) => {
      chai.request(app)
         .post('/TMS/createAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test",
            f_languageid: 1,
            f_labelid: 8,
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
         .post('/TMS/createAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test",
            f_languageid: 1,
            f_labelid: 8,
            created_by: 1
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.CREATED);
            done();
         })
   });

});

describe('Get App Label Value', () => {

   let field = {
      name: 1,
      created_by: 1
   };

   it('Testing Auth', (done) => {
      chai.request(app)
         .post('/TMS/getAppLabelValue')
         .auth(token1, { type: 'bearer' })
         .field({
            f_labelid: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Get data', (done) => {
      chai.request(app)
         .post('/TMS/getAppLabelValue')
         .auth(token, { type: 'bearer' })
         // .field({
         //    f_labelid:3
         // })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.SUCCESS);
            done();
         })
   });

   it('Get data with params', (done) => {
      chai.request(app)
         .post('/TMS/getAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            f_labelid: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.SUCCESS);
            done();
         })
   });


});

describe('Update App Label Value', () => {

   let field = {
      name: "Test321",
      updated_by: 1,
      applabelvalueid: 3
   };

   it('Testing Auth', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabelValue')
         .auth(token1, { type: 'bearer' })
         .field({
            name: "Test321",
            updated_by: 1,
            applabelvalueid: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Testing Missing Params', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            //  name: "Test321",
            updated_by: 1,
            applabelvalueid: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Wrong Params', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test321",
            updatedby: 1,
            applabelvalueid: 3
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Update data', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test321",
            updated_by: 1,
            applabelvalueid: 6
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.SUCCESS);
            done();
         })
   });

   it('Testing not Existing data', (done) => {
      chai.request(app)
         .post('/TMS/updateAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            name: "Test321",
            updated_by: 1,
            applabelvalueid: 323
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

});

describe('Delete App Label', () => {

   let field = {
      deleted_by: 1,
      applabelvalueid: 6
   };

   it('Testing Auth', (done) => {
      chai.request(app)
         .post('/TMS/deleteAppLabelValue')
         .auth(token1, { type: 'bearer' })
         .field({
            deleted_by: 1,
            applabelvalueid: 6
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.UNAUTHORIZED);
            done();
         })
   });

   it('Testing Missing Params', (done) => {
      chai.request(app)
         .post('/TMS/deleteAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            //      deleted_by: 1,
            applabelvalueid: 6
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Wrong Params', (done) => {
      chai.request(app)
         .post('/TMS/deleteAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            deletedby: 1,
            applabelvalueid: 6
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

   it('Testing Delete data', (done) => {
      chai.request(app)
         .post('/TMS/deleteAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            deleted_by: 1,
            applabelvalueid: 6
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.SUCCESS);
            done();
         })
   });

   it('Testing not Existing data', (done) => {
      chai.request(app)
         .post('/TMS/deleteAppLabelValue')
         .auth(token, { type: 'bearer' })
         .field({
            deleted_by: 1,
            applabelvalueid: 3321
         })
         .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
         })
   });

});