import { sequelize } from "../config/config";
import { Sequelize, DataTypes, Model } from "sequelize";
import { Board } from "./board";

// export interface User {
//     id: number;
//     name: string;
//     password: string;
//     email: string;
// }

// type UserCreateInterface = Pick<User, 'id'>;

export class User extends Model{
    id!: number;
    name!: string;
    password!: string;
    email!: string;
}

export default function(sequelize: Sequelize) : typeof User {
    User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        tableName: "Users",
        modelName: "users",
        charset: "UTF8",
        collate: "UTF8_GENERAL_CI"
    }
    );
    return User;
}

