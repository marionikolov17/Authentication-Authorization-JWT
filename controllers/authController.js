const router = require("express").Router();

const authService = require("./../services/authService");

router.post("/login", async (req, res) => {
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

module.exports = router;