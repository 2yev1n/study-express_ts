import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";    // 웹 서버에 들어오는 요청을 shell에 출력해주는 패키지
import * as dotenv from "dotenv";
import path from "path";
import { createConnection } from "typeorm";
import router from "./routes/index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

dotenv.config({ path: path.join(__dirname, "../../.env") });

app.use("/", router);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello, world!")
}); 

app.listen(PORT, () => {
  console.log(PORT, "번 포트에서 대기 중");

  createConnection()
    .then(() => {
      console.log("데이터베이스 연결 성공");
    })
    .catch((err) => console.error(err));

});