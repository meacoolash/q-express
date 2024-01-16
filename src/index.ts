import express, { Express, Request, Response } from "express";
import path from 'path';
import rootRouter from './routes/rootRouter';
import userRouter from "./routes/userRouter";
import contactRouter from "./routes/contactRouter";
import { logger, logEvents } from './middleware/logger';
import errorHandler from "./middleware/errorHandler";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from "./config/corsOptions";
import connectDB from "./config/dbConn";
import mongoose from "mongoose";
import dotenv from 'dotenv'; 
const app: Express = express();
const port = process.env.PORT || 8080;
dotenv.config()

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/contacts', contactRouter);

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

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
})

mongoose.connection.on('error', (err) => {
  console.error(err);
  logEvents(err, 'mongoError.log')
})


