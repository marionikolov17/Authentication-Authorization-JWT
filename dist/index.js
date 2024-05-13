"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Config imports
const expressConfig_1 = __importDefault(require("./config/expressConfig"));
// Auth middlewares import
const auth_1 = require("./middlewares/auth");
// Router import
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Express config
(0, expressConfig_1.default)(app);
// Auth middleware - first middleware
app.use(auth_1.authMiddleware);
// App router
app.use(routes_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map