import chai from "chai";
//import  { expect }  from 'chai';
import chaiHttp = require("chai-http");
import root_route from "../src/routes/root/root_routes" ;
import app from '../app';

const {expect} = chai;
chai.should();
chai.use(chaiHttp);

describe('Check Authentication Test', () => {
    it('Login API', (done) => {
        let user = {
            username: "super@gmail.com",
            password: "123"
        }
        chai.request(app)
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
});

