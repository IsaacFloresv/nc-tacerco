const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const eventRouter = require('./routes/events.router');
const userEventRouter = require('./routes/userEvent.router');
const userPreferenceRouter = require('./routes/userPreference.router');
const locationRouter = require('./routes/LocationRoutes');
const usersRouter = require('./routes/UsersRoutes');
const loginRouter = require('./routes/LoginRoutes');
const categoryRouter = require('./routes/category.router');

const app = express();
// const rooturl = 'api/v1'

// CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/userevent', userEventRouter);
app.use('/api/v1/userpreference', userPreferenceRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/location', locationRouter);
app.use('/api/v1/category', categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render('error');
});

module.exports = app;
