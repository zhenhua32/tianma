var page = require('webpage').create();
var system = require('system');

if (system.args.length < 3 || system.args.length > 4) {
  console.log('Usage: capture.js <URL> <path>');
  phantom.exit();
}

var url = system.args[1];
var path = system.args[2];

// page.viewportSize = { width: 1920, height: 1080 };
page.viewportSize = { width: 1280, height: 720 };

page.open(url, function (status) {
  if (status === "success") {
    page.evaluate(function () {
      document.body.bgColor = 'white';
    });
    page.render(path + Date.now() + '.png');
  } else {
    console.log('fail');
  }
  phantom.exit();
});