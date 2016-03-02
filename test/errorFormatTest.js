/**
 * Created by backand on 3/2/16.
 */



var BackandSdk = require("./../backand");
var backand = new BackandSdk();
var assert = require("assert");

describe('can format message', function(){
    it('can format simple type', function (done) {
        var msg = backand.formatErrorMessage( { body : "asd"}, undefined);
        //console.log(msg);
        assert.equal(msg, "asd ");
        done();
    })

    it('can format complext type', function (done) {
        var msg = backand.formatErrorMessage( { body :  {message :  "asd"}}, undefined);
        //console.log(msg);
        assert.equal(msg, "{\"message\":\"asd\"} ");
        done();
    })


})
