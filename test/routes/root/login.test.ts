import chai from "chai";
import chaiHttp = require("chai-http");
import app from "../../../app";
import responseCodes from "../../../src/strings/response-codes";

const {expect} = chai;
chai.should();
chai.use(chaiHttp);

describe('Login Api Test Module', () => {

    it('testing Login Sucessfull', (done) => {
        let user = {
            username: "super@tecknotrove.com",
            password: "123"
        }
        chai.request(app)
            .post('/TMS/authentication')
            .field(user)
            .end((err, res) => {
                //if(err)done(err);
                expect(res).to.have.status(responseCodes.SUCCESS);
                done();
            });
    });

    it('testing Login with wrong crendiantials', (done) => {
        let user = {
            username: "super@gmail.com",
            password: "123"
        }
        chai.request(app)
            .post('/TMS/authentication')
            .field(user)
            .end((err, res) => {
                //if(err)done(err);
                expect(res).to.have.status(responseCodes.UNAUTHORIZED);
                done();
            });
    });

    it('testing Login with missing parameter',(done)=>{
        
        let user={
            
        };

        chai.request(app)
        .post('/TMS/authentication')
        .field(user)
        .end((err,res)=>{
            expect(res).to.have.status(responseCodes.BAD_REQUEST);
            done();
        });
    })
});

