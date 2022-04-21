import { Sequelize, DataTypes, ForeignKey, Model } from "sequelize";

export class Board extends Model {
    id!: number;
    title!: string;
    content!: Text;
    writer!: ForeignKey<number>;
}

export default function(sequelize: Sequelize) : typeof Board {
    Board.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
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
    
    return Board;
};