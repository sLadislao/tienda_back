'use strict'

const Cliente = require('../models/cliente');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');
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
const login_cliente = async function(req, res) {
  const data = req.body;
  let cliente_arr = [];
  cliente_arr = await Cliente.find({email: data.email});
  if(cliente_arr.length) {
    let user = cliente_arr[0];
    bcrypt.compare(data.password, user.password, async (error, check) => {
      if(check) {
        res.status(200).send({
          data: user,
          token: jwt.createToken(user)
        });
      }
      else {
        res.status(200).send({
          message:'Passwords not match'
        });
      }
    });
  }
  else {
    res.status(200).send({
      message: 'EMail not found',
      data: undefined
    })
  }
}

module.exports = {
  registro_cliente,
  login_cliente
}