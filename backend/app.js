const express = require('express')
const bodyParser = require('body-parser')
const  mongoose = require('mongoose');
const connectFlash = require("connect-flash");
const User = require('./models/user')
const path = require('path')
var session = require('express-session');

var MongoDBStore = require('connect-mongodb-session')(session);
const app = express()


// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(connectFlash())
app.use(express.static(path.join(__dirname, 'public')));











//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/tasty_cuisine';
mongoose.connect(mongoDB, { useNewUrlParser: true });
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1/tasty_cuisine',
    collection: 'mySessions'
  });
  
  // Catch errors
  store.on('error', function(error) {
    console.log(error);
  });
  
  app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
  }));
  
//routes setups
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(3000, ()=>{
    console.log('server is ruinning on port 3000')
})