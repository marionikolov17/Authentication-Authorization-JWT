const express = require("express");

// Config imports
const expressConfig = require("./config/expressConfig");

// Auth middlewares import
const { authMiddleware } = require("./middlewares/auth");

// Router import
const router = require("./routes");

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