import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const config = {
    database: {
        username: process.env.USERNAME || "root",
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE || "ts_board",
        host: process.env.HOST || "localhost",
        port: process.env.PORT || 3306
    },
};

export const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        dialect: "mysql"
    }
);