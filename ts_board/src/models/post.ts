import Sequelize, { Model } from "sequelize";
import { sequelize } from "../config/config";

export class Post extends Model {
    public readonly id!: number;
    title!: string;
    content!: string;
    image!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Post.init(
    {
        title: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: "Post",
        tableName: "posts",
        timestamps: true,
        charset: "UTF8MB4",
        collate: "UTF8MB4_GENERAL_CI"
    }
);