import express from "express";

const router = express.Router();

import { isAuth, isCoach } from "./../middlewares/auth";

router.get("/test", isAuth, (req: express.Request, res: express.Response) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "You are logged in."
        }
    });
});

router.get("/coach", isAuth, isCoach, (req: express.Request, res: express.Response) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "You are logged in and you are authorized as coach to view this."
        }
    });
});

export default router;