import { Board } from "../models/board";

console.log("=====create board table=====");

const create_table_board = async() => {
    await Board.sync({ force : true })
    .then(() => {
        console.log("success create board table");
    })
    .catch((err) => {
        console.log("error in create board table : ", err);
    })
}

create_table_board();