const dotenv = require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const { json, urlencoded, static: staticPath } = require('express');
// const { join } = require('path');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/user');
const reviewRouter = require('./routes/review');
const reviewsRouter = require('./routes/reviews');

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(cookieParser());

// app.use(staticPath(join(__dirname, 'public')));

app.use('/api/users', userRouter);
app.use('/api/review', reviewRouter);
app.use('/api', reviewsRouter);

app.use(express.static(path.join(__dirname, "..", "client", "build")));

// catch 404 and forward to error handler
/* app.use((req, res, next) => {
  next(createError(404));
}); */

// error handler
/* app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

module.exports = app;
