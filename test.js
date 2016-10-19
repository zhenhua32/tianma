const phantomjs = require('phantomjs-prebuilt');
const fs = require('fs');

let program = phantomjs.exec('loadpage.js',
  'http://gold.xitu.io/tag/JavaScript');
let file = fs.createWriteStream('home.html');

// program.stdout.pipe(text);

let readable = program.stdout;

program.stderr.pipe(process.stderr);

let body = '';
readable.on('data', chunk => {
  body += chunk;
});

program.on('exit', code => {
  if (body !== 'fail') {

  } else {
    console.log('can not load page');
  }
})