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
    
});

module.exports = router;