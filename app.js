const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
var cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

// Passport Config
require('./config/passport');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// // Static files
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors({
//   origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
//   credentials: true,
//   samesite
// }))

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authentication"
  );
  next();
});

// DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));

// //EJS
// app.use(expressLayouts);
// app.set('view engine', 'ejs');

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Bodyparser
// app.use(express.urlencoded({extended: false}));

// Express session
app.use(session({
  name: 'myname.sid',
  resave: false,
  saveUninitialized: false,
  secret: 'derma-aid',
  cookie: {
    maxAge: 36000000,
    httpOnly: false,
    secure: false,
    sameSite: 'None'
  }
}));
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 3000;


app.listen(PORT, console.log(`Server is started on ${PORT}`));
