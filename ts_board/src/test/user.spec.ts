import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const expect = chai.expect;
chai.use(chaiHttp);

describe("User spec Test", () => {
    it("POST user/ (409)", (done) => {
        chai
            .request(app)
            .post('/user')
            .send({
                name: "이름",
                email: "이메일",
                password: "비밀번호"
            })
            .end((err, res) => {
                expect(res).to.have.status(409);
                done();
            });
    });

    it("POST user/login (200)", (done) => {
        chai
            .request(app)
            .post('/user/login')
            .send({
                email: "이메일",
                password: "비밀번호"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("POST user/login (401)", (done) => {
        chai
            .request(app)
            .post('/user/login')
            .send({
                email: "이메일",
                password: "비밀번호틀렸다"
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it("POST user/login (404)", (done) => {
        chai
            .request(app)
            .post('/user/login')
            .send({
                email: "이메일틀렸따",
                password: "비밀번호"
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
})