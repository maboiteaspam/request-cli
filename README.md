# request-cli

A cli program to execute http request with request/request node js module.

In the fashion of the famous curl, with ease of NodeJS.


# Install

```npm i request-cli -g```


If i have not yet published this module to NPM, please use this syntax meanwhile.

```npm i maboiteaspam/request-cli -g```


# Options

```sh

Usage: req <url> [options]

Options:

-h, --help                    output usage information
-V, --version                 output the version number

--raw                         Raw display, no pretty print

--body                        Display Body response

-i, --reqheaders              Display Request headers

-I, --resheaders              Display Response headers

-m, --method <HTTPMethod>     Request HTTP method

-X, --request <HTTPMethod>    Request HTTP method. (Curl Style)

-k, --insecure                Allow insecure ssl certificates. (Curl Style)

-u, --useragent <UserAgent>   User agent to inject to your query

-A, --user-agent <UserAgent>  User agent to inject to your query (Curl Style)

-c, --cookies <cookies>       Set cookie string, such "a=v1&b=v2", don t forget quotes 
                              on unix because of the &.
                              
-b, --cookie <name=data>      Pass the data to the HTTP server as a cookie. (Curl Style)

-d, --data <data>             Sends the specified data in a POST request to the HTTP server, 
                              in the same way that a browser does when a user has filled 
                              in an HTML form and presses the submit button. (Curl Style)
                              
-e, --referer <url>           Sends the "Referrer Page" information to the HTTP server. (Curl Style)

-H, --header <header>         Extra header to include in the request when sending HTTP 
                              to a server. (Curl Style)
                              
--data-raw <data>             This posts data similarly to --data but without the 
                              special interpretation of the @ character. (Curl Style)
                              
--data-urlencode  <data>      This posts data, similar to the other --data options 
                              with the exception that this performs URL-encoding. (Curl Style)
                              
-L, --location                Follow redirects. (Curl Style)

-o, --output <file>           Output to specified file. (Curl Style)

-u, --user <user:password>    HTTP Auth. (Curl Style)

-u, --user <user:password>    HTTP Auth. (Curl Style)

-T, --upload-file <file>      Send a file to a remote HTTP server (Like webdav) using PUT method. (Curl Style)

--pre-crlf                    Multipart/* specifics. It will add newline/CRLF before the boundary. See more at request/request.

--post-crlf                   Multipart/* specifics. It will add newline/CRLF after the boundary. See more at request/request.
```


# Usage

```sh
    request http://some.com/curl
    req http://some.com/curl -u 'some user agent'
    req http://some.com/curl -X POST -d "{\"some\":\"data\"}"
    req http://some.com/curl -X POST -d some=data
    
    # if you want/need to do some webdav thing, here you go
    req http://user:pass@some.com/curl URL_TO_STORE_FILE.EXT -T THE_PATH_TO_STORE.ext
    req http://user:pass@some.com/curl URL_TO_STORE_FILE.EXT -X DELETE
    req http://user:pass@some.com/curl URL_TO_FOLDER_TO_CREATE -X MKCOL
    # use DELETE method to remove a folder too.
```


# Status

In development. It needs to implement all listed options above.
