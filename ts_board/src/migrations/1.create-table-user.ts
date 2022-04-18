import { User } from "../models/user";

console.log("=====create user table=====");

const create_table_user = async() => {
    await User.sync({ force : true })
    .then(() => {
        console.log("success create user table");
    })
    .catch((err) => {
        console.log("error in create user table : ", err);
    })
}

create_table_user();