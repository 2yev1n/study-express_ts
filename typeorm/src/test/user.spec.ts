import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const exprect = chai.expect;
chai.use(chaiHttp);

describe("User spec Test", () => {
    it("POST user/signup (409)", (done) => {
        chai    
            .request(app)
            .post("/user")
            .send({
                name: "이름",
                email: "이메일",
                password: "비밀번호",
            })
            .end((err, res) => {
                expect(res).to.have.status(409);
                done();
            });
    });
})