"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
//import  { expect }  from 'chai';
const chaiHttp = require("chai-http");
const app_1 = __importDefault(require("../app"));
const { expect } = chai_1.default;
chai_1.default.should();
chai_1.default.use(chaiHttp);
describe('Check Authentication Test', () => {
    it('Login API', (done) => {
        let user = {
            username: "super@gmail.com",
            password: "123"
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/authentication')
            .field({
            username: "super@tecknotrove.com",
            password: "123"
        })
            .end((err, res) => {
            //if(err)done(err);
            expect(res).to.have.status(200);
            done();
        });
    });
    it('Login API Parameter missing test', (done) => {
        let user = {
            username: "super@gmail.com",
        };
        chai_1.default.request(app_1.default)
            .post('/TMS/authentication')
            .field(user)
            .end((err, res) => {
            //if(err)done(err);
            expect(res).to.have.status(400);
            done();
        });
    });
});
