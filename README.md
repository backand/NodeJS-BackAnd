# Node.Js sdk for [Backand](www.backand.com)

NodeJS module to allow use of BackAnd Apis

Allow users to perform authentification and simple action over Backand

# Instructions

npm install

# Example


    var backand = require("./backand");
    
    // anonymous authetication
    backand.anoymousAuth('08fd510a-4b52-43fa-938f-f2c841bd3106')
        .then(function(){
            backand.get('/1/objects/todo?pageSize=1&pageNumber=1').then(function(data){
                console.log('anoymousAuth Data: ',data);
            });
        });
    
    
    // authentication with user and password
    backand.auth({ username:'test@angular2.com', password:'angular2', appname:'angular2' })
        .then(function(){
            backand.get('/1/objects/todo?pageSize=1&pageNumber=1').then(function(data){
                console.log('auth Data: ',data);
            });
        });
