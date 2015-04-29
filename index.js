
var pkg = require('./package.json');

var urlUtil = require('url');
var program = require('commander');
var log = require('npmlog');
var request = require('request');


program.version(pkg.version)
  .usage('<url> [options]')
  .description('req url')
  .option('--raw', 'Raw display, no pretty print')
  .option('--body', 'Display Body response')
  .option('-i, --reqheaders', 'Display Request headers')
  .option('-I, --resheaders', 'Display Response headers')
  .option('-m, --method <HTTPMethod>', 'Request HTTP method')
  .option('-X, --request <HTTPMethod>', 'Request HTTP method. (Curl Style)')
  .option('-k, --insecure', 'Allow insecure ssl certificates. (Curl Style)')
  .option('-u, --useragent <UserAgent>', 'User agent to inject to your query')
  .option('-A, --user-agent <UserAgent>', 'User agent to inject to your query (Curl Style)')
  .option('-c, --cookies <cookies>', 'Set cookie string, such "a=v1&b=v2", don t forget quotes on unix because of the &')
  .option('-b, --cookie <name=data>', 'Pass the data to the HTTP server as a cookie. (Curl Style)')
  .option('-d, --data <data>', 'Sends the specified data in a POST request to the HTTP server, in the same way that a browser does when a user has filled in an HTML form and presses the submit button. (Curl Style)')
  .option('-e, --referer <url>', 'Sends the "Referrer Page" information to the HTTP server. (Curl Style)')
  .option('-H, --header <header>', ' Extra header to include in the request when sending HTTP to a server. (Curl Style)')
  .option('--data-raw <data>', 'This posts data similarly to --data but without the special interpretation of the @ character. (Curl Style)')
  .option('--data-urlencode  <data>', 'This posts data, similar to the other --data options with the exception that this performs URL-encoding. (Curl Style)')
  .option('-L, --location', 'Follow redirects. (Curl Style)')
  .option('-o, --output <file>', 'Output to specified file. (Curl Style)')
  .option('-u, --user <user:password>', 'HTTP Auth. (Curl Style)')
  .action(function (url, options){

    if(options.verbose) log.level = 'verbose';

    var print = function(d){
      if(!options.raw){
        d = JSON.stringify(d,null,2);
      }
      console.log( d );
    };

    var method = options.method || options.request || 'GET';

    var ParsedUrl = urlUtil.parse(url);

    var reqOptions = {
      url: url,
      strictSSL : (!options.insecure),
      method : method,
      followRedirect : (!!options.location),
      headers: {}
    };

    if(options.useragent){
      reqOptions.headers['User-Agent'] = options.useragent;
    }else if(options['user-agent']){
      reqOptions.headers['User-Agent'] = options['user-agent'];
    }

    if(options.referer){
      reqOptions.headers['Referer'] = options.referer;
    }

    if(options.cookies){
      reqOptions.jar = request.jar();
    }

    if(ParsedUrl.auth){
      reqOptions.auth = {
        user: ParsedUrl.auth.split(":")[0],
        pass: ParsedUrl.auth.split(":")[1]
      };
    }else if( options.user ){
      reqOptions.auth = {
        user: options.user.split(":")[0],
        pass: options.user.split(":")[1]
      };
    }


    log.info('URL ', '%s %s', method, reqOptions.url);

    if(options.reqheaders){
      log.info('REQ ', 'Request headers');
      log.info('    ', reqOptions.headers );
      log.info('    ', 'strictSSL %s', (!reqOptions.insecure) );
      log.info('    ', 'method %s', reqOptions.method );
    }
    if(!!options.cookies){
      log.info('REQ ', 'Request Cookies');
      options.cookies.split('&').forEach(function cook(cookie){
        reqOptions.jar.setCookie( request.cookie(cookie), '%s//%s%s', ParsedUrl.protocol, ParsedUrl.host, ParsedUrl.pathname );
        log.info('    ', cookie);
      });
    }
    log.info('REQ ', 'sent');
    request(reqOptions, function (error, response, body) {
      log.info('RES ', 'received');
      if(error){
        log.error('RES ', 'Failure');
        log.error(error);
      }else{
        log.info('RES ', 'Code %s', response.statusCode );
        if(options.resheaders){
          print(response.headers );
        }
        if(options.body){
          log.info('BODY', ' ');
          print(body );
        }
      }
    })
  });

// ----- HELP

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

// ----- RUN

program.parse(process.argv);


