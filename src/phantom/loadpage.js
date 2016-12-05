var page = require('webpage').create();
var system = require('system');

if (system.args.length === 1) {
  console.log('Usage: loadpage.js <URL>');
  phantom.exit();
}

var url = system.args[1];
// 超时处理
page.settings.resourceTimeout = 30000;
page.onResourceTimeout = function (request) {
  console.error(JSON.stringify(request));
}

page.open(url, function (status) {
  if (status === "success") {
    console.log(page.content);
  } else {
    console.log('fail');
  }
  phantom.exit();
});