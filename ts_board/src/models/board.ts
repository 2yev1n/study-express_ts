import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Board extends Model {
    readonly id!: number;
    title!: string;
    content!: Text;
}

Board.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        tableName: "Boards",
        modelName: "boards",
        charset: "UTF8MB4",
        collate: "UTF8MB4_GENERAL_CI"
    }
);
