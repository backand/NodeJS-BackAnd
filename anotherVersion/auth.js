'use strict';
var net = require('./net');

module.exports = {
  signin: function(email, password, appName) {
  	return net.post('/token',
      "grant_type=password" +
      "&username=" + email + 
      "&password=" + password + 
      "&appname=" + appName
    );
  }
}