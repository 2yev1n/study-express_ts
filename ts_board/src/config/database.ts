import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname + "../../../.env") });

const Config = {
    test_module: false,
    database: {
        host: process.env.HOST || "",
        port : 3306,
        username: process.env.USERNAME || "",
        password: process.env.PASSWORD || "",
        database: process.env.DATABASE || ""
    }
};

export default Config;