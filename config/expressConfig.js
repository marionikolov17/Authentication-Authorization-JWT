const cookieParser = require("cookie-parser");

function expressConfig(app) {
    app.use(cookieParser());
    return app;
}

module.exports = expressConfig;