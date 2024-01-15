import { Express } from "express";
import path from "path";
import { Router } from "express";

const router = Router();

router.get('^/$|index(.html)', (req, res) => {
    res.sendFile(path.join(__dirname, "../../src/views/index.html"));
});

export default router;

