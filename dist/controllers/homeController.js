"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("./../middlewares/auth");
router.get("/test", auth_1.isAuth, (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "You are logged in."
        }
    });
});
router.get("/coach", auth_1.isAuth, auth_1.isCoach, (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "You are logged in and you are authorized as coach to view this."
        }
    });
});
exports.default = router;
//# sourceMappingURL=homeController.js.map