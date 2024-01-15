import express, { Express, Request, Response } from "express";
const port = 8080;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO FROM EXPRESS + TS with ES2020!");
});

app.get("/hi", (req: Request, res: Response) => {
  res.send("BYEEE!");
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
