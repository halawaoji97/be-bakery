var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const shortid = require('shortid');

const session = require('express-session');
const flash = require('connect-flash');

// import mongoose
const URI =
  'mongodb+srv://halawa_oji:javascript123@cluster0.fa9gv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose.connect(URI, options);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
// flash
app.use(flash());
app.use(cors());
app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// USE ADMIN LTE
app.use(
  '/adminlte',
  express.static(path.join(__dirname, '/node_modules/admin-lte'))
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// ROUTES
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/api/v1/member', apiRouter);

const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      fullName: String,
      orderOn: String,
      deliveryOn: String,
      addressNote: String,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          cartQty: Number,
        },
      ],
      cartTotalQty: Number,
      cartTotalAmount: Number,
      // phoneNumber: String,
      // bankFrom: String,
      // accountHolder: String,
      // street: String,
      // city: String,
      // country: String,
      // zipCode: String,
      // status: String,
    },
    {
      timestamps: true,
    }
  )
);

app.post('/api/orders', async (req, res) => {
  if (
    req.body.fullName === undefined ||
    req.body.email === undefined ||
    req.body.addressNote === undefined ||
    req.body.cartItems === undefined ||
    req.body.deliveryOn === undefined ||
    req.body.orderOn === undefined ||
    req.body.cartTotalAmount === undefined ||
    req.body.cartTotalQty === undefined
  ) {
    return res.status(404).json({ message: 'Data is required.' });
  }
  const order = await Order(req.body).save();
  return res.send(order);
});

app.get('/api/orders', async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});

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
