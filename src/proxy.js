const request = require('request');
const http = require('http');
const https = require('https');

let proxy = 'http://39.74.90.145:8998';
let proxy1 = 'http://163.125.71.40:8888';

let agent = new http.Agent({

})

request.get({
  url: 'http://www.baidu.com',
  proxy: proxy
}, function (error, response, body) {
  console.log(error);
  console.log(response);
  // console.log(response.headers)
})

