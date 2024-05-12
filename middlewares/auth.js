const jwt = require("./../lib/jwt");
const SECRET = require("./../config/secret");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies["auth"];

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

const isAuth = (req, res, next) => {
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

const isCoach = (req, res, next) => {
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

module.exports = {
    authMiddleware,
    isAuth,
    isCoach
}