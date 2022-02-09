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
describe('Login Api Test Module', () => {
    it('testing Login Sucessfull', (done) => {
        let user = {
            username: "super@tecknotrove.com",
            password: "123"
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/authentication')
            .field(user)
            .end((err, res) => {
            //if(err)done(err);
            expect(res).to.have.status(response_codes_1.default.SUCCESS);
            done();
        });
    });
    it('testing Login with wrong crendiantials', (done) => {
        let user = {
            username: "super@gmail.com",
            password: "123"
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/authentication')
            .field(user)
            .end((err, res) => {
            //if(err)done(err);
            expect(res).to.have.status(response_codes_1.default.UNAUTHORIZED);
            done();
        });
    });
    it('testing Login with missing parameter', (done) => {
        let user = {};
        chai_1.default.request(app_1.default)
            .post('/TMS/authentication')
            .field(user)
            .end((err, res) => {
            expect(res).to.have.status(response_codes_1.default.BAD_REQUEST);
            done();
        });
    });
});
