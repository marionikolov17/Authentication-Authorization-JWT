import { Secret } from "jsonwebtoken";
import * as jwt from "./../lib/jwt";
import {ACCESS_SECRET, REFRESH_SECRET} from "./../config/secret";

import { User } from "./../types/user";

import { db, createSession } from "./../data/database";

interface LoginData {
    username: String,
    password: String
}

const generateAccessToken = async (user: User, sessionId: string, secret: Secret, expiresIn: string) => {
    const payload = {
        id: user.id,
        role: user.role,
        sessionId
    };

    const token = await jwt.sign(payload, secret, { expiresIn });
    return token;
}

const generateRefreshToken = async (sessionId: string, secret: Secret, expiresIn: string) => {
    const payload = {
        sessionId
    };

    const token = await jwt.sign(payload, secret, { expiresIn });
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

    const session = createSession(user.id, user.role);

    const accessToken = await generateAccessToken(user, session.sessionId, ACCESS_SECRET, "2m");
    const refreshToken = await generateRefreshToken(session.sessionId, REFRESH_SECRET, "10m");
    return [accessToken, refreshToken, session];
}
