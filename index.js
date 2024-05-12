const express = require("express");

// Config imports
const expressConfig = require("./config/expressConfig");

// Router import
const router = require("./routes");

const app = express();

// Express config
expressConfig(app);

// App router 
app.use(router);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});