/**
 * Created by backand on 2/7/16.
 */



var backand = require("./../backand");
var assert = require("assert");

function connect() {
    return backand.auth({username: 'test@angular2.com', password: 'angular2', appname: 'angular2'})
        .then(function (res) {
            console.log(res);
        })
}

describe('can call simple CRUD', function () {
    this.timeout(6000);


    it('call get return data', function (done) {
        connect().then(function () {
            backand.get('/1/objects/items')
                .then(function (res) {
                    assert.ok(res.data);
                    done();
                })
        })
    })

    it('call query with data', function (done) {
        connect().then(function () {
            backand.get('/1/query/data/testQuery2', {name: "we"})
                .then(function (res) {
                    console.log(res);
                    assert.equal(res.length, 1, "length is not 1");
                    assert.equal(res[0].name, "we", "name is not we");
                    done();
                })
        })

    })
})


