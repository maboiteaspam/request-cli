
require('should');
var http = require("http");
var path = require("path");
var fs = require("fs-extra");
var express = require("express");
var exec = require("child_process").exec;

var forgeReqCli = function(url_options, then){
  var cmd = 'node "'+path.resolve(__dirname+'/../index.js')+'" http://localhost:3005/'+url_options;
  console.error('\t'+cmd);
  return cmd;
};

describe('request-cli', function(){

  it('should be able to request a GET', function(done_){
    var app = express();
    var server = http.createServer(app);
    var done = function(){
      server.close();
      done_();
    };
    app.get('/some', function(){
      done();
    });
    server.listen(3005);
    exec( forgeReqCli('some') );
  });

  it('should be able to request a POST', function(done_){
    var app = express();
    var server = http.createServer(app);
    var done = function(){
      server.close();
      done_();
    };
    app.get('/some', function(){
      done('wrong HTTP method detected');
    });
    app.post('/some', function(){
      done();
    });
    server.listen(3005);
    exec( forgeReqCli('some -X POST') );
  });

  it('should be able to request a POST with data', function(done_){
    var app = express();
    var server = http.createServer(app);
    var done = function(){
      server.close();
      done_();
    };
    app.use(require('body-parser').urlencoded({extended:false} ) );
    app.get('/some', function(){
      done('wrong HTTP method detected');
    });
    app.post('/some', function(res){
      res.body.some.should.eql('data')
      done();
    });
    server.listen(3005);
    exec( forgeReqCli('some -X POST -d "{\\"some\\":\\"data\\"}"') );
  });

  it('should be able to request a POST with url encoded data', function(done_){
    var app = express();
    var server = http.createServer(app);
    var done = function(){
      server.close();
      done_();
    };
    app.use(require('body-parser').urlencoded({extended:false} ) );
    app.get('/some', function(){
      done('wrong HTTP method detected');
    });
    app.post('/some', function(res){
      res.body.some.should.eql('data');
      done();
    });
    server.listen(3005);
    exec( forgeReqCli('some -X POST -d some=data') );
  });

  it('should be able to request a POST data from a JSON file', function(done_){
    var app = express();
    var server = http.createServer(app);
    var done = function(){
      server.close();
      done_();
    };
    app.use(require('body-parser').urlencoded({extended:false} ) );
    app.get('/some', function(){
      done('wrong HTTP method detected');
    });
    app.post('/some', function(res){
      res.body.some.should.eql('data');
      done();
    });
    server.listen(3005);
    fs.mkdirsSync(__dirname+'/fixtures' );
    fs.writeFileSync(__dirname+'/fixtures/some', JSON.stringify({some:"data"}) );
    exec( forgeReqCli('some -X POST -d "@'+__dirname+'/fixtures/some"') );
  });

  it('should be able to request a POST data from an URL encoded file', function(done_){
    var app = express();
    var server = http.createServer(app);
    var done = function(){
      server.close();
      done_();
    };
    app.use(require('body-parser').urlencoded({extended:false} ) );
    app.get('/some', function(){
      done('wrong HTTP method detected');
    });
    app.post('/some', function(res){
      res.body.some.should.eql('data');
      done();
    });
    server.listen(3005);
    fs.mkdirsSync(__dirname+'/fixtures' );
    fs.writeFileSync(__dirname+'/fixtures/somneother', 'somneother=data2&some=data' );
    exec( forgeReqCli('some -X POST -d "@'+__dirname+'/fixtures/somneother"') );
  });

});

