
var pkg = require('./package.json');

var program = require('commander');
var log = require('npmlog');
var request = require('request');


program.version(pkg.version)
  .usage('<url> [options]')
  .description('req url')
  .option('--raw', 'Raw display, no pretty print')
  .option('--body', 'Display Body response')
  .option('--reqheaders', 'Display Request headers')
  .option('-m --method <HTTPMethod>', 'Request HTTP method')
  .option('-s --strictSSL <strict>', 'Require strict SSL')
  .option('-c, --cookies <cookies>', 'Set cookie string, such "a=v1&b=v2", don t forget quotes on unix because of the &')
  .option('-u, --useragent <UserAgent>', 'User agent to inject to your query')
  .action(function (url, options){
    if(options.verbose) log.level = 'verbose';
    var print = function(d){
      if(!options.raw){
        d = JSON.stringify(d,null,2);
      }
      console.log( d );
    };

    var reqOptions = {
      url: url,
      strictSSL : (!!options.strictSSL),
      method : (!!options.method)?options.method:'GET',
      jar: (!!options.cookies)?request.jar():null,
      headers: {
        'User-Agent': options.useragent?options.useragent:null
      }
    };

    console.log('====================== ' + reqOptions.url);
    if(options.reqheaders){
      console.log('\n====================== Request headers');
      console.log(reqOptions.headers );
      console.log("strictSSL "+reqOptions.strictSSL );
      console.log("method "+reqOptions.method );
    }
    if(!!options.cookies){
      console.log('\n====================== Request Cookies');
      options.cookies.split('&').forEach(function cook(cookie){
        reqOptions.jar.setCookie( request.cookie(cookie), reqOptions.url.replace(/(\?.*)$/, '') );
        console.log(cookie)
      });
    }
    request(reqOptions, function (error, response, body) {
      if(error){
        console.log('\n====================== Failure');
        console.log(error);
      }else{
        console.log('\n====================== Response headers');
        console.log('status : ' + response.statusCode );
        print(response.headers );
        if(options.body){
          console.log('\n====================== Body');
          print(body );
        }
      }
    })
  });

// ----- HELP

program
  .command('*')
  .description('help')
  .action(function(){
    program.outputHelp();
  });


if (!process.argv.slice(2).length) {
  program.outputHelp();
}

// ----- RUN

program.parse(process.argv);


