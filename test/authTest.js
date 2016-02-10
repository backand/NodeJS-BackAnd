/**
 * Created by backand on 2/7/16.
 */


var BackandSdk = require("./../backand");
var backand = new BackandSdk();
describe('authorization work', function () {
    this.timeout(60000);

    it('anonymous authentication return right credentials', function (done) {
        backand.anoymousAuth('08fd510a-4b52-43fa-938f-f2c841bd3106')
            .then(function () {
                backand.get('/1/objects/todo?pageSize=1&pageNumber=1').then(function (data) {
                    console.log('anoymousAuth Data: ', data);
                    done();
                });
            });
    });

    it('simple authentication work fine', function (done) {

        backand.auth({username: 'test@angular2.com', password: 'angular2', appname: 'angular2'})
            .then(function () {
                backand.get('/1/objects/todo?pageSize=1&pageNumber=1').then(function (data) {
                    console.log('auth Data: ', data);
                    done();
                });
            });
    })

    it('basic authentication work', function(done){

        backand.basicAuth('7207c07e-aa06-44ea-a20d-a6ab09baaf0f:20367854-c7b9-11e5-be83-0ed7053426cb').then(function () {
            backand.get('/1/objects/todo?pageSize=1&pageNumber=1').then(function (data) {
                console.log('auth Data: ', data);
                done();
            });
        });
    })
})
