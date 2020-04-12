const express = require('express') 
const path = require('path');
const logger = require('morgan');
const http = require('http');
const cors = require('cors')
const session = require('express-session')
const app = express();
const passport = require('passport')
require('dotenv').config()

// require routes
let indexRouter = require('./routes/index');
// require passport config file
require('./config/passportConfig')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// add headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(session(
  {
      secret: 'my-playlist',
      resave: true,
      saveUninitialized: true
  }
))
app.use(express.static(path.join(__dirname, '../client')));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  console.log(err)
});
 
// HTTP server
http.createServer(app).listen(process.env.PORT || 8080);