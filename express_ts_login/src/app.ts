import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import morgan from "morgan"
import * as dotenv from "dotenv";
import path from 'path';
import { User } from './models/user';
import router from "./routes";

const app = express();
const PORT = process.env.PORT||3000;

dotenv.config({ path: path.join(__dirname, "../env") });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("jwt-secret", process.env.JWT_KEY);

app.use("/", router);

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
    res.send('welcome!');
});

User.sync({ force: false })
  .then(() => {
    console.log("database 연결 & table 생성 완료");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(PORT, "번 포트에서 대기 중");
});