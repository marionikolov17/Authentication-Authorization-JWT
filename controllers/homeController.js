const router = require("express").Router();

router.get("/test", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "You are logged in."
        }
    });
});

router.get("/coach", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "You are logged in and you are authorized as coach to view this."
        }
    });
});

module.exports = router;