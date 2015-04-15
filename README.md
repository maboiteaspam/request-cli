# request-cli

A cli program to execute http request with request/request node js module.

# Install

```npm i request-cli -g```

# Options

```sh
  Usage: req <url> [options]


  Commands:

    *   help

  req url

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    --raw                        Raw display, no pretty print
    --body                       Display Body response
    --reqheaders                 Display Request headers
    -m --method <HTTPMethod>     Request HTTP method
    -s --strictSSL <strict>      Require strict SSL
    -c, --cookies <cookies>      Set cookie string, such "a=v1&b=v2", don t forget quotes on unix because of the &
    -u, --useragent <UserAgent>  User agent to inject to your query

```

# Usage

```sh
request http://some.com/url
request http://some.com/url -u 'sme user agent'
```

# Status

In development. It needs some tests.