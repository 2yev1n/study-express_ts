import { Sequelize } from "sequelize";
import config from "./index";

export const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        dialect: "mysql",
        define: {
            timestamps: true,
        },
        timezone: "+09:00",
        pool: {
            max: 5,
            min: 0,
            acquire: 3000,
            idle: 10000
        }
    }
);