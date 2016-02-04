/*
 DEPENDENCIES:
 process.


 USE:
 process.backand = require("./node_custom/backand.js");
 process.backand.auth({ username:'a@b.c', password:'etc', appname:'test' })
 .then(function(){
 process.backand.get('/1/objects/advertisement?pageSize=1&pageNumber=1').then(function(data){
 console.log('Data: ',data);
 });
 });
 */

var q = require('q');
var request  = require('request');

const serverUrl = 'https://api.backand.com';

var BackandSdk = function() {

    // private method?
    this.getHeader = function(){
        var res = {};
        res[this.header.name] = this.header.value;
        return res;
    };
}

BackandSdk.prototype.anoymousAuth = function (tokenValue) {
    var backand = this;
    backand.header = {};
    var deferred = q.defer();
    backand.settings = {};
    backand.header.name = 'AnonymousToken';
    backand.header.value = tokenValue;
    deferred.resolve();
    return deferred.promise;
}

BackandSdk.prototype.auth = function (settings) {
    var backand = this;
    backand.header = {};
    var deferred = q.defer();
    backand.settings = {};
    request(
        {
            url: serverUrl + '/token',
            method: "POST",
            form: {
                username: settings.username,
                password: settings.password,
                appname: settings.appname,
                grant_type: 'password'
            }
        },
        function (error, response, data) {
            data = backand.handleResponse(deferred, error, response, data)
            if (!data) {
                return false;
            }

            backand.header.name = 'Authorization';
            backand.header.value = 'Bearer ' + data.access_token;
        }
    );
    return deferred.promise;
};

BackandSdk.prototype.get = function (uri, data) {
    var backand = this;
    var deferred = q.defer();
    if (data) {
        data = '?' + toQueryString(data);
    }


    var req = {
        method: 'GET',
        url: serverUrl + uri + data,
        json: {},
        headers: backand.getHeader()
    };
    request(
        req
        ,
        function (error, response, data) {
            data = backand.handleResponse(deferred, error, response, data)
            if (!data) {
                return false;
            }
        });
    return deferred.promise;
};

BackandSdk.prototype.post = function (uri, json, returnObject) {
    var backand = this;
    var deferred = q.defer();
    var ret = returnObject ? '?returnObject=true' : '';

    request(
        {
            method: 'POST',
            url: serverUrl + uri + ret,
            json: json,
            headers: backand.getHeader()
        },
        function (error, response, data) {
            data = backand.handleResponse(deferred, error, response, data)
            if (!data) {
                return false;
            }
        }
    );
    return deferred.promise;
};

BackandSdk.prototype.put = function (uri, json) {
    var backand = this;
    var deferred = q.defer();
    request(
        {
            method: 'PUT',
            url: serverUrl + uri,
            json: json,
            headers: backand.getHeader()
        },
        function (error, response, data) {
            data = backand.handleResponse(deferred, error, response, data)
            if (!data) {
                return false;
            }
        }
    );
    return deferred.promise;
};

BackandSdk.prototype.handleResponse = function (deferred, error, response, data) {
    if (error) {
        console.error('Error: ', error);
        deferred.reject(error);
        return false;
    }
    if (response.statusCode != 200) {
        error = 'Status code: "' + response.statusCode + '"';
        console.error('Error: ', error);
        deferred.reject(error);
        return false;
    }
    if (data) {
        try {
            data = JSON.parse(data);
        }
        catch (e) {
        }
        deferred.resolve(data);
        return data;
    }
};

var toQueryString = function (obj) {
    var parts = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }
    return parts.join("&");
};



module.exports = new BackandSdk();