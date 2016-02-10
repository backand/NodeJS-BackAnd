/**
 * Created by backand on 2/7/16.
 */

var BackandSdk = require("./../backand");
var backand = new BackandSdk();
var assert = require("assert");

describe('serverUrl feature work fine', function () {
    this.timeout(60000);

    it('default is production server', function (done) {
        assert.equal(backand.serverUrl, 'https://api.backand.com');
        done();
    });

    it('can be changed on constructor', function(done){
        var second = new BackandSdk('www.qa.com');
        assert.equal(second.serverUrl, "www.qa.com");
        done();
    })

    it('create second don"t change first' , function(done){
        assert.equal(backand.serverUrl, 'https://api.backand.com');
        done();
    })
})
