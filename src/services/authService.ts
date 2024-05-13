import * as jwt from "./../lib/jwt";
import {ACCESS_SECRET, REFRESH_SECRET} from "./../config/secret";

import { User } from "./../types/user";

import db from "./../data/database";

interface LoginData {
    username: String,
    password: String
}

const generateToken = async (user: User) => {
    const payload = {
        id: user.id,
        role: user.role
    };

    const token = await jwt.sign(payload, ACCESS_SECRET);
    return token;
}

export const loginUser = async (data: LoginData) => {
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
