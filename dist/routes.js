"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = __importDefault(require("./controllers/authController"));
const homeController_1 = __importDefault(require("./controllers/homeController"));
router.use("/auth", authController_1.default);
router.use("/home", homeController_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map