import express from "express";

const router = express.Router();

import * as authService from "./../services/authService";
import { invalidateSession } from "./../data/database";

router.post("/login", async (req: express.Request, res: express.Response) => {
    try {
        const [accessToken, refreshToken, session] = await authService.loginUser(req.body);

        res.cookie("accessToken", accessToken, {
            maxAge: 2 * 60 * 100,
            httpOnly: true
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 10 * 60 * 100
        });
        res.status(200).json({
            status: "success",
            data: {
                session
            }
        });
    } catch (err: any) {
        res.status(400).json({
            status: "fail",
            data: {
                error: err.message
            }
        })
    }
});

router.get("/logout", (req: express.Request, res: express.Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    
    // @ts-ignore
    invalidateSession(req.user.sessionId);
    res.status(200).json({
        status: "success",
        data: {
            message: "You are logged out."
        }
    })
});

export default router;