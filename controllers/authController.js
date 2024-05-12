const router = require("express").Router();

const authService = require("./../services/authService");

router.post("/login", async (req, res) => {
    await authService.loginUser(req.body);

    res.send("Login");
});

module.exports = router;