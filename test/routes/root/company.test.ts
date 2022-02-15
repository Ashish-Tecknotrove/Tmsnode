import chaiHttp from "chai-http";
import chai from "chai";
import app from "../../../app";
import responseCodes from "../../../src/strings/response-codes";

process.env.NODE_ENV = 'test'
const { expect } = chai;
const path = require('path');
chai.should();
chai.use(chaiHttp);

var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2NDQ0MDUyMDYsImV4cCI6MTY0NDU3ODAwNn0.Oc2tmC56paFF3CHmG7fuJmdHwc7D4HN6o5PGoezbK7A";

describe('Regsiter Company  Apis Module Test', () => {

    it('testing with no token', (done) => {


        chai.request(app)
            .post('/TMS/registerCompany')
            .end((err, res) => {
                //console.log(res);
                expect(res).to.have.status(responseCodes.UNAUTHORIZED);
                done();
            });
    });

    it('shouldh check missing parameter', (done) => {

        const data = {
            company_name: 'Tecknotrove Systems PVT LTD',
            gst: '123456789'
        };


        chai.request(app)
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
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
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


        chai.request(app)
            .post('/TMS/registerCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.SUCCESS);
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


        chai.request(app)
            .post('/TMS/registerCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.CREATED);
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


        chai.request(app)
            .post('/TMS/updateCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.SUCCESS);
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


        chai.request(app)
            .post('/TMS/updateCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
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


        chai.request(app)
            .post('/TMS/updateCompany')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('picture_pic', "./resources/company_logo/images.jpg")
            //.attach('picture_pic',path.resolve('./resources/company_logo', 'images.jpg'))
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
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


        chai.request(app)
            .post('/TMS/deleteCompany')
            .auth(token, { type: 'bearer' })
            .field(data)
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.SUCCESS);
                done();
            });

    });

    it('should check missing params ', (done) => {

        const data = {
            company_id: '30',
            // deleted_by:'1'
        };


        chai.request(app)
            .post('/TMS/deleteCompany')
            .auth(token, { type: 'bearer' })
            .field(data)
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            });

    });

    it('should check not exists or deleted Company ', (done) => {

        const data = {
            company_id: '30',
            deleted_by: '1'
        };


        chai.request(app)
            .post('/TMS/deleteCompany')
            .auth(token, { type: 'bearer' })
            .field(data)
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            });

    });

});

describe('Get Company Apis Module Testing', () => {
    it('testing with no token', (done) => {
        chai.request(app)
            .post('/TMS/getRegisterCompany')
            // .auth(token,{type:'bearer'})
            .field({
                company_id: 31
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.UNAUTHORIZED);
                done();
            })
    })

    it('get all company data', (done) => {
        chai.request(app)
            .post('/TMS/getRegisterCompany')
            .auth(token, { type: 'bearer' })
            .field({
                // company_id:31
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.SUCCESS);
                done();
            })
    })

    it('get particular company data', (done) => {
        chai.request(app)
            .post('/TMS/getRegisterCompany')
            .auth(token, { type: 'bearer' })
            .field({
                company_id: 31
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.SUCCESS);
                done();
            })
    })

    it('get particular company data with wrong params', (done) => {
        chai.request(app)
            .post('/TMS/getRegisterCompany')
            .auth(token, { type: 'bearer' })
            .field({
                companyid: 31
            })
            .end((err, res) => {
                //* get response will be all companies data
                expect(res).to.have.status(responseCodes.SUCCESS);
                done();
            })
    })
})

describe('Get Company Details By CompanyId Apis Module Testing', () => {
    it('testing with no token', (done) => {
        chai.request(app)
            .post('/TMS/getCompanyDetailsById')
            // .auth(token,{type:'bearer'})
            .field({
                company_id: 31
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.UNAUTHORIZED);
                done();
            })
    })

    it('missing params', (done) => {
        chai.request(app)
            .post('/TMS/getCompanyDetailsById')
            .auth(token, { type: 'bearer' })
            .field({
                // company_id:31
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })

    it('wrong params', (done) => {
        chai.request(app)
            .post('/TMS/getCompanyDetailsById')
            .auth(token, { type: 'bearer' })
            .field({
                companyid: 31
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })

    it('get company details data', (done) => {
        chai.request(app)
            .post('/TMS/getCompanyDetailsById')
            .auth(token, { type: 'bearer' })
            .field({
                company_id: 31
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.SUCCESS);
                done();
            })
    })
})

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
    }

    it('testing with no token', (done) => {
        chai.request(app)
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
                expect(res).to.have.status(responseCodes.UNAUTHORIZED);
                done();
            })
    })

    it('missing params', (done) => {
        chai.request(app)
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
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })

    it('wrong params', (done) => {
        chai.request(app)
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
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })

    it('check valid Email data', (done) => {
        chai.request(app)
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
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })

    it('create company user with same name', (done) => {
        chai.request(app)
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
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })

    it('create company user', (done) => {
        chai.request(app)
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
                expect(res).to.have.status(responseCodes.SUCCESS);
                done();
            })
    })
})

describe('Get Company User', () => {

    let field = {
        company_id: 31,
    }

    it('testing with no token', (done) => {
        chai.request(app)
            .post('/TMS/getCompanyUser')
            // .auth(token,{type:'bearer'})
            .field({
                company_id: 31,
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.UNAUTHORIZED);
                done();
            })
    })

    it('missing params', (done) => {
        chai.request(app)
            .post('/TMS/getCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
                // company_id: 31
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })

    it('wrong params', (done) => {
        chai.request(app)
            .post('/TMS/getCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
                companyid: 31
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })

    it('get company user', (done) => {
        chai.request(app)
            .post('/TMS/getCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
                company_id: 31
            })
            .end((err, res) => {
                // console.log(res);
                expect(res).to.have.status(responseCodes.SUCCESS);
                done();
            })
    })
})

describe('Delete Company User', () => {

    let field = {
        user_id: 2,
        deleted_by: 1
    }

    it('testing with no token', (done) => {
        chai.request(app)
            .post('/TMS/deleteCompanyUser')
            // .auth(token,{type:'bearer'})
            .field({
                user_id: 2,
                deleted_by: 1
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.UNAUTHORIZED);
                done();
            })
    })

    it('missing params', (done) => {
        chai.request(app)
            .post('/TMS/deleteCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
                // user_id: 2,
                deleted_by: 1
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })

    it('wrong params', (done) => {
        chai.request(app)
            .post('/TMS/deleteCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
                userid: 2,
                deleted_by: 1
            })
            .end((err, res) => {
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })

    it('delete company user', (done) => {
        chai.request(app)
            .post('/TMS/deleteCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
                user_id: 2,
                deleted_by: 1
            })
            .end((err, res) => {
                // console.log(res);
                expect(res).to.have.status(responseCodes.SUCCESS);
                done();
            })
    })

    it('delete invalid company user', (done) => {
        chai.request(app)
            .post('/TMS/deleteCompanyUser')
            .auth(token, { type: 'bearer' })
            .field({
                user_id: 31,
                deleted_by: 1
            })
            .end((err, res) => {
                // console.log(res);
                expect(res).to.have.status(responseCodes.BAD_REQUEST);
                done();
            })
    })
})