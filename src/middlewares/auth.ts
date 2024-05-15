import { NextFunction, Response } from "express";
import * as jwt from "./../lib/jwt";
import { ACCESS_SECRET, REFRESH_SECRET } from "./../config/secret";
import { getSession } from "./../data/database";
import { Secret } from "jsonwebtoken";

const verifyToken = async (token: string, secret: Secret) => {
  return await jwt.verify(token, secret);
}

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  try {
    // Valid access token
    console.log("Valid Access Token - yes")
    const decoded = await jwt.verify(accessToken, ACCESS_SECRET);

    req.user = decoded;

    return next();
  } catch (err) {
    // Valid but expired token
    if (err.name == "TokenExpiredError") {
      console.log("Valid but expired token - yes")
      if (!refreshToken) {
        return next();
      }

      try {
        // Valid refresh token and not expired
        console.log("Valid refresh token and not expired")
        const refreshPayload = await jwt.verify(refreshToken, REFRESH_SECRET);

        // @ts-ignore
        const session = getSession(refreshPayload.sessionId);

        if (!session) {
          return next();
        }

        // @ts-ignore
        const newAccessToken = await jwt.sign(
          { id: session.id, role: session.role, sessionId: session.sessionId },
          ACCESS_SECRET,
          { expiresIn: "2m" }
        );

        res.cookie("accessToken", newAccessToken, {
          maxAge: 2 * 60 * 100,
          httpOnly: true,
        });

        // @ts-ignore
        const newDecoded = await jwt.verify(newAccessToken, ACCESS_SECRET);

        req.user = newDecoded;

        return next();
      } catch (err) {
        console.log(err.message, " REFRESH");
        return next();
      }
    }
    return next();
  }
};

export const isAuth = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      status: "fail",
      data: {
        error: "You must login!",
      },
    });
  }

  next();
};

export const isCoach = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== "coach") {
    return res.status(401).json({
      status: "fail",
      data: {
        error: "You are unauthorized for this action - not a coach!",
      },
    });
  }

  next();
};
