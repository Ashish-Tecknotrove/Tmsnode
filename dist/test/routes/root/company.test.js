"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_http_1 = __importDefault(require("chai-http"));
const chai_1 = __importDefault(require("chai"));
const app_1 = __importDefault(require("../../../app"));
const response_codes_1 = __importDefault(require("../../../src/strings/response-codes"));
process.env.NODE_ENV = 'test';
const { expect } = chai_1.default;
const path = require('path');
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2NDQyMTM1MzMsImV4cCI6MTY0NDM4NjMzM30.mJCME1OZrnAPDe975GxxDxuN0MfDpMRmRNzzutHLJlI";
describe('Regsiter Company  Apis Module Test', () => {
    it('testing with no token', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/registerCompany')
            .end((err, res) => {
            //console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('shouldh check missing parameter', (done) => {
        const data = {
            company_name: 'Tecknotrove Systems PVT LTD',
            gst: '123456789'
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/registerCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('should register new company', (done) => {
        const data = {
            company_name: 'Tecknotrove Systems PVT LTD',
            gst: '123456789',
            pincode: '401305',
            country_id: '1',
            state_id: '1',
            city_id: '1',
            address: 'Andheri',
            trainee_unique_fields: 'email',
            created_by: '1',
            updated_by: '1',
            picture: 'test.png',
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/registerCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('should check company already exist', (done) => {
        const data = {
            company_name: 'Tecknotrove Systems PVT LTD',
            gst: '123456789',
            pincode: '401305',
            country_id: '1',
            state_id: '1',
            city_id: '1',
            address: 'Andheri',
            trainee_unique_fields: 'email',
            created_by: '1',
            updated_by: '1',
            picture: 'test.png',
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/registerCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.CREATED);
            done();
        });
    });
});
describe('Update Company Apis module Testing', () => {
    it('should check update Company ', (done) => {
        const data = {
            company_id: '3',
            company_name: 'Tata Motors',
            gst: '123456789',
            pincode: '401305',
            country_id: '1',
            state_id: '1',
            city_id: '1',
            address: 'Andheri',
            trainee_unique_fields: 'email',
            created_by: '1',
            updated_by: '1',
            picture: 'test.png',
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/updateCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('should check update Company missing parameter', (done) => {
        const data = {
            company_id: '3',
            company_name: 'Tata Motors',
            gst: '123456789',
            pincode: '401305',
            country_id: '1'
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/updateCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('should check update Company invalid company Id', (done) => {
        const data = {
            company_id: '523',
            company_name: 'Tata Motors',
            gst: '123456789',
            pincode: '401305',
            country_id: '1',
            state_id: '1',
            city_id: '1',
            address: 'Andheri',
            trainee_unique_fields: 'email',
            created_by: '1',
            updated_by: '1',
            picture: 'test.png',
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/updateCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.CREATED);
            done();
        });
    });
});
describe('Delete Company Apis module Testing', () => {
    it('should check delete Company ', (done) => {
        const data = {
            company_id: '3',
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/updateCompany')
            .auth(token, { type: 'bearer' })
            .field(data)
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
