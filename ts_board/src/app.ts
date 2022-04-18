import express, { Request, Response, NextFunction } from "express";
import  sequelize from "./models";
import morgan from "morgan";    // 웹 서버에 들어오는 요청을 shell에 출력해주는 패키지
import * as dotenv from "dotenv";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({ path: path.join(__dirname, "../../.env") });

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello, world!")
})

sequelize.sync({ force: false })
  .then(() => {
    console.log("database 연결 & table 생성 완료");
  })
  .catch((err) => {
    console.error(err);
  });

  app.listen(PORT, () => {
      console.log(PORT, "번 포트에서 대기 중");
  });