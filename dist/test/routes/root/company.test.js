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
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2NDQ0MDUyMDYsImV4cCI6MTY0NDU3ODAwNn0.Oc2tmC56paFF3CHmG7fuJmdHwc7D4HN6o5PGoezbK7A";
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
            .field({
            company_name: 'Tecknotrove Systems PVT LTD',
            gst: '123456789'
        })
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('should register new company', (done) => {
        const data = {
            company_name: 'Teck PVT LTD',
            gst: '123456789',
            pincode: '401305',
            country_id: '1',
            state_id: '1',
            city_id: '1',
            address: 'Andheri',
            trainee_unique_fields: 'email',
            created_by: '1',
            updated_by: '1',
            picture: 'images.jpg',
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
            company_name: 'Teck PVT LTD',
            gst: '123456789',
            pincode: '401305',
            country_id: '1',
            state_id: '1',
            city_id: '1',
            address: 'Andheri',
            trainee_unique_fields: 'email',
            created_by: '1',
            updated_by: '1',
            picture: 'images.jpg',
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
            company_id: '30',
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
            company_id: '30',
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
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
});
describe('Delete Company Apis module Testing', () => {
    it('should check delete Company ', (done) => {
        const data = {
            company_id: '30',
            deleted_by: '1'
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteCompany')
            .auth(token, { type: 'bearer' })
            .field(data)
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('should check missing params ', (done) => {
        const data = {
            company_id: '30',
            // deleted_by:'1'
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteCompany')
            .auth(token, { type: 'bearer' })
            .field(data)
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('should check not exists or deleted Company ', (done) => {
        const data = {
            company_id: '30',
            deleted_by: '1'
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteCompany')
            .auth(token, { type: 'bearer' })
            .field(data)
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
});
describe('Get Company Apis Module Testing', () => {
    it('testing with no token', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getRegisterCompany')
            // .auth(token,{type:'bearer'})
            .field({
            company_id: 31
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('get all company data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getRegisterCompany')
            .auth(token, { type: 'bearer' })
            .field({
        // company_id:31
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('get particular company data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getRegisterCompany')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 31
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('get particular company data with wrong params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getRegisterCompany')
            .auth(token, { type: 'bearer' })
            .field({
            companyid: 31
        })
            .end((err, res) => {
            //* get response will be all companies data
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Get Company Details By CompanyId Apis Module Testing', () => {
    it('testing with no token', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyDetailsById')
            // .auth(token,{type:'bearer'})
            .field({
            company_id: 31
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('missing params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyDetailsById')
            .auth(token, { type: 'bearer' })
            .field({
        // company_id:31
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('wrong params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyDetailsById')
            .auth(token, { type: 'bearer' })
            .field({
            companyid: 31
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('get company details data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyDetailsById')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 31
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Create Company User', () => {
    let field = {
        company_id: 31,
        name: "Vipul",
        department: 1,
        mobile_no: 132321564,
        canlogin: 0,
        email: "vipul@gmail.com",
        password: "123",
        created_by: 1
    };
    it('testing with no token', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/addCompanyUserLogin')
            // .auth(token,{type:'bearer'})
            .field({
            company_id: 31,
            name: "Vipul",
            department: 1,
            mobile_no: 132321564,
            canlogin: 0,
            email: "vipul@gmail.com",
            password: "123",
            created_by: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('missing params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/addCompanyUserLogin')
            .auth(token, { type: 'bearer' })
            .field({
            // company_id: 31,
            name: "Vipul",
            department: 1,
            mobile_no: 132321564,
            canlogin: 0,
            email: "vipul@gmail.com",
            password: "123",
            created_by: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('wrong params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/addCompanyUserLogin')
            .auth(token, { type: 'bearer' })
            .field({
            companyid: 31,
            name: "Vipul",
            department: 1,
            mobile_no: 132321564,
            canlogin: 0,
            email: "vipul@gmail.com",
            password: "123",
            created_by: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('check valid Email data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/addCompanyUserLogin')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 31,
            name: "Vipul",
            department: 1,
            mobile_no: 132321564,
            canlogin: 0,
            email: "vipul",
            password: "123",
            created_by: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('create company user with same name', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/addCompanyUserLogin')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 31,
            name: "Vipul",
            department: 1,
            mobile_no: 132321564,
            canlogin: 0,
            email: "vipul@gmail.com",
            password: "123",
            created_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('create company user', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/addCompanyUserLogin')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 31,
            name: "Vipul1",
            department: 1,
            mobile_no: 132321564,
            canlogin: 0,
            email: "vipul@gmail.com",
            password: "123",
            created_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Get Company User', () => {
    let field = {
        company_id: 31,
    };
    it('testing with no token', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyUser')
            // .auth(token,{type:'bearer'})
            .field({
            company_id: 31,
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('missing params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
        // company_id: 31
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('wrong params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
            companyid: 31
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('get company user', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 31
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Delete Company User', () => {
    let field = {
        user_id: 2,
        deleted_by: 1
    };
    it('testing with no token', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteCompanyUser')
            // .auth(token,{type:'bearer'})
            .field({
            user_id: 2,
            deleted_by: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('missing params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
            // user_id: 2,
            deleted_by: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('wrong params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
            userid: 2,
            deleted_by: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('delete company user', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
            user_id: 2,
            deleted_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('delete invalid company user', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
            user_id: 31,
            deleted_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
});
