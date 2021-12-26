const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const flash = require('express-flash');
require('dotenv').config();
const initializePassport = require('./utilities/passport-config');
const PORT = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI;

const routes = require('./routes');
//db connect
mongoose
    .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Database Connected');
    })
    .catch(console.log);

//middleware
initializePassport(passport);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash())
app.use(express.json());
app.use(
    expressSession({
        saveUninitialized: true,
        resave: true,
        secret: process.env.SESSION_SECRET,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/', routes);
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
