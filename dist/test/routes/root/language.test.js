"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
//import  { expect }  from 'chai';
const chaiHttp = require("chai-http");
const app_1 = __importDefault(require("../../../app"));
const response_codes_1 = __importDefault(require("../../../src/core/strings/response-codes"));
const { expect } = chai_1.default;
chai_1.default.should();
chai_1.default.use(chaiHttp);
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2NDQ4MzIyNjQsImV4cCI6MTY0NTAwNTA2NH0.4kU2h3A1tV32QPldfpnt39QNWNAeaT-d2lMmJo0Syyc";
let token1 = "";
//* App Label Module 
describe('Create App Label', () => {
    let field = {
        name: 1,
        created_by: 1
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/createAppLabel')
            .auth(token1, { type: 'bearer' })
            .field({
            name: "Test2",
            created_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/createAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            // name: "Test2",
            created_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/createAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test2",
            createdby: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Whitespace Value Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/createAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test 2",
            createdby: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Create data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/createAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test2",
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
            .post('/TMS/createAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test2",
            created_by: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.CREATED);
            done();
        });
    });
});
describe('Get App Label', () => {
    let field = {
        name: 1,
        created_by: 1
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getAppLabel')
            .auth(token1, { type: 'bearer' })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Get data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getAppLabel')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Update App Label', () => {
    let field = {
        name: "Test321",
        updated_by: 1,
        appLabelId: 3
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabel')
            .auth(token1, { type: 'bearer' })
            .field({
            name: "Test321",
            updated_by: 1,
            appLabelId: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            // name: "Test321",
            updated_by: 1,
            appLabelId: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test321",
            updatedby: 1,
            appLabelId: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Whitespace Value Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test 321",
            updated_by: 1,
            appLabelId: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Update data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test321",
            updated_by: 1,
            appLabelId: 5
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('Testing not Existing data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test321",
            updated_by: 1,
            appLabelId: 532
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
});
describe('Delete App Label', () => {
    let field = {
        deleted_by: 1,
        appLabelId: 3
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteAppLabel')
            .auth(token1, { type: 'bearer' })
            .field({
            deleted_by: 1,
            appLabelId: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            //      deleted_by: 1,
            appLabelId: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            deletedby: 1,
            appLabelId: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Delete data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            deleted_by: 1,
            appLabelId: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('Testing not Existing data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteAppLabel')
            .auth(token, { type: 'bearer' })
            .field({
            deleted_by: 1,
            appLabelId: 3321
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
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
        chai_1.default.request(app_1.default)
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
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
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
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
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
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Create data', (done) => {
        chai_1.default.request(app_1.default)
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
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('Testing Existing data', (done) => {
        chai_1.default.request(app_1.default)
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
            expect(res).to.have.status(response_codes_1.default.CREATED);
            done();
        });
    });
});
describe('Get App Label Value', () => {
    let field = {
        name: 1,
        created_by: 1
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getAppLabelValue')
            .auth(token1, { type: 'bearer' })
            .field({
            f_labelid: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Get data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getAppLabelValue')
            .auth(token, { type: 'bearer' })
            // .field({
            //    f_labelid:3
            // })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('Get data with params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getAppLabelValue')
            .auth(token, { type: 'bearer' })
            .field({
            f_labelid: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Update App Label Value', () => {
    let field = {
        name: "Test321",
        updated_by: 1,
        applabelvalueid: 3
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabelValue')
            .auth(token1, { type: 'bearer' })
            .field({
            name: "Test321",
            updated_by: 1,
            applabelvalueid: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabelValue')
            .auth(token, { type: 'bearer' })
            .field({
            //  name: "Test321",
            updated_by: 1,
            applabelvalueid: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabelValue')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test321",
            updatedby: 1,
            applabelvalueid: 3
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Update data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabelValue')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test321",
            updated_by: 1,
            applabelvalueid: 6
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('Testing not Existing data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/updateAppLabelValue')
            .auth(token, { type: 'bearer' })
            .field({
            name: "Test321",
            updated_by: 1,
            applabelvalueid: 323
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
});
describe('Delete App Label', () => {
    let field = {
        deleted_by: 1,
        applabelvalueid: 6
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteAppLabelValue')
            .auth(token1, { type: 'bearer' })
            .field({
            deleted_by: 1,
            applabelvalueid: 6
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteAppLabelValue')
            .auth(token, { type: 'bearer' })
            .field({
            //      deleted_by: 1,
            applabelvalueid: 6
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteAppLabelValue')
            .auth(token, { type: 'bearer' })
            .field({
            deletedby: 1,
            applabelvalueid: 6
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Delete data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteAppLabelValue')
            .auth(token, { type: 'bearer' })
            .field({
            deleted_by: 1,
            applabelvalueid: 6
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('Testing not Existing data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/deleteAppLabelValue')
            .auth(token, { type: 'bearer' })
            .field({
            deleted_by: 1,
            applabelvalueid: 3321
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
});
