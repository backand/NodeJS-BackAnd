'use strict';

// development:
// var http = require('http');
// var BASE_URL = 'api.backand.info';
// var BASE_PORT = '8098';

// production:
var http = null; //require('http');
var BASE_URL = null; //'api.backand.co';
var BASE_PORT = null; //'8099';

var Q = require('q');
var url = require('url');
var merge = require('merge');

var logger = console;


function logRequest(request) {
	logger
		.newline().log(request.method)
		.log('url: ' + (BASE_URL + request.path).yellow);
		if (request.data) {
			logger.log('data: ' + beautify(request.data).yellow);
		}
		if (request.headers) {
			logger.log('headers: ' + beautify(request.headers).yellow);
		}
		logger.newline();
}
function beautify(json) {
	if (typeof(json) === 'string') {
		try {
			json = JSON.parse(json);
		} catch(e) {}
	}
	try {
		json = JSON.stringify(json, null, 4);
	} catch(e) {}
	return json;
}
function logResponse(response, body) {
	logger.log('responseCode: ' + response.statusCode.toString().yellow);
  logger.log('responseBody: ' + beautify(body).blue).newline();	
}

module.exports = {
  init: function(env){
    if(env == 'QA'){
      http = require('http');
      BASE_URL = 'api.backand.co';
      BASE_PORT = '8099';
    } else if (env == 'Production') {
      http = require('https');
      BASE_URL = 'api.backand.com';
      BASE_PORT = '443';
    }
    else {
      logger.warn("Wrong environment: " + env);
    }

  },
	request: function(options, echo) {
		options = merge(options, {host: BASE_URL, port: BASE_PORT});
		options.headers = options.headers || {};
		if (options.accessToken) {
			options.headers['Authorization'] = 'bearer ' + options.accessToken;
		}
		if (options.data) {
			options.headers['Content-Length'] = options.data.length;
			options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		}
		if (echo) {
			logRequest(options);
		}

		var deferred = Q.defer();
		var req = http.request(options, function(response) {
			var body = '';
			response.on('data', function(chunk) {
				body += chunk;
			});
			response.on('end', function() {
				if (echo) {
					logResponse(response, body);
			  }
				if (response.statusCode > 299) {
					logger.warn(beautify(body));
					return;					
				}
				if (body == '') {
          deferred.resolve('');
          return;
				}
				try {
					var data = JSON.parse(body);
					if (data.error_description || data.error) {
						logger.warn(data.error_description || data.error);
						return;
					}
			  	deferred.resolve(data);
			  } catch(e) {
			  	logger.warn('Could not parse response as JSON')
			  		.log(body.blue);
			  }
			});
		}).on('error', function(error) {
			logger.warn(error.message);
		});
		if (options.data) {
			req.write(options.data);
		}
		req.end();
		return deferred.promise;
	},
	get: function(path, params, headers, echo, accessToken) {
		path = url.format({pathname: path, query: params});
		return this.request({method: 'GET', path: path, headers: headers, accessToken: accessToken}, echo);
	},
  post: function(path, data, params, headers, echo, accessToken) {
		if (typeof(data) === 'object') {
			data = JSON.stringify(data);
		}
		path = url.format({pathname: path, query: params});
		return this.request({method: 'POST', path: path, headers: headers, data: data, accessToken: accessToken}, echo);
	}
}