import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
import morgan from 'morgan';
// import connection from "./configs/connectDB";

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log('>>>>>check method:');
  console.log(req.method);
  next();
});
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set up ViewEngine
configViewEngine(app);
//  Init Web Rout
initWebRoute(app);
//  Init API Rout
initAPIRoute(app);

// handle 404 not found
app.use((req, res) => {
  return res.render('404.ejs');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
