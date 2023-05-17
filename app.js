'use strict'

const express = require('express');
const app = express();
const bodyPareser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 4201;

mongoose.connect('mongodb://127.0.0.1:27017/tienda')
  .then(() => {
    app.listen(port, function() {
      console.log(`Running server on port ${port}`);
    })
  })
  .catch(err => console.log(err))

module.exports = app;