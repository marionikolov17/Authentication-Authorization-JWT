const express = require("express");

// Config imports
const expressConfig = require("./config/expressConfig");

const app = express();

// Express config
expressConfig();

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});