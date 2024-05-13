import * as jwt from "./../lib/jwt";
import SECRET from "./../config/secret";

export const authMiddleware = async (req: any, res: any, next: any) => {
    const token = req.cookies.auth;

    if (!token) {
        return next();
    }

    try {
        const decoded = await jwt.verify(token, SECRET);

        req.user = decoded;

        next();
    } catch {
        next();
    }
}

export const isAuth = (req: any, res: any, next: any) => {
    if (!req.user) {
        return res.status(401).json({
            status: "fail",
            data: {
                error: "You must login!"
            }
        });
    }

    next();
}

export const isCoach = (req: any, res: any, next: any) => {
    if (req.user.role !== "coach") {
        return res.status(401).json({
            status: "fail",
            data: {
                error: "You are unauthorized for this action - not a coach!"
            }
        });
    }

    next();
}

