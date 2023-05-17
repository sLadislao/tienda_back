'use strict'

const Admin = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');
const registro_admin = async function(req, res) {
  const data = req.body;
  console.log(data);
  let admin_arr = [];
  admin_arr = await Admin.find({email: data.email});
  if(admin_arr.length) {
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
          const reg = await Admin.create(data);
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
  registro_admin
}