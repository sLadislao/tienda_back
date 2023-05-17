'use strict'

const Cliente = require('../models/cliente');
const registro_cliente = async function(req, res) {
  res.status(200).send({
    message: 'Hello World'
  })
}

module.exports = {
  registro_cliente
}