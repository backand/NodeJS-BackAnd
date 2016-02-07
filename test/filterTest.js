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


describe('filter feature work', function () {
    this.timeout(60000);

    it('can send simple filter', function (done) {
        connect()
            .then(
                function () {
                    backand.get('/1/objects/items', undefined,
                        {
                            "fieldName": "id",
                            "operator": "equals",
                            "value": "2"
                        })
                        .then(function (res) {
                            console.log(res);
                            assert.equal(res.data.length, 1, "data.length is not equal to 1");
                            done();
                        })

                }
            )
    })
})
