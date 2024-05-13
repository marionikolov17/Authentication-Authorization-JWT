const router = require("express").Router();

const { isAuth, isCoach } = require("./../middlewares/auth");

router.get("/test", isAuth, (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "You are logged in."
        }
    });
});

router.get("/coach", isAuth, isCoach, (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "You are logged in and you are authorized as coach to view this."
        }
    });
});

module.exports = router;