import { doesNotMatch } from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import { disconnect } from "process";
import app from "../app";

const expect = chai.expect;
chai.use(chaiHttp);

let token: string;

describe("Post spec Test", () => {
    before((done) => {
        chai
            .request(app)
            .post("/user/login")
            .send({
                email: "이메일",
                password: "비밀번호"
            })
            .end((err, res) => {
                token = res.body.accessToken;
                done();
            });
    });
    it("POST post/ (200)", (done) => {
        chai
            .request(app)
            .post("/post")
            .set("access-token", token)
            .send({
                title: "제목",
                content: "내용"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it("GET post/mypage (200)", (done) => {
        chai
            .request(app)
            .get("/post/mypage")
            .set("access-token", token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("GET post/ (200)", (done) => {
        chai
            .request(app)
            .get("/post")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("DELETE post/1 (403)", (done) => {
        chai
            .request(app)
            .delete("/post/1")
            .set("access-token", token)
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
            });
    });
});