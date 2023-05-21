'use strict'

const express = require('express');
const clienteController = require('../controllers/ClienteController');
const auth = require('../middlewares/authenticate');

const api = express.Router();
api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/login_cliente', clienteController.login_cliente);
api.get('/listar_clientes_filtro_admin/:tipo/:filtro?', auth.auth, clienteController.listar_clientes_filtro_admin);
module.exports = api;