import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class User extends Model {
    name!: string;
    password!:string;
    email!: string;
    accessToken!: string;
}

User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(5),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        accessToken: {
            type: Sequelize.STRING,
        },
    },
    {
        sequelize,
        timestamps: true,
        tableName: "Users",
        modelName: "users",
        charset: "UTF8",
        collate: "UTF8_GENERAL_CI"
    }
)