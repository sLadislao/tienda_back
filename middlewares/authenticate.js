'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'ladislaomorales';

exports.auth = function(req, res, next) {
  if(!req.headers.authorization) {
    res.status(403).send({
      message: 'No headers error'
    })
  }
  else {
    const token = req.headers.authorization.replace(/['"]+/g,'');
    const segment = token.split('.');
    if(segment.length != 3) {
      res.status(403).send({
        message: 'Invalid token'
      })
    }
    else {
      try {
        const payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()) {
          res.status(403).send({
            message: 'Expired token'
          })
        }
        else {
          req.user = payload;
          next();
        }
      }
      catch (e) {
        
      }
    }
  }
}