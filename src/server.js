import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
// import connection from "./configs/connectDB";

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set up ViewEngine
configViewEngine(app);
//  Init Web Rout
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
