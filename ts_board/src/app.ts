import express from "express";
import { sequelize } from "./config/config";
import morgan from "morgan";    // 웹 서버에 들어오는 요청을 shell에 출력해주는 패키지
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

sequelize.sync({ force: false })
  .then(() => {
    console.log("database 연결 & table 생성 완료");
  })
  .catch((err) => {
    console.error(err);
  });