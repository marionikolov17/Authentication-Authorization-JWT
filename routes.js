const router = require("express").Router();

const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");

router.use("/auth", authController);
router.use("/home", homeController);

module.exports = router;