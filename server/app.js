const express = require('express') 
const path = require('path');
const logger = require('morgan');
const http = require('http');
 
const app = express();
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
app.use(express.static(path.join(__dirname, '../client')));
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.dir(req);
  console.dir(res);
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
  console.log(error)
});
 
// HTTP server
http.createServer(app).listen(8080);