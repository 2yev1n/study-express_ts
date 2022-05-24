const express = require("express");
const bodyParser = require("body-parser");   // requset, req.body를 파싱하는 미들웨어
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./app/mongodb/routes/route.ts"));

db = require("./app/mongodb/models/index");
    db.mongoose
        .connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, 
            useFindAndModify: false,
        }).then(() => {
            console.log('MongoDB 연결')})
        .catch((err) => {
            console.error(err);
        });


app.get("/", (req, res) => {
    res.json({ message: PORT + "번 포트에서 대기 중" });
});

app.listen(PORT, () => {
    console.log(PORT, '번 포트에서 대기 중');
});