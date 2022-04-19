import { Sequelize } from "sequelize";
import config from "../config/database";
import User from "./user";
import Board from "./board";

const db = {};

const sequelize = new Sequelize(
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

export default sequelize;