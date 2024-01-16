import path from "path";
import { Router } from "express";
const rootRouter = Router();

rootRouter.get('^/$|index(.html)', (req, res) => {
    res.sendFile(path.join(__dirname, "../../src/views/index.html"));
});

export default rootRouter;

