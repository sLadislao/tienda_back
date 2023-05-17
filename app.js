'use strict'

const express = require('express');
const app = express();
const bodyPareser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 4201;

const cliente_route = require('./routes/cliente');
const admin_route = require('./routes/admin');
mongoose.connect('mongodb://127.0.0.1:27017/tienda', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => {
    app.listen(port, function() {
      console.log(`Running server on port ${port}`);
    })
  })
  .catch(err => console.log(err))

app.use(bodyPareser.urlencoded({
  extended: true
}));
app.use(bodyPareser.json({
  limit: '50mb',
  extended: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.use('/api', cliente_route)
app.use('/api', admin_route)

module.exports = app;