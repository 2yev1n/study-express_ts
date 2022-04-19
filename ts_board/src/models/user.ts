import sequelize from "./index";
import Sequelize, { Model } from "sequelize";
import { Board } from "./board";

export class User extends Model{
    readonly id!: number;
    name!: string;
    password!: string;
    email!: string;
    accessToken!: string;
 }

User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(5),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
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
);

User.hasMany(Board, { foreignKey: "writer", sourceKey: "id" });
Board.belongsTo(User, { foreignKey: "wirter" });

export default User; 