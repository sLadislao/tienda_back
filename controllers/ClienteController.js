'use strict'

const Cliente = require('../models/cliente');
const bcrypt = require('bcrypt-nodejs');

const registro_cliente = async function(req, res) {
  const data = req.body;
  let clientes_arr = [];
  clientes_arr = await Cliente.find({email: data.email});
  if(clientes_arr.length) {
    res.status(200).send({
      message: 'E-Mail already exist in database',
      data: undefined
    });
  }
  else {
    if(!data.password) {
      res.status(200).send({
        message: 'Password is required',
        data: undefined
      });
    }
    else {
      bcrypt.hash(data.password, null, null, async(error, hash) => {
        if(hash) {
          data.password = hash;
          const reg = await Cliente.create(data);
          res.status(200).send({
            data: reg
          });
        }
        else {
          res.status(200).send({
            message: 'Error server',
            data: undefined
          });
        }
      });
    }
  }
}

module.exports = {
  registro_cliente
}