import { User } from "../../models/user";

export const findOneEmail = async (email :string): Promise<User> => {
    try{
        const user: any = await User.findOne({
            where: {
                email
            }
        });
        return user;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

export const create = async(
    name: string, 
    email:string,
    password: string,
) => {
    await User.create({ name, email, password });
};