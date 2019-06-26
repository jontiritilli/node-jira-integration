const express = require('express');
const pug = require('pug');
const path = require('path');
const router = express.Router();
const indexRouter = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 3359;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
})