"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_http_1 = __importDefault(require("chai-http"));
const chai_1 = __importDefault(require("chai"));
const app_1 = __importDefault(require("../../../app"));
const response_codes_1 = __importDefault(require("../../../src/core/strings/response-codes"));
process.env.NODE_ENV = 'test';
const { expect } = chai_1.default;
const path = require('path');
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyIGFkbW9uIiwiaWF0IjoxNjQ0MzgyMTczLCJleHAiOjE2NDQ1NTQ5NzN9.p4kwM2QazN-X5MFCUJEOwPMNL0HzJhg4FM3TGorrGxo";
describe('Elearning Master Add E-Learning Test Link', () => {
    it('testing with no token', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/elearning/addElearningTestLink')
            .end((err, res) => {
            //console.log(res);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('should check test add successfully', (done) => {
        var data = {
            test_id: 4
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/elearning/addElearningTestLink')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('testfile', "./resources/test/test.zip")
            .end((err, res) => {
            try {
                expect(res).to.have.status(response_codes_1.default.SUCCESS);
                done();
            }
            catch (err) {
                console.log(err);
            }
        });
    });
    it('should check test already exist', (done) => {
        var data = {
            test_id: 4
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/elearning/addElearningTestLink')
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .field(data)
            .attach('testfile', "./resources/test/test.zip")
            .end((err, res) => {
            try {
                expect(res).to.have.status(response_codes_1.default.CREATED);
                done();
            }
            catch (err) {
                console.log(err);
            }
        });
    });
    it('should check test fetched successfully', (done) => {
    });
});
