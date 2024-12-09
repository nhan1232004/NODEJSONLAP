require('dotenv').config(); // Đảm bảo rằng bạn đã cấu hình dotenv để tải biến môi trường

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const MongoStore = require('connect-mongo');
const config = require('./config');

// Cấu hình mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopping', config.database.option);

// Cấu hình express
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session config
app.use(
    session({
        secret: process.env.SESSION_KEY || 'your-session-secret',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/shopping' })
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/user'));
app.use('/admin', require('./routes/admin'));
app.use('/admin/category', require('./routes/admin-category'));
app.use('/admin/order', require('./routes/admin-order'));
app.use('/admin/product', require('./routes/admin-product'));
app.use('/admin/user', require('./routes/admin-user'));

// Catch 404 and error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// Start server
app.listen(config.app.port, () => {
    console.log(`Server running on port ${config.app.port}`);
});