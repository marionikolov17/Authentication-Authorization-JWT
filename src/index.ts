import express from "express";

//TEST
import User from "./database/models/users";

// Config imports
import expressConfig from "./config/expressConfig";

// Auth middlewares import
import { authMiddleware } from "./middlewares/auth";

// Router import
import router from "./routes";

const app = express();

// Express config
expressConfig(app);

app.get("/test", async (req: any, res: any) => {
    try {
        await User.create({ name: "ok", email: "ok" });
        return res.send("Success");
    } catch (err) {
        return res.send("error");
    }
})

// Auth middleware - first middleware
app.use(authMiddleware);

// App router
app.use(router);



const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});