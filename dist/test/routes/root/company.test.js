"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
//import  { expect }  from 'chai';
const chaiHttp = require("chai-http");
const app_1 = __importDefault(require("../../../app"));
const { expect } = chai_1.default;
chai_1.default.should();
chai_1.default.use(chaiHttp);
describe('Company Management Apis', () => {
    it('Total Company Count', (done) => {
        chai_1.default.request(app_1.default)
            .post('/TMS/getRegisterCompany')
            .end((err, res) => {
            expect(res).to.have.status(401);
            done();
        });
    });
});
