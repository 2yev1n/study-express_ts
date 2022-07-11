import Sequelize, { Model } from "sequelize";
import { sequelize } from "../config/config";
import { Post } from "./post";

export class User extends Model {
    public readonly id!: number; 
    name!: string;
    email!: string;
    password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(30),
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true
    }
);

User.hasMany(Post, { foreignKey: "writer", sourceKey: "id"});
Post.belongsTo(User, { foreignKey: "writer", targetKey: "id"});