import express from "express";

const router = express.Router();

import * as authService from "./../services/authService";

router.post("/login", async (req: express.Request, res: express.Response) => {
    try {
        const token = await authService.loginUser(req.body);

        res.cookie("auth", token);
        res.status(200).json({
            status: "success",
            data: {
                token
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            data: {
                error: err.message
            }
        })
    }
});

router.get("/logout", (req: express.Request, res: express.Response) => {
    res.clearCookie("auth");
    res.status(200).json({
        status: "success",
        data: {
            message: "You are logged out."
        }
    })
});

export default router;