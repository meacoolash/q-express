import express, { Express, Request, Response } from "express";
import router from './routes/root';

const app: Express = express();
import path from "path";
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/public')));
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



app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
