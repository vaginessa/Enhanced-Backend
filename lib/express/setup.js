const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const API = require('../api');

function initializeLocals(app) {
  app.locals.api = new API(app);
}

module.exports = app => {
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'html');
  initializeLocals(app);

  app.set('json spaces', 2);

  // app.use(favicon(__dirname + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  // app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', routes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.log(err.stack)
    res
      .status(err.status || 500)
      .json({
        message: err.message,
        error: (app.get('env') === 'development') ? err : {},
      });
  });
};
