import express from "express";

// Config imports
import expressConfig from "./config/expressConfig";

// Auth middlewares import
import { authMiddleware } from "./middlewares/auth";

// Router import
import router from "./routes";

const app = express();

// Express config
expressConfig(app);

// Auth middleware - first middleware
app.use(authMiddleware);

// App router
app.use(router);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});