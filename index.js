const sqlite3 = require('sqlite3');
const request = require('request');
const cheerio = require('cheerio');
// const iconv = require('iconv-lite');
const async = require('async');
const phantomjs = require('phantomjs-prebuilt');
const fs = require('fs');

let db = new sqlite3.Database('./db/xs.db', function (err) {
  if (err) console.error(err);
});

let homepage = 'http://gold.xitu.io/tag/JavaScript';
let loadhome = phantomjs.exec('./phantom/loadpage.js', homepage);

let readable = loadhome.stdout;
let body = '';
readable.on('data', chunk => {
  body += chunk;
});

loadhome.on('exit', code => {
  if (body !== 'fail') {
    handleBody(body);
  } else {
    console.log('can not load homepage')
  }
});

function handleBody(body) {
  let $ = cheerio.load(body);
  let li = $('body div.index-view  div.main  div.container ul li.entry-item');
  let links = [];
  for (let i = 0; i < li.length; i++) {
    links.push({
      title: $('a', li[i]).text(),
      url: $('a', li[i]).attr('href')
    });
    db.run('INSERT INTO article (title, url) VALUES($title, $url)', {
      $title: $('a', li[i]).text(),
      $url: $('a', li[i]).attr('href')
    });
  }
  capture(links);
  fs.writeFileSync('./db/data.json', JSON.stringify(links), { encoding: 'utf8' });
}

function capture(list) {
  let path = './db/';
  for (let i = 0; i < list.length; i++) {
    let work = phantomjs.exec('./phantom/capture.js', list[i].url, path);
    work.on('exit', code => {
      console.log(code);
    })
  }
}






// db.run('INSERT INTO article (title, body) VALUES($title, $body) ', {
//   $title: 'hello',
//   $body: 'world'
// });

// db.get('SELECT * FROM article', function (err, row) {
//   console.log(row);
// });

// db.all('SELECT * FROM article', function (err, row) {
//   console.log(row);
// });

// db.run('DELETE FROM article', function (err) {
//   if (err) console.error(err);
// });

