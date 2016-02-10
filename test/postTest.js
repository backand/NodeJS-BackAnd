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


describe('post work', function () {
    this.timeout(60000);

    it('can post simple', function (done) {
        connect()
            .then(
                function () {
                    backand.post('/1/objects/items', {
                            name: '123',
                            description: 'asd',
                            user: ''
                        }, true)
                        .then(function (res) {
                            console.log(res);
                            done();
                        })

                }
            )
    })
})
