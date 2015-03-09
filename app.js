var config = require('./config'),
	express = require('express'),
	path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
	session = require('express-session'),
	mongoStore = require('connect-mongo')(session),
	mongoose = require('mongoose'),
    http = require('http'),
	app = express();

app.server = http.createServer(app);

app.config = config;

if (config.isMongoEnabled === true) {
	console.log('connecting mongodb');
	app.db = mongoose.createConnection(config.mongodb.uri);
	app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
	app.db.once('open', function() {
	});
	require('./models')(app, mongoose);
	app.use(session({
		resave: true,
		saveUninitialized: true,
		secret: config.cryptoKey,
		store: new mongoStore({ url: config.mongodb.uri })
	}));
}




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.utility = {};
app.utility.workflow = require('./util/workflow');

app.server.listen(app.config.port, function(){
	console.log('Listening on ' + app.config.port);
});
