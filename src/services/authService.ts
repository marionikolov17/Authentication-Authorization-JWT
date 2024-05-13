import * as jwt from "./../lib/jwt";
import SECRET from "./../config/secret";

import db from "./../data/database";

const generateToken = async (user: any) => {
    const payload = {
        id: user.id,
        role: user.role
    };

    const token = await jwt.sign(payload, SECRET);
    return token;
}

export const loginUser = async (data: any) => {
    const user = db.find((obj) => obj.username === data.username);

    if (!user) {
        throw new Error("Username or password are incorrect!");
    }

    const isValidPassword = user.password === data.password;

    if (!isValidPassword) {
        throw new Error("Username or password are incorrect!");
    }

    const token = await generateToken(user);
    return token;
}
