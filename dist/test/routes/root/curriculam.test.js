"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
//import  { expect }  from 'chai';
const chaiHttp = require("chai-http");
const app_1 = __importDefault(require("../../../app"));
const response_codes_1 = __importDefault(require("../../../src/strings/response-codes"));
const { expect } = chai_1.default;
chai_1.default.should();
chai_1.default.use(chaiHttp);
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2NDQyMjg2NTUsImV4cCI6MTY0NDQwMTQ1NX0.KjYrKcWAsiclpJso7nRLXcDS1XgOzk0r3U8VgGp8UJg";
let token1 = "";
describe('Create Curriculam Parent Category Module', () => {
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/create_curriculum_parent_category')
            .auth(token1, { type: 'bearer' })
            .field({
            title: "Test 1",
            technology_type_id: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/create_curriculum_parent_category')
            .auth(token, { type: 'bearer' })
            .field({
            title: "Test 1",
            // technology_type_id:1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/create_curriculum_parent_category')
            .auth(token, { type: 'bearer' })
            .field({
            tital: "Test 1",
            technology_type_id: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    /*  it('Testing Create data', (done) => {
        chai.request(app)
           .post('/TMS/create_curriculum_parent_category')
           .auth(token, { type: 'bearer' })
           .field({
              title: "TEst Curricula 7",
              technology_type_id:1
           })
           .end((err, res) => {
              // console.log(res);
              expect(res).to.have.status(responseCodes.SUCCESS);
              done();
           })
     }); */
    it('Testing Existing data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/create_curriculum_parent_category')
            .auth(token, { type: 'bearer' })
            .field({
            title: "TEst Curricula 5",
            technology_type_id: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.CREATED);
            done();
        });
    });
});
describe('Get Curriculam Parent Category Module', () => {
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/get_curriculum_parent_category')
            .auth(token1, { type: 'bearer' })
            .field({
            technology_id: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/get_curriculum_parent_category')
            .auth(token, { type: 'bearer' })
            .field({
        // technology_id:1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/get_curriculum_parent_category')
            .auth(token, { type: 'bearer' })
            .field({
            technology: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Get Data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/get_curriculum_parent_category')
            .auth(token, { type: 'bearer' })
            .field({
            technology_id: 10
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Create Curriculam Parent Category Test Module', () => {
    let field = {
        prefix: 'mod 1',
        title: 'Module Super',
        parent_id: 1,
        technology_type_id: 1,
        language_id: 1,
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/create_curriculum_parent_category_test')
            .auth(token1, { type: 'bearer' })
            .field({
            prefix: 'mod 1',
            title: 'Module Super',
            parent_id: 1,
            technology_type_id: 1,
            language_id: 1,
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/create_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            // prefixs: 'mod 1',
            title: 'Module Super',
            parent_id: 1,
            technology_type_id: 1,
            language_id: 1,
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/create_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            prefixs: 'mod 1',
            title: 'Module Super',
            parent_id: 1,
            technology_type_id: 1,
            language_id: 1,
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Create Data with empty-data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/create_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            prefix: '',
            title: 'Module Super',
            parent_id: 1,
            technology_type_id: 1,
            language_id: 1,
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Create Data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/create_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            prefix: 'Mod 1',
            title: 'Module Super',
            parent_id: 1,
            technology_type_id: 1,
            language_id: 1,
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Get Curriculam Parent Category Test Module', () => {
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/get_curriculum_parent_category_test')
            .auth(token1, { type: 'bearer' })
            .field({
            parent_id: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/get_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
        // parent_id:1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/get_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            parentid: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Get Data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/get_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            parent_id: 10
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Update Curriculam Parent Category Test Module', () => {
    let field = {
        test_id: 1,
        prefix: 'mod 1',
        title: 'Module Super',
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/update_curriculum_parent_category_test')
            .auth(token1, { type: 'bearer' })
            .field({
            test_id: 1,
            prefix: 'mod 1',
            title: 'Module Super',
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/update_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            // test_id: 1,
            prefix: 'mod 1',
            title: 'Module Super',
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/update_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            testid: 1,
            prefix: 'mod 1',
            title: 'Module Super',
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Update Data with empty-data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/update_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            test_id: '',
            prefix: 'mod 1',
            title: 'Module Super',
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Update Data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/update_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            test_id: 1,
            prefix: 'mod 1',
            title: 'Module Super',
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Delete Curriculam Parent Category Test Module', () => {
    let field = {
        test_id: 1
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/delete_curriculum_parent_category_test')
            .auth(token1, { type: 'bearer' })
            .field({
            test_id: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/delete_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
        // test_id: 1
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/delete_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            testid: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Update Data with empty-data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/delete_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            test_id: ''
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Update Data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/delete_curriculum_parent_category_test')
            .auth(token, { type: 'bearer' })
            .field({
            test_id: 1
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Get Company Curriculam Test Module', () => {
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyCurriculum')
            .auth(token1, { type: 'bearer' })
            .field({
            company_id: 13
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyCurriculum')
            .auth(token, { type: 'bearer' })
            .field({
        // company_id: "13" 
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyCurriculum')
            .auth(token, { type: 'bearer' })
            .field({
            companyid: 13
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Get Data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getCompanyCurriculum')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 13
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
describe('Build Company Curriculam Test Module', () => {
    let CurriculamArray = [
        {
            "cp_id": "1",
            "cptest_id": "1",
            "created_by": "1",
            "updated_by": "1"
        },
        {
            "cp_id": "1",
            "cptest_id": "2",
            "created_by": "1",
            "updated_by": "1"
        }
    ];
    let field = {
        company_id: 19,
        name: 'Test Curriculum 2',
        curriculum: JSON.stringify(CurriculamArray),
    };
    it('Testing Auth', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/update_curriculum_parent_category_test')
            .auth(token1, { type: 'bearer' })
            .field({
            company_id: 19,
            name: 'Test Curriculum 2',
            curriculum: JSON.stringify(CurriculamArray),
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('Testing Missing Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/buildCurriculum')
            .auth(token, { type: 'bearer' })
            .field({
            // company_id: 19,
            name: 'Test Curriculum 2',
            curriculum: JSON.stringify(CurriculamArray),
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Wrong Params', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/buildCurriculum')
            .auth(token, { type: 'bearer' })
            .field({
            companyid: 19,
            name: 'Test Curriculum 2',
            curriculum: JSON.stringify(CurriculamArray),
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Add Data with empty-data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/buildCurriculum')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 19,
            name: '',
            curriculum: JSON.stringify(CurriculamArray),
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
    it('Testing Add Existing Data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/buildCurriculum')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 19,
            name: 'Test Curriculum 2',
            curriculum: JSON.stringify(CurriculamArray),
        })
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.CREATED);
            done();
        });
    });
    it('Testing Add Data', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/buildCurriculum')
            .auth(token, { type: 'bearer' })
            .field({
            company_id: 19,
            name: 'Test Curriculum 11',
            curriculum: JSON.stringify(CurriculamArray),
        })
            .end((err, res) => {
            // console.log(res);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
});
