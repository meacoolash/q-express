import express, { Express, Request, Response } from "express";
import router from './routes/root';
import path from 'path';
import { logger } from './middleware/logger';
import errorHandler from "./middleware/errorHandler";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from "./config/corsOptions";

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.all('*', (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: 'Not found JSON' });
  } else {
    res.type('txt').send('Not found TXT');
  }
});


app.use(errorHandler);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
